// Tambah equipment baru = tambah satu objek di sini.
// hasModel: true  -> pakai file GLB di /public/models (lihat `model`)
// hasModel: false -> viewer menampilkan placeholder kotak (dims = [lebar, tinggi, dalam])
// hotspot: posisi (%) di atas gambar ruangan /public/images/room.jpg
export const equipment = [
  { id: "computer", name: "Computer", category: "Equipment", type: "Workstation", status: "Active", location: "Ruang Utama",
    description: "Workstation utama yang digunakan untuk mengakses dan memantau sistem.",
    model: "/models/computer.glb", hasModel: true, dims: [2.4, 1.5, 0.7], hotspot: { x: 47, y: 50 } },
  { id: "laptop", name: "Laptop", category: "Equipment", type: "Workstation", status: "Active", location: "Ruang Utama",
    description: "Laptop terbuka dengan layar aktif untuk mengakses sistem, memantau jaringan, dan menjalankan tools operasional.",
    model: "/models/laptop.glb", hasModel: true, dims: [2, 0.12, 1.4], hotspot: { x: 39, y: 58 } },
  { id: "handheld-hack", name: "Handheld Hack", category: "Field Device", type: "Portable", status: "Active", location: "Ruang Utama",
    description: "Perangkat portabel yang digunakan untuk berinteraksi dengan sistem di lapangan.",
    model: "/models/handheld-hack.glb", hasModel: true, dims: [0.95, 1.7, 0.3], hotspot: { x: 56, y: 60 } },
  { id: "flashdisk", name: "Flashdisk", category: "Data Storage", type: "Storage", status: "Stored", location: "Ruang Utama",
    description: "Flashdisk USB untuk menyimpan dan memindahkan data penting secara portabel.",
    model: "/models/flashdisk.glb", hasModel: true, dims: [0.5, 0.15, 1.6], hotspot: { x: 49, y: 61 } },
  { id: "radio", name: "Radio", category: "Communication", type: "Komunikasi", status: "Active", location: "Ruang Utama",
    description: "Perangkat komunikasi untuk berhubungan dengan anggota tim.",
    model: "/models/radio.glb", hasModel: true, dims: [0.82, 1.45, 0.46], hotspot: { x: 69.5, y: 57 } },
  { id: "backpack", name: "Backpack", category: "Equipment", type: "Carry", status: "Stored", location: "Ruang Utama",
    description: "Tempat membawa perangkat dan perlengkapan selama operasi.",
    model: "/models/backpack.glb", hasModel: true, dims: [1.35, 1.75, 0.7], hotspot: { x: 30, y: 72 } },
];

export const getEquipment = (id) => equipment.find((e) => e.id === id);
