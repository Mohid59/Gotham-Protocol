// Seeds Supabase content tables from the local data files.
// Usage:  npm run seed         (reads .env via --env-file)
// Requires: VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env
import { createClient } from "@supabase/supabase-js";
import { ROGUES } from "../src/data/rogues.js";
import { ALLIES } from "../src/data/allies.js";
import { SUITS } from "../src/data/suits.js";
import { VEHICLES } from "../src/data/vehicles.js";
import { GADGETS } from "../src/data/gadgets.js";

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing env. Put VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env, then run:\n  npm run seed"
  );
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function seed(table, rows) {
  const payload = rows.map((data, i) => ({ id: data.id, sort: i, data }));
  const { error } = await supabase.from(table).upsert(payload, { onConflict: "id" });
  if (error) {
    console.error(`✗ ${table}: ${error.message}`);
    process.exit(1);
  }
  console.log(`✓ seeded ${table.padEnd(9)} (${rows.length})`);
}

await seed("rogues", ROGUES);
await seed("allies", ALLIES);
await seed("suits", SUITS);
await seed("vehicles", VEHICLES);
await seed("gadgets", GADGETS);
console.log("\nDone. Content is live — refresh the site.");
