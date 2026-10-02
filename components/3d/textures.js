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
    "Material.002": (m) => paint(m, { map: brushedMetal("#8d969a"), metalness: 0.65, roughness: 0.38 }), // bodi
    "Material.003": (m) => paint(m, { map: brushedMetal("#7f888c"), metalness: 0.65, roughness: 0.4 }), // lid
    "Material.010": (m) => paint(m, { map: keyboard(), metalness: 0, roughness: 0.7 }), // area keyboard
    "Material.004": (m) => paint(m, { color: "#6c767a", metalness: 0.3, roughness: 0.25 }), // trackpad
  },
};

function paint(m, { map, color = "#ffffff", metalness, roughness }) {
  if (map) m.map = map;
  m.color.set(color);
  m.metalness = metalness;
  m.roughness = roughness;
  m.needsUpdate = true;
}
