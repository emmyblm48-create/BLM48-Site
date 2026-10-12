/* =========================================================
   Realistic BLM48 Cafe cup — the same model as the 3D cup in the
   BLM48 Membership app (assets/js/item-3d-viewer.js · createCupModel),
   ported to this site's three.js (r160). Used by cafe.html (and campus).

   It is built from the drink's 800x1000 cup photo: the printed
   artwork is unwrapped round the cone, the drink's colour bands are
   read off the sides into a soft swirled liquid, then ice cubes
   pressed against the wall and floating on top, a thin hazy plastic
   shell with gloss, rolled lip, domed lid, red plug and blue straw.
   Model units: 1 = photo height; scale the returned group to size.
   ========================================================= */
import * as T from 'three';

// Reflections + texture sharpness come from the page's renderer: call setupCups() once first.
let envMap = null, maxAniso = 1;
export function setupCups(opts) {
  envMap = opts.envMap || null;
  maxAniso = opts.maxAniso || 1;
}

// Cup template measured on the 800x1000 product photos (fractions of the photo height).
const CUP = {
  aspect: 0.8, cxN: 0.527,
  body: { y0: 0.355, y1: 0.925, rTop: 0.1768, rBot: 0.1186 },
  lid: { y0: 0.264, y1: 0.355, rTop: 0.161, rBot: 0.1944 },
  straw: { x: 0.145, y: 0.262, len: 0.225, r: 0.0245, tilt: 18 },
  plug: { x: -0.115, z: 0.075, r: 0.022, h: 0.016 },
};
export const CUP_BOTTOM = CUP.body.y1 + 0.004 - 0.5;   // distance from the model origin down to the cup's base
const SIDE_DEG = 50;
const GLARE = 0.3;
const ADD_LIGHT = { blending: T.CustomBlending, blendEquation: T.AddEquation, blendSrc: T.OneFactor, blendDst: T.OneFactor,
  blendEquationAlpha: T.AddEquation, blendSrcAlpha: T.ZeroFactor, blendDstAlpha: T.OneFactor };

function looksLikeCup(d, iw, ih) {
  const a = (xn, yn) => d[(Math.round(yn * ih) * iw + Math.round(xn * iw)) * 4 + 3];
  return a(0.527, 0.6) > 200 && a(0.527, 0.4) > 200 && a(0.12, 0.6) < 30 && a(0.9, 0.6) < 30 && a(0.527, 0.985) < 30 && a(0.45, 0.1) < 30;
}

// Unwrap the printed artwork round the cup: each column is an angle (-180..180, front = 0).
function unwrapTexture(d, iw, ih, part, U) {
  const Y0 = Math.round(part.y0 * ih), Y1 = Math.round(part.y1 * ih), Hh = Math.max(1, Y1 - Y0);
  const c = document.createElement('canvas'); c.width = U; c.height = Hh;
  const ctx = c.getContext('2d');
  const out = ctx.createImageData(U, Hh);
  const side = Math.sin(SIDE_DEG * Math.PI / 180);
  for (let v = 0; v < Hh; v++) {
    const rN = (part.rTop + (part.rBot - part.rTop) * (v / Hh)) / CUP.aspect * 0.97;
    const Y = Y0 + v;
    for (let u = 0; u < U; u++) {
      const th = ((u + 0.5) / U) * 2 * Math.PI - Math.PI;
      let s = Math.sin(th);
      if (Math.abs(th) > SIDE_DEG * Math.PI / 180) s = Math.sign(th) * side;
      const X = Math.min(iw - 1, Math.max(0, Math.round((CUP.cxN + rN * s) * iw)));
      const si = (Y * iw + X) * 4, di = (v * U + u) * 4;
      out.data[di] = d[si]; out.data[di + 1] = d[si + 1]; out.data[di + 2] = d[si + 2]; out.data[di + 3] = d[si + 3];
    }
  }
  ctx.putImageData(out, 0, 0);
  return c;
}

// Drink colour per row, averaged from the logo-free sides of the cup.
function bandColors(d, iw, ih, y0, y1) {
  const Y0 = Math.round(y0 * ih), Y1 = Math.round(y1 * ih), out = [];
  for (let Yp = Y0; Yp < Y1; Yp++) {
    const yn = Yp / ih;
    const rN = (CUP.body.rTop + (CUP.body.rBot - CUP.body.rTop) * ((yn - CUP.body.y0) / (CUP.body.y1 - CUP.body.y0))) / CUP.aspect;
    let r = 0, g = 0, b = 0;
    [-0.78, 0.78, -0.72, 0.72].forEach(k => {
      const i = (Yp * iw + Math.round((CUP.cxN + rN * k) * iw)) * 4;
      r += d[i]; g += d[i + 1]; b += d[i + 2];
    });
    out.push([r / 4, g / 4, b / 4]);
  }
  return out;
}

// Soft liquid: the real colour bands blurred together, swirled with milky clouds.
function liquidCanvas(bands, U) {
  const Hh = bands.length;
  const r = Math.max(2, Math.round(Hh * 0.035));
  let cols = bands.map(c => c.slice());
  for (let pass = 0; pass < 3; pass++) {
    const out = [];
    for (let v = 0; v < Hh; v++) {
      const acc = [0, 0, 0]; let n = 0;
      for (let k = v - r; k <= v + r; k++) { const c = cols[Math.max(0, Math.min(Hh - 1, k))]; acc[0] += c[0]; acc[1] += c[1]; acc[2] += c[2]; n++; }
      out.push(acc.map(x => x / n));
    }
    cols = out;
  }
  const lum = c => 0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2];
  const milk = cols.reduce((m, c) => (lum(c) > lum(m) ? c : m), cols[0]);
  const hash = (i, j) => { let h = (i * 374761393 + j * 668265263) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };
  const vnoise = (x, y, px) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const sm = t => t * t * (3 - 2 * t), w = i => ((i % px) + px) % px;
    const a = hash(w(xi), yi), b = hash(w(xi + 1), yi), c = hash(w(xi), yi + 1), d = hash(w(xi + 1), yi + 1);
    const u = sm(xf), v = sm(yf);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  const fbm = (x, y, px) => { let t = 0, amp = 0.5, f = 1; for (let o = 0; o < 4; o++) { t += amp * vnoise(x * f, y * f, px * f); amp *= 0.5; f *= 2; } return t / 0.9375; };
  const c = document.createElement('canvas'); c.width = U; c.height = Hh;
  const ctx = c.getContext('2d'); const img = ctx.createImageData(U, Hh);
  for (let v = 0; v < Hh; v++) {
    for (let u = 0; u < U; u++) {
      const x = u / U * 5, y = v / Hh * 3.2;
      const off = (fbm(x, y, 5) - 0.5) * Hh * 0.16;
      const col = cols[Math.max(0, Math.min(Hh - 1, Math.round(v + off)))];
      const m = Math.max(0, Math.min(1, (fbm(x * 1.3 + 7.1, y * 1.6 + 3.3, Math.round(5 * 1.3)) - 0.52) * 2.2)) * 0.55;
      const i = (v * U + u) * 4;
      img.data[i] = col[0] + (milk[0] - col[0]) * m;
      img.data[i + 1] = col[1] + (milk[1] - col[1]) * m;
      img.data[i + 2] = col[2] + (milk[2] - col[2]) * m;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

// The white print on the cup: only pixels clearly brighter than that row's drink colour.
function logoCanvas(d, iw, ih, part, bands, U) {
  const src = unwrapTexture(d, iw, ih, part, U);
  const ctx = src.getContext('2d');
  const img = ctx.getImageData(0, 0, src.width, src.height);
  const lum = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;
  const front = SIDE_DEG * 0.95;
  for (let v = 0; v < src.height; v++) {
    const bd = bands[Math.min(bands.length - 1, v)], bl = lum(bd[0], bd[1], bd[2]);
    for (let u = 0; u < src.width; u++) {
      const i = (v * src.width + u) * 4;
      const th = Math.abs(((u + 0.5) / src.width) * 360 - 180);
      const L = lum(img.data[i], img.data[i + 1], img.data[i + 2]);
      let a = th > front ? 0 : Math.max(0, Math.min(1, (L - bl - 22) / 55));
      if (img.data[i] < 170) a = 0;
      img.data[i + 3] = Math.round(a * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  return src;
}

function heightToNormal(ctx, S, strength) {
  const h = ctx.getImageData(0, 0, S, S).data;
  const out = ctx.createImageData(S, S);
  const H = (x, y) => h[(((y + S) % S) * S + ((x + S) % S)) * 4] / 255;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const dx = (H(x + 1, y) - H(x - 1, y)) * strength, dy = (H(x, y + 1) - H(x, y - 1)) * strength;
    const len = Math.hypot(dx, dy, 1), i = (y * S + x) * 4;
    out.data[i] = (-dx / len * 0.5 + 0.5) * 255; out.data[i + 1] = (dy / len * 0.5 + 0.5) * 255; out.data[i + 2] = (1 / len * 0.5 + 0.5) * 255; out.data[i + 3] = 255;
  }
  ctx.putImageData(out, 0, 0);
}
// Condensation droplets (normal map) for the plastic and the ice.
let dropletTex = null;
function droplets() {
  if (dropletTex) return dropletTex;
  const S = 512, c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, S, S);
  const drop = (x, y, r, sy) => {
    g.save(); g.translate(x, y); g.scale(1, sy);
    const gr = g.createRadialGradient(-r * 0.2, -r * 0.25, 0, 0, 0, r);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.6, 'rgba(200,200,200,0.85)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.fill(); g.restore();
  };
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 900; i++) drop(rnd() * S, rnd() * S, 0.8 + rnd() * 2.2, 1);
  for (let i = 0; i < 140; i++) drop(rnd() * S, rnd() * S, 2.5 + rnd() * 4.5, 1 + rnd() * 0.3);
  for (let i = 0; i < 14; i++) {
    const x = rnd() * S, y0 = rnd() * S, len = 30 + rnd() * 90, w = 2 + rnd() * 2.5;
    for (let k = 0; k < len; k += 2) drop(x + Math.sin(k * 0.08) * 1.5, (y0 + k) % S, w * (0.7 + 0.3 * Math.sin(k * 0.3)), 1.2);
    drop(x, (y0 + len) % S, w * 1.7, 1.3);
  }
  heightToNormal(g, S, 3.2);
  dropletTex = new T.CanvasTexture(c);
  dropletTex.wrapS = dropletTex.wrapT = T.RepeatWrapping;
  dropletTex.repeat.set(3, 1.6);
  return dropletTex;
}

function roundedCube(size, radius) {
  const g = new T.BoxGeometry(size, size, size, 6, 6, 6);
  const p = g.attributes.position, v = new T.Vector3(), inner = size / 2 - radius;
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const c = new T.Vector3(Math.max(-inner, Math.min(inner, v.x)), Math.max(-inner, Math.min(inner, v.y)), Math.max(-inner, Math.min(inner, v.z)));
    v.sub(c).normalize().multiplyScalar(radius).add(c);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

// Load the cup photo's pixels (lh3 can answer 429 under load, so retry a few times).
async function loadCupPixels(url) {
  for (let n = 0; n < 4; n++) {
    try {
      const im = new Image(); im.crossOrigin = 'anonymous';
      // onload rather than decode(): decode() waits while the tab is in the background
      await new Promise((resolve, reject) => { im.onload = resolve; im.onerror = reject; im.src = n ? url + (url.includes('?') ? '&' : '?') + 'r=' + n : url; });
      const iw = im.naturalWidth, ih = im.naturalHeight;
      if (!iw || Math.abs(iw / ih - CUP.aspect) > 0.02) return null;
      const cv = document.createElement('canvas'); cv.width = iw; cv.height = ih;
      const cx = cv.getContext('2d'); cx.drawImage(im, 0, 0);
      const d = cx.getImageData(0, 0, iw, ih).data;
      return looksLikeCup(d, iw, ih) ? { d, iw, ih } : null;
    } catch (err) {
      await new Promise(r => setTimeout(r, 1500 * (n + 1) + Math.random() * 1500));
    }
  }
  return null;
}

function build(px, texSize) {
  const { d, iw, ih } = px;
  const D = Math.PI / 180;
  const Y = yn => 0.5 - yn;
  const rAt = (part, yn) => part.rTop + (part.rBot - part.rTop) * ((yn - part.y0) / (part.y1 - part.y0));
  const U = texSize;
  const tex = (canvas, srgb) => { const t = new T.CanvasTexture(canvas); if (srgb) t.colorSpace = T.SRGBColorSpace; t.anisotropy = maxAniso; return t; };
  const cupG = new T.Group();

  // liquid
  const ART = { y0: 0.378, y1: 0.918 };
  const LIQ_R = 0.94, LEVEL = 0.368, LIQ_BOT = 0.893;
  const bands = bandColors(d, iw, ih, ART.y0, ART.y1);
  const liqTex = tex(liquidCanvas(bands, 512), true);
  liqTex.wrapS = T.RepeatWrapping;
  const liqPts = [];
  for (let k = 0; k <= 24; k++) { const yn = LIQ_BOT - (LIQ_BOT - LEVEL) * k / 24; liqPts.push(new T.Vector2(rAt(CUP.body, yn) * LIQ_R, Y(yn))); }
  cupG.add(new T.Mesh(new T.LatheGeometry(liqPts, 96), new T.MeshStandardMaterial({ map: liqTex, roughness: 0.35, envMap, envMapIntensity: 0.5 })));
  const liqBottom = new T.Mesh(new T.CircleGeometry(rAt(CUP.body, LIQ_BOT) * LIQ_R, 48),
    new T.MeshStandardMaterial({ color: new T.Color().setRGB(...bands[bands.length - 1].map(x => x / 255)).convertSRGBToLinear(), roughness: 0.6 }));
  liqBottom.rotation.x = Math.PI / 2; liqBottom.position.y = Y(LIQ_BOT); cupG.add(liqBottom);

  // rippling surface
  const surfR = rAt(CUP.body, LEVEL) * LIQ_R;
  const surfGeo = new T.RingGeometry(0.0005, surfR, 56, 10);
  const surfBase = Float32Array.from(surfGeo.attributes.position.array);
  const mid = bands.slice(Math.floor(bands.length * 0.35), Math.floor(bands.length * 0.85));
  const avg = [0, 1, 2].map(i => mid.reduce((t, c) => t + c[i], 0) / Math.max(1, mid.length));
  const top = bands[Math.min(bands.length - 1, 6)];
  const topCol = [0, 1, 2].map(i => avg[i] * 0.65 + top[i] * 0.35);
  const surface = new T.Mesh(surfGeo, new T.MeshPhysicalMaterial({
    color: new T.Color().setRGB(topCol[0] / 255, topCol[1] / 255, topCol[2] / 255).convertSRGBToLinear(),
    roughness: 0.06, clearcoat: GLARE, clearcoatRoughness: 0.02, specularIntensity: GLARE, envMap, envMapIntensity: 1.1 * GLARE,
  }));
  surface.rotation.x = -Math.PI / 2;
  const surfHold = new T.Group(); surfHold.position.y = Y(LEVEL); cupG.add(surfHold);
  surfHold.add(surface);

  // ice
  const dropTex = droplets();
  const iceMat = new T.MeshPhysicalMaterial({ color: 0xeef7ff, roughness: 0.12, transparent: true, opacity: 0.34, clearcoat: 1, clearcoatRoughness: 0.05, envMap, envMapIntensity: 1.2, depthWrite: false });
  const iceGloss = new T.MeshPhysicalMaterial({
    color: 0x000000, roughness: 0.03, clearcoat: GLARE, clearcoatRoughness: 0.02, specularIntensity: GLARE,
    normalMap: dropTex, normalScale: new T.Vector2(0.35, 0.35), envMap, envMapIntensity: 2.2 * GLARE, transparent: true, depthWrite: false, ...ADD_LIGHT,
  });
  const cubeGeo = roundedCube(1, 0.22);
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const slope = Math.atan((CUP.body.rTop - CUP.body.rBot) / (CUP.body.y1 - CUP.body.y0));
  const wall = [];
  [0.395, 0.462, 0.528, 0.594, 0.66, 0.726, 0.79, 0.85].forEach((yn, ri) => {
    const R = rAt(CUP.body, yn);
    const s = 0.068 - ri * 0.0022 + (rnd() - 0.5) * 0.006;
    const n = Math.max(6, Math.floor((2 * Math.PI * R) / (s * 1.16)));
    const off = ri * 0.37 + rnd();
    for (let k = 0; k < n; k++) {
      if (rnd() < 0.08) continue;
      const a = (k / n) * Math.PI * 2 + off + (rnd() - 0.5) * 0.3;
      const sz = s * (0.86 + rnd() * 0.26), spin = (rnd() - 0.5) * 0.6;
      const half = sz / 2 * (Math.abs(Math.cos(spin)) + Math.abs(Math.sin(spin)));
      const sag = R - Math.sqrt(Math.max(0, R * R - half * half));
      const c = R - 0.0006 - sag - sz / 2;
      wall.push({ x: Math.sin(a) * c, y: Y(yn + (rnd() - 0.5) * 0.02), z: Math.cos(a) * c, a, s: sz, spin });
    }
  });
  const wallMat = iceMat.clone(); wallMat.opacity = 0.07;
  const wallIce = new T.InstancedMesh(cubeGeo, wallMat, wall.length);
  const mtx = new T.Matrix4(), q = new T.Quaternion(), e = new T.Euler(), sc3 = new T.Vector3(), p3 = new T.Vector3();
  wall.forEach((w, i) => { e.set(slope, w.a, w.spin, 'YXZ'); q.setFromEuler(e); mtx.compose(p3.set(w.x, w.y, w.z), q, sc3.set(w.s, w.s, w.s)); wallIce.setMatrixAt(i, mtx); });
  wallIce.renderOrder = 1;
  cupG.add(wallIce);
  const floaters = [[0, 0, 0.07], [30, 0.62, 0.066], [150, 0.6, 0.07], [210, 0.62, 0.064], [270, 0.6, 0.07], [330, 0.62, 0.066], [100, 0.35, 0.05]].map(([deg, rr, size], k) => {
    const m = new T.Mesh(cubeGeo, iceMat);
    m.scale.setScalar(size); m.renderOrder = 1;
    const shine = new T.Mesh(cubeGeo, iceGloss); shine.renderOrder = 1; m.add(shine);
    const a = deg * D, rad = Math.min(surfR * rr, surfR - size * 0.78);
    m.position.set(Math.sin(a) * rad, Y(LEVEL) + size * 0.16, Math.cos(a) * rad);
    m.rotation.set((rnd() - 0.5) * 0.5, rnd() * Math.PI, (rnd() - 0.5) * 0.5);
    cupG.add(m);
    return { m, base: m.position.clone(), rot: m.rotation.clone(), ph: k * 1.7 };
  });

  // clear plastic shell: faint haze + additive gloss so the ice shows through
  const by = CUP.body.y1 + 0.004, rb = CUP.body.rBot;
  const shellPts = [new T.Vector2(0.0001, Y(by)), new T.Vector2(rb - 0.014, Y(by)), new T.Vector2(rb - 0.004, Y(by - 0.004)), new T.Vector2(rb, Y(by - 0.014))];
  for (let k = 1; k <= 30; k++) { const yn = (by - 0.014) - ((by - 0.014) - CUP.body.y0) * k / 30; shellPts.push(new T.Vector2(rAt(CUP.body, yn) + 0.002, Y(yn))); }
  const shellGeo = new T.LatheGeometry(shellPts, 96);
  const haze = opacity => new T.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.35, transparent: true, opacity, depthWrite: false, side: T.DoubleSide, envMap });
  const gloss = strength => new T.MeshPhysicalMaterial({
    color: 0x000000, roughness: 0.1, clearcoat: GLARE, clearcoatRoughness: 0.08, specularIntensity: GLARE,
    normalMap: dropTex, normalScale: new T.Vector2(0.12, 0.12), envMap, envMapIntensity: strength * GLARE,
    transparent: true, depthWrite: false, ...ADD_LIGHT, side: T.DoubleSide,
  });
  cupG.add(new T.Mesh(shellGeo, haze(0.03)));
  const shellGloss = new T.Mesh(shellGeo, gloss(1.0)); shellGloss.renderOrder = 3; cupG.add(shellGloss);
  const lip = new T.Mesh(new T.TorusGeometry(rAt(CUP.body, CUP.body.y0) + 0.004, 0.0058, 12, 96), haze(0.3));
  lip.rotation.x = Math.PI / 2; lip.position.y = Y(CUP.body.y0 + 0.002); lip.renderOrder = 3; cupG.add(lip);
  const basePts = [];
  for (let k = 0; k <= 6; k++) { const yn = by - (by - LIQ_BOT) * k / 6; basePts.push(new T.Vector2(rAt(CUP.body, Math.min(yn, CUP.body.y1)) + 0.0028, Y(yn))); }
  const base = new T.Mesh(new T.LatheGeometry(basePts, 64), haze(0.22)); base.renderOrder = 3; cupG.add(base);
  const baseDisc = new T.Mesh(new T.CircleGeometry(rb, 48), haze(0.18)); baseDisc.rotation.x = Math.PI / 2; baseDisc.position.y = Y(LIQ_BOT) - 0.002; cupG.add(baseDisc);

  // printed logo on the front
  const logoPart = { y0: ART.y0, y1: ART.y1, rTop: rAt(CUP.body, ART.y0), rBot: rAt(CUP.body, ART.y1) };
  const logoTex = tex(logoCanvas(d, iw, ih, logoPart, bands, U), true);
  logoTex.wrapS = T.RepeatWrapping; logoTex.offset.x = 0.5;
  const logoPts = [];
  for (let k = 0; k <= 16; k++) { const yn = ART.y1 - (ART.y1 - ART.y0) * k / 16; logoPts.push(new T.Vector2(rAt(CUP.body, yn) + 0.0035, Y(yn))); }
  const logo = new T.Mesh(new T.LatheGeometry(logoPts, 96), new T.MeshStandardMaterial({ map: logoTex, transparent: true, roughness: 0.5, depthWrite: false }));
  logo.renderOrder = 2; cupG.add(logo);

  // domed lid, red plug, blue straw
  const lidPts = [[0.1944, 0.36], [0.1962, 0.346], [0.1905, 0.336], [0.171, 0.322], [0.1655, 0.302], [0.162, 0.276], [0.153, 0.263], [0.118, 0.2565], [0.06, 0.2545], [0.0001, 0.254]]
    .map(([r, yn]) => new T.Vector2(r, Y(yn)));
  const lidGeo = new T.LatheGeometry(lidPts, 96);
  const lidHaze = new T.Mesh(lidGeo, haze(0.18)); lidHaze.renderOrder = 4; cupG.add(lidHaze);
  const lidGloss = new T.Mesh(lidGeo, gloss(0.9)); lidGloss.renderOrder = 5; cupG.add(lidGloss);
  const plug = new T.Mesh(new T.CylinderGeometry(CUP.plug.r, CUP.plug.r * 1.08, CUP.plug.h, 24),
    new T.MeshPhysicalMaterial({ color: 0xd9202a, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.1, envMap }));
  plug.position.set(CUP.plug.x, Y(0.257) + CUP.plug.h / 2, CUP.plug.z);
  cupG.add(plug);
  const sLenOut = CUP.straw.len + 0.03, sLenIn = 0.32, sLen = sLenOut + sLenIn;
  const straw = new T.Mesh(new T.CylinderGeometry(CUP.straw.r, CUP.straw.r, sLen, 32, 1, true),
    new T.MeshPhysicalMaterial({ color: 0x6ab6e6, roughness: 0.5, clearcoat: 0.25, clearcoatRoughness: 0.3, side: T.DoubleSide, envMap }));
  const strawHold = new T.Group();
  strawHold.position.set(CUP.straw.x, Y(CUP.straw.y), 0);
  strawHold.rotation.z = -CUP.straw.tilt * D;
  straw.position.y = sLen / 2 - sLenIn;
  strawHold.add(straw);
  cupG.add(strawHold);

  cupG.traverse(o => { if (o.isMesh) o.castShadow = false; });
  liqBottom.castShadow = true;

  // gentle ripples + bobbing ice (only for cups that animate)
  const pos = surfGeo.attributes.position;
  function waves(t, amp) {
    for (let i = 0; i < pos.count; i++) {
      const x = surfBase[i * 3], y = surfBase[i * 3 + 1];
      let h = amp * (Math.sin(x * 38 + t * 2.1) * 0.6 + Math.sin((x * 0.5 + y * 0.86) * 52 - t * 2.7) * 0.4 + Math.sin((y - x * 0.3) * 71 + t * 3.4) * 0.25);
      const rr = Math.hypot(x, y) / surfR;
      h += Math.pow(Math.max(0, rr - 0.86) / 0.14, 2) * 0.0025;
      pos.setZ(i, h);
    }
    pos.needsUpdate = true;
    surfGeo.computeVertexNormals();
  }
  waves(0, 0.0016);
  // a pristine copy for static duplicates (callers add their own userData to group)
  const template = cupG.clone();
  let time = 0;
  return {
    group: cupG,
    copy: () => template.clone(),
    // spin: turn the cup (radians) · stir: 0..1 makes the drink slosh a little
    step(dt, spin, stir = 0) {
      time += dt;
      cupG.rotation.y = spin;
      surfHold.rotation.y = -spin;
      waves(time, 0.0016 + stir * 0.006);
      floaters.forEach(f => {
        f.m.position.y = f.base.y + Math.sin(time * 1.9 + f.ph) * (0.0025 + stir * 0.004);
        f.m.rotation.x = f.rot.x + Math.sin(time * 1.3 + f.ph) * (0.05 + stir * 0.12);
        f.m.rotation.z = f.rot.z + Math.cos(time * 1.1 + f.ph) * (0.05 + stir * 0.12);
      });
    },
  };
}

// One built model per photo; extra copies share its geometry, textures and materials.
const cache = new Map();
export function realCup(url, texSize = 1024) {
  if (!cache.has(url)) cache.set(url, loadCupPixels(url).then(px => (px ? build(px, texSize) : null)).catch(() => null));
  return cache.get(url);
}
