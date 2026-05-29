import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PageShell from "../components/PageShell";
import { HudLoader } from "../components/DataState";
import { isSupabaseConfigured } from "../lib/supabase";
import { useAuth, signIn, signOut } from "../lib/auth";
import { useRogues } from "../lib/hooks";
import { fetchTransmissions, saveRogue, deleteRogue, uploadAsset } from "../lib/api";

export default function Admin() {
  const { session, loading } = useAuth();

  if (!isSupabaseConfigured) {
    return (
      <PageShell kicker="RESTRICTED // OPERATOR ACCESS" title={<>COMMAND <span className="text-bat-neon">DECK</span></>}>
        <Notice tone="crimson">Backend not configured. Add your Supabase keys to <code className="text-bat-neon">.env</code> and restart to enable the command deck.</Notice>
      </PageShell>
    );
  }

  return (
    <PageShell kicker="RESTRICTED // OPERATOR ACCESS" title={<>COMMAND <span className="text-bat-neon">DECK</span></>} wide={!!session}>
      {loading ? <HudLoader label="VERIFYING CLEARANCE" /> : session ? <Dashboard email={session.user.email} /> : <Login />}
    </PageShell>
  );
}

/* ---------------- Login ---------------- */

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("auth");
    setErr("");
    try {
      await signIn(email.trim(), password);
    } catch (e2) {
      setErr(e2.message || "Authentication failed");
      setStatus("idle");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={submit} className="bracket-frame border border-bat-neon/30 bg-black/50 p-7 text-bat-neon backdrop-blur-sm">
        <div className="mb-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-white/45">
          <span className="h-1.5 w-1.5 animate-pulse bg-bat-neon" /> SECURE LOGIN
        </div>
        <label className="mb-2 block font-mono text-[10px] tracking-[0.3em] text-white/45">OPERATOR ID</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@wayne.enterprises" className="hud-input mb-4" />
        <label className="mb-2 block font-mono text-[10px] tracking-[0.3em] text-white/45">PASSPHRASE</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="hud-input mb-5" />
        <button type="submit" disabled={status === "auth"} className="inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-bat-neon/60 bg-bat-neon/5 px-6 py-3 font-mono text-[11px] tracking-[0.35em] text-bat-neon transition-all duration-200 hover:bg-bat-neon/15 hover:shadow-neon-blue disabled:cursor-wait disabled:opacity-60">
          {status === "auth" ? "AUTHENTICATING…" : "AUTHENTICATE →"}
        </button>
        {err && <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-bat-crimson">● {err}</p>}
      </form>
    </div>
  );
}

/* ---------------- Dashboard ---------------- */

function Dashboard({ email }) {
  const [tab, setTab] = useState("rogues");
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {["rogues", "inbox"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`cursor-pointer border px-4 py-2 font-mono text-[10px] tracking-[0.3em] transition-colors duration-200 ${tab === t ? "border-bat-neon/60 bg-bat-neon/10 text-bat-neon" : "border-white/15 text-white/55 hover:text-white"}`}>
              {t === "rogues" ? "ROGUES CMS" : "TRANSMISSIONS"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.25em] text-white/45">
          <span className="hidden sm:inline">{email}</span>
          <button onClick={() => signOut()} className="cursor-pointer border border-white/15 px-3 py-2 text-white/60 transition-colors duration-200 hover:border-bat-crimson/60 hover:text-bat-crimson">SIGN OUT</button>
        </div>
      </div>
      {tab === "rogues" ? <RoguesCMS /> : <Inbox />}
    </div>
  );
}

/* ---------------- Transmissions inbox ---------------- */

function Inbox() {
  const { data, isLoading, isError, error } = useQuery({ queryKey: ["transmissions"], queryFn: fetchTransmissions });
  if (isLoading) return <HudLoader label="OPENING INBOX" />;
  if (isError) return <Notice tone="crimson">Could not load transmissions: {error.message}</Notice>;
  if (!data.length) return <Notice>No transmissions received yet.</Notice>;
  return (
    <div className="space-y-3">
      {data.map((t) => (
        <div key={t.id} className="border border-white/10 bg-gotham-ink/60 p-4">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em]">
            <span className="text-bat-neon">{t.codename}</span>
            <span className="text-white/35">{new Date(t.created_at).toLocaleString()}</span>
          </div>
          <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-white/40">{t.channel}</div>
          <p className="mt-3 font-mono text-[12px] leading-relaxed text-white/75">{t.message}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Rogues CMS ---------------- */

const BLANK = { id: "", codename: "", realName: "", firstSeen: "", threatLevel: "SIGMA", threatScore: 80, accent: "#00e5ff", objectPos: "center 25%", tags: "", bio: "", stats: { intellect: 80, brutality: 80, evasion: 80, sanity: 80 } };

function RoguesCMS() {
  const { data: rogues = [] } = useRogues();
  const [editing, setEditing] = useState(null); // null | 'new' | rogue
  const qc = useQueryClient();

  const refresh = () => qc.invalidateQueries({ queryKey: ["rogues"] });

  const remove = async (r) => {
    if (!window.confirm(`Delete ${r.codename}? This cannot be undone.`)) return;
    await deleteRogue(r.id);
    refresh();
  };

  if (editing) {
    return <RogueEditor initial={editing === "new" ? null : editing} count={rogues.length} onDone={() => { setEditing(null); refresh(); }} onCancel={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/45">{rogues.length} RECORDS</span>
        <button onClick={() => setEditing("new")} className="cursor-pointer border border-bat-toxic/50 bg-bat-toxic/5 px-4 py-2 font-mono text-[10px] tracking-[0.3em] text-bat-toxic transition-colors duration-200 hover:bg-bat-toxic/15">+ NEW ROGUE</button>
      </div>
      <div className="divide-y divide-white/8 border border-white/10">
        {rogues.map((r) => (
          <div key={r.id} className="flex items-center gap-4 p-3">
            <img src={r.image} alt="" className="h-12 w-12 flex-shrink-0 object-cover" style={{ objectPosition: r.objectPos }} />
            <div className="min-w-0 flex-1">
              <div className="truncate font-display text-[14px] font-bold" style={{ color: r.accent }}>{r.codename}</div>
              <div className="truncate font-mono text-[9px] tracking-[0.2em] text-white/40">{r.realName} // {r.threatLevel} // {r.threatScore}</div>
            </div>
            <button onClick={() => setEditing(r)} className="cursor-pointer border border-white/15 px-3 py-1.5 font-mono text-[9px] tracking-[0.25em] text-white/60 transition-colors hover:border-bat-neon/60 hover:text-bat-neon">EDIT</button>
            <button onClick={() => remove(r)} className="cursor-pointer border border-white/15 px-3 py-1.5 font-mono text-[9px] tracking-[0.25em] text-white/60 transition-colors hover:border-bat-crimson/60 hover:text-bat-crimson">DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RogueEditor({ initial, count, onDone, onCancel }) {
  const [f, setF] = useState(() =>
    initial
      ? { ...BLANK, ...initial, tags: (initial.tags || []).join(", "), stats: { ...BLANK.stats, ...initial.stats } }
      : BLANK
  );
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const setStat = (k, v) => setF((p) => ({ ...p, stats: { ...p.stats, [k]: Number(v) } }));

  const save = async (e) => {
    e.preventDefault();
    setStatus("saving");
    setErr("");
    try {
      const id = f.id.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
      let imageUrl = f.imageUrl;
      if (file) imageUrl = await uploadAsset(file, `rogues/${id}-${Date.now()}.${file.name.split(".").pop()}`);
      const content = {
        id,
        codename: f.codename.trim(),
        realName: f.realName.trim(),
        firstSeen: f.firstSeen.trim(),
        threatLevel: f.threatLevel,
        threatScore: Number(f.threatScore),
        accent: f.accent,
        objectPos: f.objectPos.trim() || "center 25%",
        tags: f.tags.split(",").map((t) => t.trim().toUpperCase()).filter(Boolean),
        bio: f.bio.trim(),
        stats: f.stats,
        ...(imageUrl ? { imageUrl } : {}),
      };
      const sort = initial?.sort ?? count;
      await saveRogue(content, sort);
      onDone();
    } catch (e2) {
      setErr(e2.message || "Save failed");
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={save} className="border border-white/10 bg-gotham-ink/50 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-[18px] font-bold text-white">{initial ? `EDIT // ${initial.codename}` : "NEW ROGUE"}</h3>
        <button type="button" onClick={onCancel} className="cursor-pointer font-mono text-[10px] tracking-[0.3em] text-white/50 hover:text-white">✕ CANCEL</button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <L label="ID (slug)"><input className="hud-input" required disabled={!!initial} value={f.id} onChange={(e) => set("id", e.target.value)} placeholder="killer-moth" /></L>
        <L label="CODENAME"><input className="hud-input" required value={f.codename} onChange={(e) => set("codename", e.target.value)} /></L>
        <L label="REAL NAME"><input className="hud-input" value={f.realName} onChange={(e) => set("realName", e.target.value)} /></L>
        <L label="FIRST SEEN"><input className="hud-input" value={f.firstSeen} onChange={(e) => set("firstSeen", e.target.value)} placeholder="BATMAN #1 — 1940" /></L>
        <L label="THREAT LEVEL">
          <select className="hud-input" value={f.threatLevel} onChange={(e) => set("threatLevel", e.target.value)}>
            <option>OMEGA</option><option>SIGMA</option><option>DELTA</option>
          </select>
        </L>
        <L label="THREAT SCORE"><input className="hud-input" type="number" min="0" max="100" value={f.threatScore} onChange={(e) => set("threatScore", e.target.value)} /></L>
        <L label="ACCENT"><input className="h-10 w-full cursor-pointer bg-transparent" type="color" value={f.accent} onChange={(e) => set("accent", e.target.value)} /></L>
        <L label="IMAGE FRAMING"><input className="hud-input" value={f.objectPos} onChange={(e) => set("objectPos", e.target.value)} placeholder="center 25%" /></L>
      </div>

      <L label="TAGS (comma-separated)"><input className="hud-input mt-4" value={f.tags} onChange={(e) => set("tags", e.target.value)} placeholder="ANARCHIST, CHEMICAL" /></L>
      <L label="BIO"><textarea className="hud-input mt-4 resize-none" rows={4} value={f.bio} onChange={(e) => set("bio", e.target.value)} /></L>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {["intellect", "brutality", "evasion", "sanity"].map((s) => (
          <L key={s} label={s.toUpperCase()}><input className="hud-input" type="number" min="0" max="100" value={f.stats[s]} onChange={(e) => setStat(s, e.target.value)} /></L>
        ))}
      </div>

      <L label="PORTRAIT (upload — optional)"><input className="mt-4 block w-full font-mono text-[10px] text-white/60 file:mr-3 file:cursor-pointer file:border file:border-bat-neon/40 file:bg-bat-neon/10 file:px-3 file:py-2 file:font-mono file:text-[10px] file:text-bat-neon" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} /></L>

      <div className="mt-6 flex items-center gap-3">
        <button type="submit" disabled={status === "saving"} className="cursor-pointer border border-bat-neon/60 bg-bat-neon/5 px-6 py-3 font-mono text-[11px] tracking-[0.3em] text-bat-neon transition-all duration-200 hover:bg-bat-neon/15 disabled:cursor-wait disabled:opacity-60">
          {status === "saving" ? "SAVING…" : "SAVE RECORD"}
        </button>
        <button type="button" onClick={onCancel} className="cursor-pointer border border-white/15 px-6 py-3 font-mono text-[11px] tracking-[0.3em] text-white/60 transition-colors hover:bg-white/5">CANCEL</button>
      </div>
      {err && <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-bat-crimson">● {err}</p>}
    </form>
  );
}

/* ---------------- bits ---------------- */

function L({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] tracking-[0.3em] text-white/45">{label}</span>
      {children}
    </label>
  );
}

function Notice({ children, tone }) {
  return (
    <div className={`border p-5 font-mono text-[12px] leading-relaxed tracking-[0.05em] ${tone === "crimson" ? "border-bat-crimson/40 text-bat-crimson/90" : "border-white/15 text-white/55"}`}>
      {children}
    </div>
  );
}
