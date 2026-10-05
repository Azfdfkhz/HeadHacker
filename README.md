# HEADHACKER

Next.js 14 (JSX) + Tailwind 3 + React Three Fiber.

```bash
npm install
npm run dev     # http://localhost:3000
```

## Aset yang perlu kamu taruh
- `public/images/exterior.svg` — gambar rumah dari luar (landing)
- `public/images/room.jpg` — gambar Ruang Utama (16:9)
- `public/images/thumbs/<id>.png` — thumbnail tiap equipment (id: computer, laptop, handheld-hack, flashdisk, radio, backpack)
- `public/models/<id>.glb` — model 3D; lalu set `hasModel: true` di `data/equipment.js`

Tanpa aset, halaman tetap jalan (gradient + kotak placeholder).

## Struktur
- `data/equipment.js` — satu-satunya sumber data equipment + posisi hotspot (%)
- `components/sections/` Hero, Hideout, Equipment, ItemDetail
- `components/ui/` Button, ObjectHotspot, ObjectCard, InfoPanel, SceneImage
- `components/3d/ObjectViewer.jsx` — viewer R3F (rotate, zoom, reset)

## Belum dikerjakan
1. `exterior.svg`, `room.jpg`, dan thumbnail sekarang dipotong dari mockup (resolusi rendah, ganti dengan render sendiri nanti). Thumbnail Computer belum ada. Model GLB (di atas). `flashdisk.glb` sudah diset aktif tapi file-nya harus kamu export dari Blender; sisanya belum ada
2. Hotspot x/y di `data/equipment.js` masih perkiraan; sesuaikan setelah `room.jpg` ada
3. Cinematic ENTER masih zoom 2D + fade (bukan kamera 3D, pintu belum "terbuka")
4. Exterior & Main Room belum jadi scene 3D (R3F + GLB environment)
5. Ruangan lain (Kamar, Kamar Mandi, Dapur), tab Environment/Characters
6. About: Concept & Development masih kosong
7. Optimasi: Draco/Meshopt, preload model, mobile pinch tuning
8. Sound & transisi lanjutan (Phase 4 PRD)
9. Proyek ini belum pernah dijalankan/di-build (lingkungan penulisan tanpa internet)
