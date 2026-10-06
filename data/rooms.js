/**
 * Rooms — all areas of the HEADHACKER hideout.
 * status: "ACTIVE" | "CLASSIFIED" | "LOCKED" | "RESTRICTED"
 * Replaces generic "Soon" label with world-building status words.
 */
export const rooms = [
  { id: "main",     name: "Main Room",  active: true,  status: "ACTIVE" },
  { id: "bedroom",  name: "Bedroom",    active: false, status: "CLASSIFIED" },
  { id: "bathroom", name: "Bathroom",   active: false, status: "RESTRICTED" },
  { id: "kitchen",  name: "Kitchen",    active: false, status: "LOCKED" },
];
