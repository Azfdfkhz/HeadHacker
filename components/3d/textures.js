import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";

// Tekstur dibuat lewat canvas (tanpa file gambar). Hanya dipanggil di client.
function make(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.wrapS = t.wrapT = RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

export const brushedMetal = (base) =>
  make(512, 512, (g, w, h) => {
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 3000; i++) {
      g.globalAlpha = Math.random() * 0.07;
      g.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
      g.fillRect(0, Math.random() * h, w, 1 + Math.random());
    }
  });

export const keyboard = () =>
  make(1024, 620, (g, w, h) => {
    g.fillStyle = "#0f1214"; g.fillRect(0, 0, w, h);
    const rows = [14, 14, 13, 12, 11, 7], pad = 16, kh = (h - pad * 2) / rows.length;
    const letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
    rows.forEach((n, r) => {
      const kw = (w - pad * 2) / n;
      for (let i = 0; i < n; i++) {
        const x = pad + i * kw, y = pad + r * kh;
        g.fillStyle = "#242c30"; g.beginPath(); g.roundRect(x + 3, y + 3, kw - 6, kh - 6, 8); g.fill();
        g.fillStyle = "#8c989a"; g.font = "22px monospace"; g.textAlign = "center";
        g.fillText(letters[(r * 7 + i) % letters.length], x + kw / 2, y + kh / 2 + 8);
      }
    });
  });

// Pemetaan nama material di Laptop.glb -> tekstur. Sesuaikan di sini kalau ada bagian yang salah.
export const materialOverrides = {
  laptop: {
    // Asset laptop baru memakai material PBR langsung di GLB.
    // Override hanya memberi finishing ringan agar konsisten dengan tema HEADHACKER.
    Laptop_Anodized_Aluminum: (m) => paint(m, { color: "#242a2f", metalness: 0.82, roughness: 0.28 }),
    Laptop_Edges: (m) => paint(m, { color: "#353c42", metalness: 0.78, roughness: 0.24 }),
    Keyboard_Black: (m) => paint(m, { color: "#111519", metalness: 0.25, roughness: 0.52 }),
    Keycaps: (m) => paint(m, { color: "#171d21", metalness: 0.18, roughness: 0.58 }),
    Trackpad: (m) => paint(m, { color: "#242c32", metalness: 0.55, roughness: 0.32 }),
    Hinge: (m) => paint(m, { color: "#0e1215", metalness: 0.8, roughness: 0.24 }),
    Screen_Bezel: (m) => paint(m, { color: "#05080b", metalness: 0.2, roughness: 0.3 }),
    // Jangan mengganti map layar: texture cyber UI tertanam di GLB.
    Screen_Cyber_UI: (m) => { m.metalness = 0.02; m.roughness = 0.18; m.emissive.set("#14364b"); m.emissiveIntensity = 0.65; m.needsUpdate = true; },
  },
};

function paint(m, { map, color = "#ffffff", metalness, roughness }) {
  if (map) m.map = map;
  m.color.set(color);
  m.metalness = metalness;
  m.roughness = roughness;
  m.needsUpdate = true;
}
