import { describe, it, expect } from "vitest";
import { rgba, LOCAL, fetchRogues, submitTransmission } from "../../src/lib/api";

describe("rgba()", () => {
  it("converts hex to rgba", () => {
    expect(rgba("#00e5ff", 0.6)).toBe("rgba(0,229,255,0.6)");
    expect(rgba("#ff2a3d", 0.18)).toBe("rgba(255,42,61,0.18)");
  });
});

describe("LOCAL content mapping", () => {
  it("has the expected counts", () => {
    expect(LOCAL.rogues).toHaveLength(13);
    expect(LOCAL.allies).toHaveLength(6);
    expect(LOCAL.suits).toHaveLength(3);
    expect(LOCAL.vehicles).toHaveLength(3);
    expect(LOCAL.gadgets).toHaveLength(6);
  });

  it("attaches an image to every visual record", () => {
    for (const key of ["rogues", "allies", "suits", "vehicles"]) {
      for (const r of LOCAL[key]) expect(r.image, `${key}/${r.id}`).toBeTruthy();
    }
  });

  it("derives accent variants for rogues", () => {
    const joker = LOCAL.rogues.find((r) => r.id === "joker");
    expect(joker.accent).toBe("#9dff00");
    expect(joker.accentRing).toBe("rgba(157,255,0,0.6)");
    expect(joker.accentSoft).toBe("rgba(157,255,0,0.18)");
  });
});

describe("offline fallbacks (no backend configured)", () => {
  it("fetchRogues returns local content", async () => {
    const rogues = await fetchRogues();
    expect(rogues).toHaveLength(13);
    expect(rogues[0]).toHaveProperty("codename");
  });

  it("submitTransmission resolves as simulated", async () => {
    const res = await submitTransmission({ codename: "x", channel: "y", message: "z" });
    expect(res).toEqual({ ok: true, simulated: true });
  });
});
