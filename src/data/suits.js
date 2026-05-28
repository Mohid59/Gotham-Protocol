// Armory — the three most iconic Batsuits.
import classicImg from "../assets/suit-classic.webp";
import darkKnightImg from "../assets/suit-dark-knight.webp";
import theBatmanImg from "../assets/suit-the-batman.webp";

export const SUITS = [
  {
    id: "classic",
    kind: "suit",
    name: "THE CLASSIC",
    designation: "MK-I // DETECTIVE GREY",
    era: "Bronze Age — Comics",
    color: "#00e5ff",
    summary:
      "The definitive cowl. Grey body weave, midnight cape and trunks, gold utility belt, and the yellow-oval chest emblem. Built for mobility and detective work over heavy armor.",
    composition: [
      { label: "BODY", value: "Grey tri-weave knit" },
      { label: "CAPE", value: "Scalloped wool / nylon blend" },
      { label: "MASS", value: "7.8 kg loaded" },
      { label: "MOBILITY INDEX", value: "0.88" },
    ],
    loadout: [
      "Yellow-oval emblem // dart decoy",
      "Segmented utility belt (10 caches)",
      "Fluted gauntlets",
      "Reinforced cowl lenses",
    ],
    image: classicImg,
    objectPos: "center 18%",
  },
  {
    id: "dark-knight",
    kind: "suit",
    name: "THE DARK KNIGHT",
    designation: "MK-VI // NOMEX TACTICAL",
    era: "2008 — Nolan Cycle",
    color: "#ff2a3d",
    summary:
      "Modular Nomex survival suit fused with hardened ceramic plating. Engineered for full articulation, knife defense, and point-blank 9mm survival. The most combat-capable build in the vault.",
    composition: [
      { label: "UNDERSUIT", value: "Triple-weave Nomex polymer" },
      { label: "PLATING", value: "Boron-carbide ceramic segments" },
      { label: "MASS", value: "9.1 kg loaded" },
      { label: "MOBILITY INDEX", value: "0.81" },
    ],
    loadout: [
      "Memory-cloth cape // electrified glide deploy",
      "Sonar contact lenses",
      "Magnetized scallop blades",
      "Reinforced graphite cowl",
    ],
    image: darkKnightImg,
    objectPos: "center 35%",
  },
  {
    id: "the-batman",
    kind: "suit",
    name: "THE BATMAN",
    designation: "MK-XI // FORGED ARMOR",
    era: "2022 — Reeves Cycle",
    color: "#ff8c1a",
    summary:
      "A hand-forged, function-first warsuit. Repurposed body armor, an oversized emblem milled from the same gun that killed his parents, and a glide-capable cape. Brutal, grounded, relentless.",
    composition: [
      { label: "PLATING", value: "Welded steel + ballistic nylon" },
      { label: "EMBLEM", value: "Milled firearm steel" },
      { label: "MASS", value: "12.6 kg loaded" },
      { label: "MOBILITY INDEX", value: "0.74" },
    ],
    loadout: [
      "Wing-suit cape // rooftop glide",
      "Chest-mounted contact camera",
      "Improvised knuckle plating",
      "Adrenaline compound injector",
    ],
    image: theBatmanImg,
    objectPos: "center 20%",
  },
];
