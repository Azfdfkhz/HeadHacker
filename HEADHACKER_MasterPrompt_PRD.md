# HEADHACKER — MASTER PROMPT / PRD

## 1. Project Overview

**Nama:** HeadHacker  
**Jenis:** Interactive 3D Game Showcase Website  
**Purpose:** Website pengenalan game VR *HeadHacker* melalui eksplorasi lingkungan dan equipment 3D.

Website bukan sekadar landing page dan bukan katalog produk.

Konsep utamanya:

> Pengunjung memasuki sebuah bangunan, menemukan ruangan tempat operasi berlangsung, lalu mengeksplorasi berbagai equipment yang digunakan dalam dunia HeadHacker.

Experience harus terasa seperti **interactive portfolio / game showcase sederhana**, bukan game AAA.

---

## 2. Core Experience

```text
LANDING
   ↓
EXTERIOR BUILDING
   ↓
ENTER
   ↓
CAMERA MOVES INSIDE
   ↓
MAIN ROOM
   ↓
EXPLORE OBJECTS
   ↓
SELECT OBJECT
   ↓
3D OBJECT DETAIL
   ↓
EQUIPMENT ARCHIVE
```

Contoh alur:

```text
User membuka website
       ↓
Melihat rumah/bangunan dari luar
       ↓
Klik "ENTER"
       ↓
Kamera bergerak menuju pintu
       ↓
Pintu terbuka
       ↓
Kamera masuk ke ruangan
       ↓
Terlihat meja komputer
       ↓
User melihat beberapa objek
       ↓
Computer / Handheld Hack / Flashdisk / Radio / Backpack
       ↓
User klik salah satu
       ↓
Object ditampilkan lebih besar
       ↓
Informasi object muncul
```

---

## 3. Design Direction

### Target Visual

**Mid-level 3D website.**

Bukan:

- AAA game website
- Cyberpunk neon
- Sci-fi berlebihan
- UI penuh HUD
- Terlalu banyak particle
- Realistic cinematic Hollywood
- Terlalu kompleks

Tetapi:

- Realistic/simple 3D
- Sedikit stylized
- Clean
- Dark
- Calm
- Atmospheric
- Mudah dibuat
- Mudah dikembangkan

### Referensi Visual

Gunakan pendekatan:

**3D game environment + portfolio website + interactive museum**

Bukan seperti game commercial AAA.

---

## 4. Color System

Gunakan warna sederhana.

| Purpose | Color |
|---|---|
| Background | `#101416` |
| Surface | `#182024` |
| Secondary Surface | `#222B2F` |
| Primary Text | `#E7E8E3` |
| Secondary Text | `#9AA5A3` |
| Accent | `#91AAA5` |
| Border | `rgba(255,255,255,0.12)` |

Accent hanya digunakan untuk:

- Active state
- Selected object
- Button
- Hotspot
- Progress

Jangan menggunakan terlalu banyak warna.

---

## 5. Typography

Gunakan font sans-serif modern.

Rekomendasi:

- Inter
- Manrope
- Space Grotesk
- DM Sans

Heading:

```text
HEADHACKER
```

Body:

```text
A VR surveillance experience.
```

Jangan menggunakan typography sci-fi yang terlalu futuristik.

---

## 6. Landing Page

Landing page menampilkan **bangunan dari luar**.

Visual cukup terdiri dari:

- 1 rumah/bangunan
- Jalan
- Beberapa lampu
- Pohon
- Kabel listrik
- Langit
- Sedikit fog

Tidak perlu environment besar.

### UI

```text
HEADHACKER

A VR SURVEILLANCE EXPERIENCE

[ ENTER → ]
```

Navigation:

```text
HOME
ARCHIVE
ABOUT
```

---

## 7. Cinematic Entry

Ketika user menekan **ENTER**, jalankan animasi kamera.

### Sequence

```text
0.0s
Camera berada di depan rumah

        ↓

1.5s
Camera bergerak maju

        ↓

3.0s
Camera mendekati pintu

        ↓

4.0s
Pintu terbuka

        ↓

5.0s
Camera masuk

        ↓

7.0s
Camera berhenti

        ↓

8.0s
Interactive mode aktif
```

Jangan membuat animasi terlalu panjang.

Target:

**5–10 detik.**

User juga harus bisa melakukan:

```text
SKIP →
```

---

## 8. Main Room

Setelah masuk, tampilkan satu ruangan sederhana.

Contoh layout:

```text
┌─────────────────────────────┐
│                             │
│        WINDOW               │
│                             │
│    ┌───────────────┐        │
│    │   COMPUTER    │        │
│    └───────────────┘        │
│          DESK               │
│                             │
│     [CHAIR]                 │
│                             │
│                  [BED]      │
│                             │
└─────────────────────────────┘
```

### Furniture

- Desk
- Chair
- Bed
- Cabinet
- Shelf

### Equipment

- Computer
- Laptop
- Handheld Hack
- Flashdisk
- Radio
- Backpack

Ruangan tidak perlu besar. Fokus pada komposisi dan readability.

---

## 9. Interactive Object

Setiap equipment memiliki hotspot.

Contoh:

```text
        COMPUTER
            ●
            │
            ▼

       ┌────────────┐
       │ COMPUTER   │
       │ Inspect →  │
       └────────────┘
```

Ketika mouse hover:

- Object sedikit highlight
- Muncul nama object
- Cursor berubah

Contoh:

```text
COMPUTER
Equipment
```

Klik → buka detail.

---

## 10. Object Detail

Object detail menggunakan layout sederhana.

```text
┌────────────────────────────────────────┐
│ ← BACK TO ROOM                         │
│                                        │
│              3D OBJECT                 │
│                                        │
│             [ LAPTOP ]                 │
│                                        │
│          Drag to rotate                │
│                                        │
│                          LAPTOP        │
│                          ──────        │
│                          Equipment     │
│                                        │
│                          Laptop yang    │
│                          digunakan      │
│                          untuk akses    │
│                          sistem.       │
│                                        │
│                          STATUS        │
│                          ACTIVE        │
│                                        │
└────────────────────────────────────────┘
```

Object dapat:

- Rotate
- Zoom
- Reset rotation

Tidak perlu physics.

---

## 11. Equipment Archive

Buat halaman:

```text
EQUIPMENT

Peralatan yang digunakan
dalam operasi.
```

Contoh:

```text
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Laptop  │ │Handheld │ │Flashdisk│
│         │ │  Hack   │ │         │
└─────────┘ └─────────┘ └─────────┘

┌─────────┐ ┌─────────┐
│  Radio  │ │Backpack │
│         │ │         │
└─────────┘ └─────────┘
```

Setiap item memiliki:

- Thumbnail
- Name
- Category
- Short description

Klik item → buka 3D detail.

---

## 12. Initial Equipment

### 01 — Computer

**Category:** Equipment

**Description:**

> Workstation utama yang digunakan untuk mengakses dan memantau sistem.

---

### 02 — Handheld Hack

**Category:** Field Device

**Description:**

> Perangkat portabel yang digunakan untuk berinteraksi dengan sistem di lapangan.

---

### 03 — Flashdisk

**Category:** Data Storage

**Description:**

> Media penyimpanan portabel untuk memindahkan data penting.

---

### 04 — Radio

**Category:** Communication

**Description:**

> Perangkat komunikasi untuk berhubungan dengan anggota tim.

---

### 05 — Backpack

**Category:** Equipment

**Description:**

> Tempat membawa perangkat dan perlengkapan selama operasi.

---

## 13. Data Structure

Gunakan data-driven architecture.

Contoh:

```js
const equipment = [
  {
    id: "computer",
    name: "Computer",
    category: "Equipment",
    model: "/models/computer.glb",
    description:
      "Workstation utama yang digunakan untuk mengakses dan memantau sistem.",
    status: "Active",
  },

  {
    id: "handheld-hack",
    name: "Handheld Hack",
    category: "Field Device",
    model: "/models/handheld-hack.glb",
    description:
      "Perangkat portabel yang digunakan untuk berinteraksi dengan sistem di lapangan.",
    status: "Active",
  },

  {
    id: "flashdisk",
    name: "Flashdisk",
    category: "Data Storage",
    model: "/models/flashdisk.glb",
    description:
      "Media penyimpanan portabel untuk memindahkan data penting.",
    status: "Stored",
  },
];
```

Tujuannya supaya menambahkan equipment baru cukup menambahkan data.

---

## 14. 3D Technology

Recommended:

```text
Next.js
React
Tailwind CSS
React Three Fiber
Three.js
Drei
GSAP / Framer Motion
```

Model:

```text
GLB / GLTF
```

Environment:

```text
GLB
```

Jangan membuat seluruh environment melalui React.

Workflow:

```text
Blender
   ↓
Optimize
   ↓
Export GLB
   ↓
React Three Fiber
   ↓
Website
```

---

## 15. Performance

Karena project dibuat untuk developer pemula dan target perangkat tidak selalu high-end:

### WAJIB

- Compress GLB
- Gunakan texture resolution yang wajar
- Jangan terlalu banyak polygon
- Gunakan baked lighting jika memungkinkan
- Lazy-load model
- Jangan load semua object sekaligus
- Gunakan Draco/Meshopt bila memungkinkan
- Matikan object yang tidak terlihat

Target:

```text
Desktop:
60 FPS ideal
30+ FPS minimum

Mobile:
30+ FPS
```

---

## 16. Responsive

Desktop adalah platform utama.

### Desktop

Target:

```text
1920 × 1080
1440 × 900
1366 × 768
```

### Mobile

Mobile menggunakan versi experience yang lebih sederhana.

Alur:

```text
HOME
 ↓
ROOM IMAGE / 3D
 ↓
EQUIPMENT
 ↓
OBJECT DETAIL
```

Interaction:

```text
Touch
Drag
Pinch
Tap
```

---

## 17. Website Structure

```text
/
├── Home
│
├── Explore
│   ├── Hideout
│   ├── Room
│   └── Equipment
│
├── Archive
│   ├── Computer
│   ├── Handheld Hack
│   ├── Flashdisk
│   ├── Radio
│   └── Backpack
│
└── About
    ├── HeadHacker
    ├── Concept
    └── Development
```

---

## 18. Component Structure

```text
components/
│
├── 3d/
│   ├── Scene.jsx
│   ├── Camera.jsx
│   ├── Environment.jsx
│   ├── InteractiveObject.jsx
│   └── ObjectViewer.jsx
│
├── navigation/
│   └── Navbar.jsx
│
├── ui/
│   ├── Button.jsx
│   ├── ObjectHotspot.jsx
│   ├── ObjectCard.jsx
│   └── InfoPanel.jsx
│
└── sections/
    ├── Hero.jsx
    ├── Hideout.jsx
    ├── Equipment.jsx
    └── About.jsx
```

---

## 19. User Experience Principles

### 1. Simple

User langsung memahami:

```text
ENTER → EXPLORE → INSPECT
```

### 2. Tidak terlalu banyak UI

3D environment tetap menjadi fokus.

### 3. Jangan membuat user tersesat

Selalu ada:

```text
← BACK
```

dan:

```text
SKIP
```

### 4. Interaction harus jelas

Contoh:

```text
Drag to rotate
Scroll to zoom
Click to inspect
```

---

## 20. MVP

Untuk versi pertama jangan langsung membuat semuanya.

### Phase 1 — Core MVP

```text
✓ Landing
✓ Exterior house
✓ Enter button
✓ Camera animation
✓ One room
✓ Computer
✓ Handheld Hack
✓ Flashdisk
✓ Basic object interaction
```

### Phase 2 — Archive

```text
✓ Object detail
✓ Equipment archive
✓ Radio
✓ Backpack
✓ Better transitions
```

### Phase 3 — World Expansion

```text
✓ More rooms
✓ Server room
✓ Garage
✓ Lore
✓ Connections between objects
```

### Phase 4 — Polish

```text
✓ Mobile optimization
✓ Performance optimization
✓ Sound
✓ Advanced camera transitions
```

---

# MASTER PROMPT UNTUK AI CODING AGENT

Build a beginner-friendly interactive 3D website for a VR game called HEADHACKER.

## IMPORTANT

This must NOT look like an AAA game website.

Do not over-engineer the project.

Do not use excessive cyberpunk neon, holograms, particles, complex HUDs, or cinematic AAA effects.

The website should feel like a small interactive 3D game showcase / digital archive.

## CORE CONCEPT

The visitor starts outside a simple house/building.

The visitor clicks ENTER.

The camera smoothly moves toward the building, approaches the door, enters the building, and stops inside the main room.

After the cinematic entrance finishes, the room becomes interactive.

The visitor can hover and click objects inside the room.

Important objects include:

- Computer
- Laptop
- Handheld Hack Device
- Flash Drive
- Radio
- Backpack

When an object is selected, open a simple object detail view where the 3D model can be rotated and zoomed.

The website should communicate the world of HEADHACKER through its environment and equipment rather than through large amounts of text.

## VISUAL STYLE

- Dark but readable
- Realistic/simple 3D
- Slightly stylized
- Calm
- Atmospheric
- Minimal UI
- Modern typography
- Subtle borders
- Soft shadows
- Muted colors
- No excessive gradients
- No excessive glassmorphism
- No neon cyberpunk aesthetic
- No AAA-style cinematic interface

## COLOR PALETTE

```text
Background: #101416
Surface: #182024
Secondary Surface: #222B2F
Primary Text: #E7E8E3
Secondary Text: #9AA5A3
Accent: #91AAA5
Border: rgba(255,255,255,0.12)
```

## TECH STACK

Use:

- Next.js
- React
- JavaScript / JSX
- Tailwind CSS
- React Three Fiber
- Three.js
- Drei
- GSAP or Framer Motion when necessary

Do NOT use TypeScript unless absolutely necessary.

## 3D FILE FORMAT

Use GLB/GLTF.

Suggested structure:

```text
/public/models/
/public/textures/
```

Use lazy loading for 3D assets.

## MAIN ROUTES

```text
/
/explore
/archive
/archive/[id]
/about
```

## LANDING

Show a simple exterior house environment.

UI:

```text
HEADHACKER

A VR SURVEILLANCE EXPERIENCE

[ ENTER → ]
```

When ENTER is clicked:

1. Move camera toward the building.
2. Approach the door.
3. Open the door or transition through it.
4. Move camera into the room.
5. Stop at the main viewing position.
6. Enable interaction.

Provide a SKIP button during the cinematic.

## MAIN ROOM

Create one simple room containing:

- Desk
- Computer
- Chair
- Cabinet
- Bed
- Shelf
- Window
- Handheld Hack Device
- Flash Drive
- Radio
- Backpack

The room should not be overly detailed.

Focus on composition and readability.

## INTERACTION

Objects should have subtle hotspots.

On hover:

```text
COMPUTER
Equipment
```

On click:

Open object detail.

## OBJECT DETAIL

Display:

- Object name
- Category
- Description
- Status
- Location

And a 3D viewer.

Allow:

- Drag to rotate
- Scroll to zoom
- Reset rotation

## EQUIPMENT ARCHIVE

Create a simple grid/list containing:

- Computer
- Handheld Hack
- Flashdisk
- Radio
- Backpack

Each item should have:

- Thumbnail
- Name
- Category
- Short description

Clicking an item opens its 3D detail.

## DATA

Use a centralized JavaScript data file.

Example:

```js
const equipment = [
  {
    id: "computer",
    name: "Computer",
    category: "Equipment",
    model: "/models/computer.glb",
    description: "...",
    status: "Active"
  }
];
```

Do not hardcode equipment UI repeatedly.

## PERFORMANCE

Optimize for mid-range laptops.

Avoid loading every GLB at once.

Lazy load models.

Keep polygon counts reasonable.

Use compressed textures where possible.

Do not use expensive post-processing unless necessary.

## RESPONSIVE

Desktop is the primary experience.

Support:

```text
1920x1080
1440x900
1366x768
```

Mobile should provide a simplified version.

Mobile interaction should prioritize:

- Tap
- Drag
- Pinch

instead of complex camera navigation.

## UX PRINCIPLES

The user should always understand:

```text
ENTER
EXPLORE
INSPECT
BACK
```

Avoid unnecessary UI.

The 3D environment must remain the visual focus.

## BUILD ORDER

1. Set up Next.js project
2. Create base layout
3. Create landing page
4. Add exterior 3D environment
5. Add camera
6. Add ENTER transition
7. Create main room
8. Add interactive objects
9. Add object hover state
10. Add object detail viewer
11. Create equipment archive
12. Add responsive layout
13. Optimize performance
14. Polish animations

## IMPORTANT DEVELOPMENT RULE

Do not try to build the entire project in one giant component.

Keep components modular and understandable for a beginner developer.

Prioritize a working MVP over excessive visual complexity.

The final result should feel like:

> "Entering a small hideout and discovering the equipment used in the HEADHACKER world."

It should NOT feel like:

> "AAA cyberpunk game launcher."
