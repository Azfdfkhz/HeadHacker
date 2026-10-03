// Tambah equipment baru = tambah satu objek di sini.
// hasModel: true  -> pakai file GLB di /public/models (lihat `model`)
// hasModel: false -> viewer menampilkan placeholder kotak (dims = [lebar, tinggi, dalam])
// hotspot: posisi (%) di atas gambar ruangan /public/images/room.jpg
export const equipment = [
  { id: "computer", annotations: [{ label: "Screen", text: "Main display for monitoring and accessing systems.", at: [0.5, 0.7, 0.9] }, { label: "Stand", text: "Keeps the display at eye level on the desk.", at: [0.5, 0.1, 0.5] }], note: "Main workstation. Everything gets watched from here.", name: "Computer", category: "Equipment", type: "Workstation", status: "Active", location: "Main Room",
    description: "Workstation utama yang digunakan untuk mengakses dan memantau sistem.",
    model: "/models/computer.glb", hasModel: true, dims: [2.4, 1.5, 0.7], hotspot: { x: 47, y: 50 } },
  { id: "laptop", annotations: [{ label: "Screen", text: "Active display running the operational tools.", at: [0.5, 0.75, 0.2] }, { label: "Keyboard", text: "Full keyboard for working away from the main desk.", at: [0.5, 0.1, 0.65] }, { label: "Trackpad", text: "Pointer input without a mouse.", at: [0.5, 0.05, 0.92] }], note: "Portable terminal. Same access, any room.", name: "Laptop", category: "Equipment", type: "Workstation", status: "Active", location: "Main Room",
    description: "Laptop terbuka dengan layar aktif untuk mengakses sistem, memantau jaringan, dan menjalankan tools operasional.",
    model: "/models/laptop.glb", hasModel: true, dims: [2, 0.12, 1.4], hotspot: { x: 39, y: 58 } },
  { id: "handheld-hack", annotations: [{ label: "Display", text: "Small screen showing live status in the field.", at: [0.5, 0.75, 0.95] }, { label: "Keypad", text: "Physical keys for quick input without a computer.", at: [0.5, 0.3, 0.95] }, { label: "Antenna", text: "Connects the device to nearby systems.", at: [0.8, 0.97, 0.5] }], note: "Field unit. Reaches the systems we can't carry the desk to.", name: "Handheld Hack", category: "Field Device", type: "Portable", status: "Active", location: "Main Room",
    description: "Perangkat portabel yang digunakan untuk berinteraksi dengan sistem di lapangan.",
    model: "/models/handheld-hack.glb", hasModel: true, dims: [0.95, 1.7, 0.3], hotspot: { x: 56, y: 60 } },
  { id: "flashdisk", annotations: [{ label: "USB connector", text: "Plugs into a port to copy data in or out.", at: [0.5, 0.5, 0.97] }, { label: "Body", text: "Compact housing, easy to carry and hide.", at: [0.5, 0.9, 0.4] }], note: "Small enough to lose, important enough not to.", name: "Flashdisk", category: "Data Storage", type: "Storage", status: "Stored", location: "Main Room",
    description: "Flashdisk USB untuk menyimpan dan memindahkan data penting secara portabel.",
    model: "/models/flashdisk.glb", hasModel: true, dims: [0.5, 0.15, 1.6], hotspot: { x: 49, y: 61 } },
  { id: "radio", annotations: [{ label: "Antenna", text: "Extends range for team communication.", at: [0.75, 0.97, 0.5] }, { label: "Display", text: "Shows channel and signal.", at: [0.5, 0.65, 0.95] }, { label: "Knob", text: "Volume and channel control.", at: [0.25, 0.95, 0.5] }], note: "Our line to the rest of the team.", name: "Radio", category: "Communication", type: "Communication", status: "Active", location: "Main Room",
    description: "Perangkat komunikasi untuk berhubungan dengan anggota tim.",
    model: "/models/radio.glb", hasModel: true, dims: [0.82, 1.45, 0.46], hotspot: { x: 69.5, y: 57 } },
  { id: "backpack", annotations: [{ label: "Main compartment", text: "Holds the larger devices and gear.", at: [0.5, 0.6, 0.95] }, { label: "Front pocket", text: "Quick access for small items.", at: [0.5, 0.25, 0.97] }, { label: "Strap", text: "Padded straps for carrying during operations.", at: [0.2, 0.5, 0.05] }], note: "Everything we take out the door goes in here.", name: "Backpack", category: "Equipment", type: "Carry", status: "Stored", location: "Main Room",
    description: "Tempat membawa perangkat dan perlengkapan selama operasi.",
    model: "/models/backpack.glb", hasModel: true, dims: [1.35, 1.75, 0.7], hotspot: { x: 30, y: 72 } },
];

export const getEquipment = (id) => equipment.find((e) => e.id === id);
