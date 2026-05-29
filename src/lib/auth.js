import { useEffect, useState } from "react";
import { supabase } from "./supabase";

// Tracks the current Supabase auth session.
export function useAuth() {
  const [session, setSession] = useState(null);
  // No backend → nothing to load. Otherwise start in loading until getSession resolves.
  const [loading, setLoading] = useState(() => Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, loading };
}

export async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
}

export const signOut = () => supabase?.auth.signOut();
