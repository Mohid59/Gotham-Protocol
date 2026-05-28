// Data access layer. Each fetcher reads from Supabase when configured, and
// falls back to bundled local content otherwise. Records are stored as a JSON
// `data` blob keyed by id so the DB shape exactly matches the local shape —
// images are attached by id here (kept as optimized local assets).
import { supabase, isSupabaseConfigured } from "./supabase";
import { rogueImages, allyImages, suitImages, vehicleImages } from "./images";
import { ROGUES } from "../data/rogues";
import { ALLIES } from "../data/allies";
import { SUITS } from "../data/suits";
import { VEHICLES } from "../data/vehicles";
import { GADGETS } from "../data/gadgets";

function rgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const mapRogue = (r) => ({ ...r, image: rogueImages[r.id], accentSoft: rgba(r.accent, 0.18), accentRing: rgba(r.accent, 0.6) });
const mapAlly = (a) => ({ ...a, image: allyImages[a.id] });
const mapSuit = (s) => ({ ...s, image: suitImages[s.id] });
const mapVehicle = (v) => ({ ...v, image: vehicleImages[v.id] });
const mapGadget = (g) => g;

async function fetchTable(table, local, mapper) {
  if (!isSupabaseConfigured) return local.map(mapper);
  const { data, error } = await supabase.from(table).select("data, sort").order("sort", { ascending: true });
  if (error) throw new Error(`${table}: ${error.message}`);
  if (!data?.length) return local.map(mapper); // empty table -> use seed content
  return data.map((row) => mapper(row.data));
}

export const fetchRogues = () => fetchTable("rogues", ROGUES, mapRogue);
export const fetchAllies = () => fetchTable("allies", ALLIES, mapAlly);
export const fetchSuits = () => fetchTable("suits", SUITS, mapSuit);
export const fetchVehicles = () => fetchTable("vehicles", VEHICLES, mapVehicle);
export const fetchGadgets = () => fetchTable("gadgets", GADGETS, mapGadget);

// Pre-mapped local content — used as TanStack Query initialData when there is
// no backend, so the UI renders instantly with no loading flash.
export const LOCAL = {
  rogues: ROGUES.map(mapRogue),
  allies: ALLIES.map(mapAlly),
  suits: SUITS.map(mapSuit),
  vehicles: VEHICLES.map(mapVehicle),
  gadgets: GADGETS.map(mapGadget),
};

export async function submitTransmission({ codename, channel, message }) {
  if (!isSupabaseConfigured) {
    await new Promise((r) => setTimeout(r, 700)); // simulate latency
    return { ok: true, simulated: true };
  }
  const { error } = await supabase.from("transmissions").insert({ codename, channel, message });
  if (error) throw new Error(error.message);
  return { ok: true };
}
