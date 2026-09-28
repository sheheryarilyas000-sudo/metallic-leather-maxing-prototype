// WebGL engine for the curved category gallery.
// Adapted from React Bits "Circular Gallery" (MIT, github.com/DavidHDev/react-bits), which the
// reference site uses. Same bend, wave and easing maths; changes: listeners scoped to the
// gallery, render loop paused off-screen, click and keyboard navigation, crisp titles.
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";

type GL = Renderer["gl"];
type Viewport = { width: number; height: number };
type Screen = { width: number; height: number };

/** `image` is a transparent cut-out; `tint` is the card colour painted behind it. */
export type GalleryItem = { image: string; tint: string; text: string; href: string };

export type GalleryOptions = {
  items: GalleryItem[];
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  scrollSpeed: number;
  scrollEase: number;
  onNavigate: (href: string) => void;
  onCenterChange: (index: number) => void;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function debounce(fn: () => void, wait: number) {
  let id = 0;
  return () => {
    window.clearTimeout(id);
    id = window.setTimeout(fn, wait);
  };
}

function createTextTexture(gl: GL, text: string, font: string, color: string) {
  // Drawn at 2x (or device pixel ratio) so titles stay sharp on the curved plane.
  const ratio = Math.max(2, Math.min(window.devicePixelRatio || 1, 3));
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.font = font;
  const width = Math.ceil(ctx.measureText(text).width);
  const fontSize = parseInt(/(\d+)px/.exec(font)?.[1] ?? "20", 10);
  const height = Math.ceil(fontSize * 1.3);
  canvas.width = (width + 20) * ratio;
  canvas.height = (height + 16) * ratio;
  ctx.scale(ratio, ratio);
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, (width + 20) / 2, (height + 16) / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, aspect: canvas.width / canvas.height };
}

class Title {
  mesh: Mesh;
  private aspect: number;

  constructor(gl: GL, private plane: Mesh, text: string, font: string, color: string) {
    const { texture, aspect } = createTextTexture(gl, text, font, color);
    this.aspect = aspect;
    const program = new Program(gl, {
      vertex: /* glsl */ `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragment: /* glsl */ `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }`,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(gl, { geometry: new Plane(gl), program });
    this.mesh.setParent(plane);
  }

  /** Sizes in the parent plane's local space, undoing its non-uniform scale. */
  onResize() {
    const { x: sx, y: sy } = this.plane.scale;
    const height = 0.13; // fraction of the card height
    this.mesh.scale.set((height * this.aspect * sy) / sx, height, 1);
    this.mesh.position.y = -0.5 - height * 0.5 - 0.06;
  }
}

class Media {
  plane: Mesh;
  title: Title;
  program: Program;
  width = 0;
  x = 0;
  extra = 0;
  private widthTotal = 0;
  private screen!: Screen;
  private viewport!: Viewport;

  constructor(
    private gl: GL,
    geometry: Plane,
    scene: Transform,
    readonly item: GalleryItem,
    private index: number,
    private length: number,
    private bend: number,
    borderRadius: number,
    font: string,
    textColor: string,
  ) {
    const texture = new Texture(gl, { generateMipmaps: true });
    this.program = new Program(gl, {
      depthTest: false,
      depthWrite: false,
      vertex: /* glsl */ `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragment: /* glsl */ `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform vec3 uBackground;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          // Card tint with a soft studio light from just above centre.
          float light = 1.0 + 0.07 * (0.55 - length((vUv - vec2(0.5, 0.58)) * vec2(1.0, 0.8)));
          vec3 background = uBackground * light;
          vec3 rgb = mix(background, color.rgb, color.a);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(rgb, alpha);
        }`,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: borderRadius },
        uBackground: { value: hexToRgb(item.tint) },
      },
      transparent: true,
    });

    const img = new Image();
    img.src = item.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };

    this.plane = new Mesh(gl, { geometry, program: this.program });
    this.plane.setParent(scene);
    this.title = new Title(gl, this.plane, item.text, font, textColor);
  }

  update(scroll: { current: number; last: number }, direction: "left" | "right") {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const half = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const b = Math.abs(this.bend);
      const r = (half * half + b * b) / (2 * b);
      const effectiveX = Math.min(Math.abs(x), half);
      const arc = r - Math.sqrt(r * r - effectiveX * effectiveX);
      const tilt = Math.sign(x) * Math.asin(effectiveX / r);
      this.plane.position.y = this.bend > 0 ? -arc : arc;
      this.plane.rotation.z = this.bend > 0 ? -tilt : tilt;
    }

    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current - scroll.last;

    // Infinite loop: a card leaving one edge re-enters at the other.
    const planeOffset = this.plane.scale.x / 2;
    const isBefore = x + planeOffset < -half;
    const isAfter = x - planeOffset > half;
    if (direction === "right" && isBefore) this.extra -= this.widthTotal;
    if (direction === "left" && isAfter) this.extra += this.widthTotal;
  }

  onResize(screen: Screen, viewport: Viewport) {
    this.screen = screen;
    this.viewport = viewport;
    const scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.title.onResize();
    const padding = 2;
    this.width = this.plane.scale.x + padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

export class CircularGalleryEngine {
  private renderer: Renderer;
  private gl: GL;
  private camera: Camera;
  private scene = new Transform();
  private medias: Media[];
  private screen: Screen = { width: 0, height: 0 };
  private viewport: Viewport = { width: 0, height: 0 };
  private scroll = { ease: 0.05, current: 0, target: 0, last: 0, position: 0 };
  private raf = 0;
  private running = false;
  private inView = false;
  private pointer: { startX: number; startY: number; moved: boolean } | null = null;
  private centerIndex = -1;
  private readonly checkDebounced: () => void;
  private readonly observer: IntersectionObserver;
  private readonly resizeObserver: ResizeObserver;

  constructor(
    private container: HTMLElement,
    private options: GalleryOptions,
  ) {
    this.scroll.ease = options.scrollEase;
    this.checkDebounced = debounce(() => this.snapToNearest(), 200);

    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    const canvas = this.gl.canvas as HTMLCanvasElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.display = "block";
    container.appendChild(canvas);

    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;

    const geometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
    // Items are doubled so the loop always has cards to wrap in from off-screen.
    const all = options.items.concat(options.items);
    this.medias = all.map(
      (item, index) =>
        new Media(
          this.gl,
          geometry,
          this.scene,
          item,
          index,
          all.length,
          options.bend,
          options.borderRadius,
          options.font,
          options.textColor,
        ),
    );

    this.onResize();
    this.addEvents();
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(container);
    this.observer = new IntersectionObserver(([entry]) => {
      this.inView = entry.isIntersecting;
      if (this.inView) this.start();
      else this.stop();
    });
    this.observer.observe(container);
  }

  /** Move by whole cards, e.g. from arrow keys. */
  step(direction: 1 | -1) {
    const width = this.medias[0]?.width ?? 0;
    this.scroll.target += direction * width;
    this.snapToNearest();
    this.start();
  }

  /** Link of the card nearest the centre. */
  centerHref() {
    return this.nearestToCenter()?.item.href;
  }

  destroy() {
    this.stop();
    this.observer.disconnect();
    this.resizeObserver.disconnect();
    this.removeEvents();
    const canvas = this.gl.canvas as HTMLCanvasElement;
    canvas.remove();
    this.gl.getExtension("WEBGL_lose_context")?.loseContext();
  }

  private start() {
    if (this.running || !this.inView) return;
    this.running = true;
    this.raf = requestAnimationFrame(this.update);
  }

  private stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private update = () => {
    if (!this.running) return;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    for (const media of this.medias) media.update(this.scroll, direction);
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;

    const center = this.nearestToCenter();
    if (center) {
      const index = this.medias.indexOf(center) % this.options.items.length;
      if (index !== this.centerIndex) {
        this.centerIndex = index;
        this.options.onCenterChange(index);
      }
    }
    this.raf = requestAnimationFrame(this.update);
  };

  private nearestToCenter() {
    let best: Media | undefined;
    for (const media of this.medias) {
      if (!best || Math.abs(media.plane.position.x) < Math.abs(best.plane.position.x)) best = media;
    }
    return best;
  }

  private snapToNearest() {
    const width = this.medias[0]?.width;
    if (!width) return;
    const index = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * index;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  private onResize = () => {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    if (!this.screen.width || !this.screen.height) return;
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };
    for (const media of this.medias) media.onResize(this.screen, this.viewport);
    // Centre the whole arc vertically, not just the middle card. The group runs from the
    // centre card's top edge down to the edge cards (which drop by `bend`) plus their titles,
    // so lift the scene by half the extra depth below. Stops the outer titles clipping.
    const cardHeight = this.medias[0]?.plane.scale.y ?? 0;
    this.scene.position.y = (cardHeight * 0.19 + Math.abs(this.options.bend)) / 2;
    // Draw one frame so the gallery is visible even before it scrolls into view.
    for (const media of this.medias) media.update(this.scroll, "right");
    this.renderer.render({ scene: this.scene, camera: this.camera });
  };

  // Page scroll turns the gallery while it is on screen, as on the reference site.
  // The page still scrolls normally; nothing is prevented.
  private onWheel = (event: WheelEvent) => {
    if (!this.inView) return;
    const delta = event.deltaY;
    if (!delta) return;
    this.scroll.target += (delta > 0 ? this.options.scrollSpeed : -this.options.scrollSpeed) * 0.2;
    this.checkDebounced();
  };

  private onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    this.pointer = { startX: event.clientX, startY: event.clientY, moved: false };
    this.scroll.position = this.scroll.current;
    this.container.setPointerCapture(event.pointerId);
    this.container.dataset.dragging = "true";
  };

  private onPointerMove = (event: PointerEvent) => {
    if (!this.pointer) return;
    const dx = this.pointer.startX - event.clientX;
    if (Math.abs(dx) > 6) this.pointer.moved = true;
    this.scroll.target = this.scroll.position + dx * (this.options.scrollSpeed * 0.025);
  };

  private onPointerUp = (event: PointerEvent) => {
    if (!this.pointer) return;
    const { moved } = this.pointer;
    this.pointer = null;
    delete this.container.dataset.dragging;
    if (moved) {
      this.snapToNearest();
      return;
    }
    const href = this.hrefAt(event.clientX, event.clientY);
    if (href) this.options.onNavigate(href);
  };

  /** Which card is under the pointer, using each plane's projected horizontal span. */
  private hrefAt(clientX: number, clientY: number) {
    const rect = this.container.getBoundingClientRect();
    const vx = ((clientX - rect.left) / rect.width - 0.5) * this.viewport.width;
    const vy = (0.5 - (clientY - rect.top) / rect.height) * this.viewport.height - this.scene.position.y;
    for (const media of this.medias) {
      const { position, scale } = media.plane;
      const withinX = Math.abs(position.x - vx) < scale.x / 2;
      // Include the title strip below the card.
      const withinY = vy < position.y + scale.y / 2 && vy > position.y - scale.y / 2 - scale.y * 0.25;
      if (withinX && withinY) return media.item.href;
    }
    return undefined;
  }

  private addEvents() {
    window.addEventListener("wheel", this.onWheel, { passive: true });
    this.container.addEventListener("pointerdown", this.onPointerDown);
    this.container.addEventListener("pointermove", this.onPointerMove);
    this.container.addEventListener("pointerup", this.onPointerUp);
    this.container.addEventListener("pointercancel", this.onPointerUp);
  }

  private removeEvents() {
    window.removeEventListener("wheel", this.onWheel);
    this.container.removeEventListener("pointerdown", this.onPointerDown);
    this.container.removeEventListener("pointermove", this.onPointerMove);
    this.container.removeEventListener("pointerup", this.onPointerUp);
    this.container.removeEventListener("pointercancel", this.onPointerUp);
  }
}
