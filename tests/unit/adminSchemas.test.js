import { describe, it, expect } from "vitest";
import { COLLECTIONS, formInit, buildContent } from "../../src/lib/adminSchemas";

const byKey = (k) => COLLECTIONS.find((c) => c.key === k);

describe("COLLECTIONS", () => {
  it("covers all five content types", () => {
    expect(COLLECTIONS.map((c) => c.key)).toEqual(["rogues", "allies", "suits", "vehicles", "gadgets"]);
  });
});

describe("buildContent()", () => {
  it("builds a rogue: slugifies id, splits tags, coerces numbers/stats", () => {
    const schema = byKey("rogues");
    const form = formInit(schema, null);
    const out = buildContent(schema, {
      ...form,
      id: "Killer Moth!",
      codename: "KILLER MOTH",
      threatScore: "61",
      tags: "winged, gadgeteer , minor",
      stats: { intellect: "70", brutality: "55", evasion: "60", sanity: "80" },
    });
    expect(out.id).toBe("killer-moth-");
    expect(out.threatScore).toBe(61);
    expect(out.tags).toEqual(["WINGED", "GADGETEER", "MINOR"]);
    expect(out.stats).toEqual({ intellect: 70, brutality: 55, evasion: 60, sanity: 80 });
  });

  it("builds a suit: applies kind default, parses pairs + lines", () => {
    const schema = byKey("suits");
    const form = formInit(schema, null);
    const out = buildContent(schema, {
      ...form,
      id: "test-suit",
      name: "TEST SUIT",
      composition: "BODY: weave\nMASS: 8 kg",
      loadout: "grapple\ncape\n",
    });
    expect(out.kind).toBe("suit");
    expect(out.composition).toEqual([
      { label: "BODY", value: "weave" },
      { label: "MASS", value: "8 kg" },
    ]);
    expect(out.loadout).toEqual(["grapple", "cape"]);
  });

  it("carries an uploaded imageUrl", () => {
    const schema = byKey("allies");
    const out = buildContent(schema, formInit(schema, null), "https://cdn/x.webp");
    expect(out.imageUrl).toBe("https://cdn/x.webp");
  });
});

describe("formInit() round-trips an existing record", () => {
  it("joins tags and pairs back into editable text", () => {
    const schema = byKey("suits");
    const record = { id: "s1", name: "S1", kind: "suit", composition: [{ label: "MASS", value: "9 kg" }], loadout: ["a", "b"] };
    const f = formInit(schema, record);
    expect(f.composition).toBe("MASS: 9 kg");
    expect(f.loadout).toBe("a\nb");
  });
});
