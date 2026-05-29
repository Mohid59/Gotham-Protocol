import { test, expect } from "@playwright/test";

// Wait out the one-time boot overlay, then settle.
async function ready(page, path = "/") {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4500);
}

test("home renders hero, nav and live rogue count", async ({ page }) => {
  await ready(page, "/");
  await expect(page.getByRole("heading", { name: /DARK KNIGHT/i })).toBeVisible();
  for (const label of ["HOME", "DOSSIER", "ROGUES", "ALLIES", "ARMORY", "CONTACT"]) {
    await expect(page.getByRole("link", { name: label }).first()).toBeVisible();
  }
  await expect(page.getByText("ROGUES INDEXED")).toBeVisible();
  await expect(page.getByText("13", { exact: true }).first()).toBeVisible();
});

test("nav link routes to the rogues gallery", async ({ page }) => {
  await ready(page, "/");
  await page.getByRole("link", { name: "ROGUES" }).first().click();
  await expect(page).toHaveURL(/\/rogues$/);
});

test("rogues gallery shows all 13 villains and the selector advances", async ({ page }) => {
  await ready(page, "/rogues");
  await expect(page.locator(".rogue-chip")).toHaveCount(13, { timeout: 20000 });
  await expect(page.getByText("01 / 13")).toBeVisible();
  await page.getByRole("button", { name: "Next target" }).click();
  await expect(page.getByText("02 / 13")).toBeVisible();
});

test("allies and armory render their content", async ({ page }) => {
  await ready(page, "/allies");
  await expect(page.locator(".ally-card")).toHaveCount(6, { timeout: 20000 });
  await ready(page, "/armory");
  await expect(page.locator("[data-tile]")).toHaveCount(12, { timeout: 20000 });
});

test("contact page renders the transmission form", async ({ page }) => {
  await ready(page, "/contact");
  await expect(page.locator("#codename")).toBeVisible();
  await expect(page.locator("#freq")).toBeVisible();
  await expect(page.locator("#msg")).toBeVisible();
  await expect(page.getByRole("button", { name: /DEPLOY BEACON/i })).toBeVisible();
});
