/**
 * equipment.js — all items in the HEADHACKER world.
 *
 * Fields:
 *   id            unique slug, matches GLB filename and URL
 *   name          display name
 *   category      filter group (Equipment / Field Device / Communication / Data Storage)
 *   type          subcategory
 *   status        operational status
 *   location      room
 *   note          short field note (shown in Hideout sidebar)
 *   description   longer description (shown in Archive detail)
 *   model         path to GLB (if hasModel: true)
 *   hasModel      boolean — true = load GLB, false = use procedural fallback
 *   comingSoon    boolean — GLB not yet exported
 *   dims          placeholder box dimensions [w, h, d]
 *   hotspot       {x, y} percentage position on room.jpg
 *   annotations   [{label, text, at: [x,y,z]}] — 3D annotation markers
 *   journalEntry  ID of the journal entry unlocked when this item is discovered
 */
export const equipment = [
  {
    id: "computer",
    name: "Computer",
    category: "Equipment",
    type: "Workstation",
    status: "Active",
    location: "Main Room",
    note: "Main workstation. Everything gets watched from here.",
    description: "A modified field workstation used for monitoring local communications and accessing network infrastructure.",
    model: "/models/computer.glb",
    hasModel: true,
    dims: [2.4, 1.5, 0.7],
    hotspot: { x: 47, y: 50 },
    journalEntry: "entry-002",
    annotations: [
      { label: "Screen", text: "Main display for monitoring and accessing systems.", at: [0.5, 0.7, 0.9] },
      { label: "Stand", text: "Keeps the display at eye level on the desk.", at: [0.5, 0.1, 0.5] },
    ],
  },
  {
    id: "laptop",
    name: "Laptop",
    category: "Equipment",
    type: "Workstation",
    status: "Active",
    location: "Main Room",
    note: "Portable terminal. Same access, any room.",
    description: "Laptop terbuka dengan layar aktif untuk mengakses sistem, memantau jaringan, dan menjalankan tools operasional.",
    model: "/models/laptop.glb",
    hasModel: true,
    dims: [2, 0.12, 1.4],
    hotspot: { x: 39, y: 58 },
    journalEntry: "entry-003",
    annotations: [
      { label: "Screen", text: "Active display running the operational tools.", at: [0.5, 0.75, 0.2] },
      { label: "Keyboard", text: "Full keyboard for working away from the main desk.", at: [0.5, 0.1, 0.65] },
      { label: "Trackpad", text: "Pointer input without a mouse.", at: [0.5, 0.05, 0.92] },
    ],
  },
  {
    id: "handheld-hack",
    name: "Handheld Hack",
    category: "Field Device",
    type: "Portable",
    status: "Active",
    location: "Main Room",
    note: "Field unit. Reaches the systems we can't carry the desk to.",
    description: "Perangkat portabel yang digunakan untuk berinteraksi dengan sistem di lapangan.",
    hasModel: false,
    comingSoon: true,
    dims: [0.95, 1.7, 0.3],
    hotspot: { x: 56, y: 60 },
    journalEntry: "entry-004",
  },
  {
    id: "flashdisk",
    name: "Flashdisk",
    category: "Data Storage",
    type: "Storage",
    status: "Stored",
    location: "Main Room",
    note: "Small enough to lose, important enough not to.",
    description: "Flashdisk USB untuk menyimpan dan memindahkan data penting secara portabel.",
    model: "/models/flashdisk.glb",
    hasModel: true,
    dims: [0.5, 0.15, 1.6],
    hotspot: { x: 49, y: 61 },
    journalEntry: "entry-005",
    annotations: [
      { label: "USB connector", text: "Plugs into a port to copy data in or out.", at: [0.5, 0.5, 0.97] },
      { label: "Body", text: "Compact housing, easy to carry and hide.", at: [0.5, 0.9, 0.4] },
    ],
  },
  {
    id: "radio",
    name: "Radio",
    category: "Communication",
    type: "Communication",
    status: "Active",
    location: "Main Room",
    note: "Our line to the rest of the team.",
    description: "Perangkat komunikasi untuk berhubungan dengan anggota tim.",
    hasModel: false,
    comingSoon: true,
    soonNote: "To be replaced by the HT (handheld talkie).",
    dims: [0.82, 1.45, 0.46],
    hotspot: { x: 69.5, y: 57 },
    journalEntry: "entry-006",
  },
  {
    id: "backpack",
    name: "Backpack",
    category: "Equipment",
    type: "Carry",
    status: "Stored",
    location: "Main Room",
    note: "Everything we take out the door goes in here.",
    description: "Tempat membawa perangkat dan perlengkapan selama operasi lapangan.",
    model: "/models/backpack.glb",
    hasModel: true,
    dims: [1.35, 1.75, 0.7],
    hotspot: { x: 30, y: 72 },
    journalEntry: "entry-007",
    annotations: [
      { label: "Main compartment", text: "Holds the larger devices and gear.", at: [0.5, 0.6, 0.95] },
      { label: "Front pocket", text: "Quick access for small items.", at: [0.5, 0.25, 0.97] },
      { label: "Strap", text: "Padded straps for carrying during operations.", at: [0.2, 0.5, 0.05] },
    ],
  },
];

export const getEquipment = (id) => equipment.find((e) => e.id === id);
