// Armory — vehicles content (fallback + DB seed source). Images by id in api.js.
export const VEHICLES = [
  {
    id: "batmobile",
    kind: "vehicle",
    name: "THE BATMOBILE",
    designation: "GROUND // PURSUIT CHASSIS",
    era: "Primary Asset",
    color: "#00e5ff",
    art: "batmobile",
    summary:
      "Armor-plated pursuit vehicle with a jet-assisted afterburner, run-flat tires, and a fully sealed cockpit. The cornerstone of the Batcave motor pool — equal parts tank and supercar.",
    composition: [
      { label: "DRIVE", value: "Twin-turbine hybrid" },
      { label: "ARMOR", value: "Composite ablative plate" },
      { label: "TOP SPEED", value: "330 km/h (boost)" },
      { label: "0-100", value: "2.4 s" },
    ],
    loadout: [
      "Afterburner // 1.2s jet boost",
      "Front-mounted grapple winch",
      "Caltrop & smoke dispensers",
      "Intimidation mode / cockpit eject",
    ],
    objectPos: "center 45%",
  },
  {
    id: "batwing",
    kind: "vehicle",
    name: "THE BATWING",
    designation: "AIR // STRIKE AIRCRAFT",
    era: "Air Superiority",
    color: "#9dff00",
    art: "batwing",
    summary:
      "A bat-winged VTOL strike aircraft for rapid city-wide deployment and aerial extraction. Radar-absorbent skin and vectored thrust make it a silent shadow over Gotham.",
    composition: [
      { label: "PROPULSION", value: "Vectored twin-thrust VTOL" },
      { label: "SKIN", value: "Radar-absorbent matte" },
      { label: "CEILING", value: "15,200 m" },
      { label: "TOP SPEED", value: "Mach 1.1" },
    ],
    loadout: [
      "VTOL hover & silent-glide mode",
      "Magnetic grapple recovery line",
      "Countermeasure flare bank",
      "Drop-deploy Batmobile cradle",
    ],
    objectPos: "center 40%",
  },
  {
    id: "batpod",
    kind: "vehicle",
    name: "THE BATPOD",
    designation: "GROUND // RAPID CYCLE",
    era: "Urban Pursuit",
    color: "#ff2a3d",
    art: "batpod",
    summary:
      "A low-slung pursuit cycle ejected from the Batmobile when the chassis is compromised. Shoulder-steered with cannon-wide tires that climb walls and thread alleys at speed.",
    composition: [
      { label: "DRIVE", value: "Hub-less electric tires" },
      { label: "STEERING", value: "Shoulder / shift-prone" },
      { label: "TOP SPEED", value: "180 km/h" },
      { label: "MASS", value: "240 kg" },
    ],
    loadout: [
      "Grapple cannon + cable launcher",
      "Twin auto-cannons (non-lethal)",
      "180-degree pivot turn",
      "Wall-climb tire articulation",
    ],
    objectPos: "center 55%",
  },
];
