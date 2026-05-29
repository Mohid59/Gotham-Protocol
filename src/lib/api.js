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

// Uploaded imageUrl (admin) wins over the bundled local asset, for every type.
const mapRogue = (r) => ({ ...r, image: r.imageUrl || rogueImages[r.id], accentSoft: rgba(r.accent, 0.18), accentRing: rgba(r.accent, 0.6) });
const mapAlly = (a) => ({ ...a, image: a.imageUrl || allyImages[a.id] });
const mapSuit = (s) => ({ ...s, image: s.imageUrl || suitImages[s.id] });
const mapVehicle = (v) => ({ ...v, image: v.imageUrl || vehicleImages[v.id] });
const mapGadget = (g) => g;

export { rgba };

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

// collection key -> fetcher, for the generic useCollection hook + admin CMS.
export const FETCHERS = {
  rogues: fetchRogues,
  allies: fetchAllies,
  suits: fetchSuits,
  vehicles: fetchVehicles,
  gadgets: fetchGadgets,
};

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

/* ---------- Admin (authenticated) ---------- */

export async function fetchTransmissions() {
  const { data, error } = await supabase
    .from("transmissions")
    .select("id, codename, channel, message, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

// Store a record's raw content blob (strip derived/runtime fields first).
export async function saveRecord(table, record, sort) {
  const { image, accentSoft, accentRing, ...content } = record; // eslint-disable-line no-unused-vars
  const { error } = await supabase.from(table).upsert({ id: content.id, sort, data: content });
  if (error) throw new Error(error.message);
}

export async function deleteRecord(table, id) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function uploadAsset(file, path) {
  const { error } = await supabase.storage.from("assets").upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw new Error(error.message);
  return supabase.storage.from("assets").getPublicUrl(path).data.publicUrl;
}
