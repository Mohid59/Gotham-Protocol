// Field schemas that drive the generic admin CMS for every collection.
// Field types: id | text | textarea | number | color | select | tags | lines | pairs | stats | image
export const COLLECTIONS = [
  {
    key: "rogues", label: "ROGUES", table: "rogues", titleKey: "codename", accentKey: "accent", defaults: {},
    fields: [
      { k: "id", label: "ID (slug)", type: "id" },
      { k: "codename", label: "CODENAME", type: "text", required: true },
      { k: "realName", label: "REAL NAME", type: "text" },
      { k: "firstSeen", label: "FIRST SEEN", type: "text", placeholder: "BATMAN #1 — 1940" },
      { k: "threatLevel", label: "THREAT LEVEL", type: "select", options: ["OMEGA", "SIGMA", "DELTA"] },
      { k: "threatScore", label: "THREAT SCORE", type: "number" },
      { k: "accent", label: "ACCENT", type: "color" },
      { k: "objectPos", label: "IMAGE FRAMING", type: "text", placeholder: "center 25%" },
      { k: "tags", label: "TAGS (comma-separated)", type: "tags" },
      { k: "bio", label: "BIO", type: "textarea" },
      { k: "stats", label: "STATS", type: "stats" },
      { k: "image", label: "PORTRAIT (upload — optional)", type: "image" },
    ],
  },
  {
    key: "allies", label: "ALLIES", table: "allies", titleKey: "codename", accentKey: "color", defaults: {},
    fields: [
      { k: "id", label: "ID (slug)", type: "id" },
      { k: "codename", label: "CODENAME", type: "text", required: true },
      { k: "realName", label: "REAL NAME", type: "text" },
      { k: "role", label: "ROLE", type: "text" },
      { k: "mono", label: "MONOGRAM", type: "text", placeholder: "N" },
      { k: "status", label: "STATUS", type: "text", placeholder: "ACTIVE" },
      { k: "color", label: "ACCENT", type: "color" },
      { k: "bio", label: "BIO", type: "textarea" },
      { k: "objectPos", label: "IMAGE FRAMING", type: "text", placeholder: "center 25%" },
      { k: "image", label: "PORTRAIT (upload — optional)", type: "image" },
    ],
  },
  {
    key: "suits", label: "SUITS", table: "suits", titleKey: "name", accentKey: "color", defaults: { kind: "suit" },
    fields: [
      { k: "id", label: "ID (slug)", type: "id" },
      { k: "name", label: "NAME", type: "text", required: true },
      { k: "designation", label: "DESIGNATION", type: "text" },
      { k: "era", label: "ERA", type: "text" },
      { k: "color", label: "ACCENT", type: "color" },
      { k: "summary", label: "SUMMARY", type: "textarea" },
      { k: "composition", label: "COMPOSITION (LABEL: value per line)", type: "pairs" },
      { k: "loadout", label: "LOADOUT (one per line)", type: "lines" },
      { k: "objectPos", label: "IMAGE FRAMING", type: "text" },
      { k: "image", label: "IMAGE (upload — optional)", type: "image" },
    ],
  },
  {
    key: "vehicles", label: "VEHICLES", table: "vehicles", titleKey: "name", accentKey: "color", defaults: { kind: "vehicle" },
    fields: [
      { k: "id", label: "ID (slug)", type: "id" },
      { k: "name", label: "NAME", type: "text", required: true },
      { k: "designation", label: "DESIGNATION", type: "text" },
      { k: "era", label: "ERA", type: "text" },
      { k: "color", label: "ACCENT", type: "color" },
      { k: "art", label: "SILHOUETTE", type: "select", options: ["batmobile", "batwing", "batpod"] },
      { k: "summary", label: "SUMMARY", type: "textarea" },
      { k: "composition", label: "COMPOSITION (LABEL: value per line)", type: "pairs" },
      { k: "loadout", label: "CAPABILITIES (one per line)", type: "lines" },
      { k: "objectPos", label: "IMAGE FRAMING", type: "text" },
      { k: "image", label: "IMAGE (upload — optional)", type: "image" },
    ],
  },
  {
    key: "gadgets", label: "GADGETS", table: "gadgets", titleKey: "name", accentKey: "color", defaults: {},
    fields: [
      { k: "id", label: "ID (slug)", type: "id" },
      { k: "name", label: "NAME", type: "text", required: true },
      { k: "icon", label: "ICON", type: "select", options: ["batarang", "grapnel", "smoke", "gel", "sequencer", "launcher"] },
      { k: "color", label: "ACCENT", type: "color" },
      { k: "spec", label: "SPEC (short)", type: "text" },
      { k: "detail", label: "DETAIL", type: "textarea" },
    ],
  },
];

const DEFAULT_STATS = { intellect: 80, brutality: 80, evasion: 80, sanity: 80 };

// Build editable form state from an existing record (or a blank record).
export function formInit(schema, record) {
  const f = { imageUrl: record?.imageUrl };
  for (const fld of schema.fields) {
    const v = record?.[fld.k];
    switch (fld.type) {
      case "image": break;
      case "tags": f[fld.k] = (v || []).join(", "); break;
      case "lines": f[fld.k] = (v || []).join("\n"); break;
      case "pairs": f[fld.k] = (v || []).map((p) => `${p.label}: ${p.value}`).join("\n"); break;
      case "stats": f.stats = { ...DEFAULT_STATS, ...(v || {}) }; break;
      case "number": f[fld.k] = v ?? (fld.k === "threatScore" ? 80 : 0); break;
      case "color": f[fld.k] = v ?? "#00e5ff"; break;
      case "select": f[fld.k] = v ?? fld.options[0]; break;
      default: f[fld.k] = v ?? "";
    }
  }
  return f;
}

// Turn form state into the stored content blob.
export function buildContent(schema, form, uploadedUrl) {
  const c = { ...schema.defaults };
  for (const fld of schema.fields) {
    const v = form[fld.k];
    switch (fld.type) {
      case "image":
        if (uploadedUrl) c.imageUrl = uploadedUrl;
        else if (form.imageUrl) c.imageUrl = form.imageUrl;
        break;
      case "id":
        c.id = String(v || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
        break;
      case "number": c[fld.k] = Number(v); break;
      case "tags": c[fld.k] = String(v || "").split(",").map((s) => s.trim().toUpperCase()).filter(Boolean); break;
      case "lines": c[fld.k] = String(v || "").split("\n").map((s) => s.trim()).filter(Boolean); break;
      case "pairs":
        c[fld.k] = String(v || "").split("\n").map((line) => {
          const i = line.indexOf(":");
          return i < 0 ? null : { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() };
        }).filter(Boolean);
        break;
      case "stats":
        c.stats = {
          intellect: Number(form.stats.intellect), brutality: Number(form.stats.brutality),
          evasion: Number(form.stats.evasion), sanity: Number(form.stats.sanity),
        };
        break;
      default: c[fld.k] = typeof v === "string" ? v.trim() : v;
    }
  }
  return c;
}
