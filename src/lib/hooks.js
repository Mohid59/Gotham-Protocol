import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured } from "./supabase";
import { fetchRogues, fetchAllies, fetchSuits, fetchVehicles, fetchGadgets, LOCAL } from "./api";

const opts = { staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false };
// With no backend, seed local content as initialData → instant, no loading flash.
const initial = (key) => (isSupabaseConfigured ? undefined : LOCAL[key]);

export const useRogues = () => useQuery({ queryKey: ["rogues"], queryFn: fetchRogues, initialData: initial("rogues"), ...opts });
export const useAllies = () => useQuery({ queryKey: ["allies"], queryFn: fetchAllies, initialData: initial("allies"), ...opts });
export const useSuits = () => useQuery({ queryKey: ["suits"], queryFn: fetchSuits, initialData: initial("suits"), ...opts });
export const useVehicles = () => useQuery({ queryKey: ["vehicles"], queryFn: fetchVehicles, initialData: initial("vehicles"), ...opts });
export const useGadgets = () => useQuery({ queryKey: ["gadgets"], queryFn: fetchGadgets, initialData: initial("gadgets"), ...opts });
