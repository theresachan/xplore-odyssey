import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** 0–1 visual strength */
  intensity?: number;
  /** soft-light | overlay | screen | normal */
  blend?: "soft-light" | "overlay" | "screen" | "normal";
  /** follow pointer with a soft light */
  interactive?: boolean;
};

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_interact;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = uv * vec2(aspect, 1.0);

  float t = u_time * 0.04;
  float n = fbm(p * 1.6 + vec2(t * 0.35, -t * 0.22));
  float n2 = fbm(p * 3.1 - vec2(t * 0.18, t * 0.31));

  // Canopy palette: leaf wash → canopy → deep ink
  vec3 mist = vec3(0.894, 0.910, 0.871);
  vec3 canopy = vec3(0.227, 0.322, 0.188);
  vec3 ink = vec3(0.055, 0.078, 0.063);
  vec3 brass = vec3(0.722, 0.573, 0.165);

  vec3 col = mix(ink, canopy, smoothstep(0.25, 0.75, n));
  col = mix(col, mist, smoothstep(0.45, 0.95, n2) * 0.35);
  col = mix(col, brass, pow(n2, 4.0) * 0.12);

  float vignette = smoothstep(1.15, 0.25, length(uv - 0.5));
  float grain = (hash(uv * u_res * 0.35 + u_time) - 0.5) * 0.04;

  float pointer = 0.0;
  if (u_interact > 0.5) {
    vec2 m = u_mouse;
    float d = length((uv - m) * vec2(aspect, 1.0));
    pointer = exp(-d * 4.5) * 0.45;
    col = mix(col, mist, pointer * 0.55);
  }

  float alpha = u_intensity * (0.22 + n * 0.28 + pointer * 0.2) * vignette;
  col += grain;

  gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.72));
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function WebGLAtmosphere({
  className = "",
  intensity = 0.55,
  blend = "soft-light",
  interactive = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");
    const uInteract = gl.getUniformLocation(program, "u_interact");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    let start = performance.now();
    let mouse = { x: 0.5, y: 0.45 };
    let target = { ...mouse };
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const pw = Math.max(1, Math.floor(w * dpr));
      const ph = Math.max(1, Math.floor(h * dpr));
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const onPointer = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / Math.max(rect.width, 1);
      target.y = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1);
    };

    const draw = (now: number) => {
      if (!running) return;
      resize();
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;

      const t = reduce ? 0 : (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uIntensity, intensity);
      gl.uniform1f(uInteract, interactive && !reduce ? 1 : 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(performance.now());
    if (!reduce) raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    if (interactive) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ mixBlendMode: blend }}
    />
  );
}
