import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Brand = {
  company_name: string;
  tagline: string;
  whatsapp: string;
  email: string;
  logo_url: string | null;
};

const DEFAULTS: Brand = {
  company_name: "AccuBridge Business Services (Pvt.) Ltd.",
  tagline: "We Build Brands That Dominate.",
  whatsapp: "+923350320720",
  email: "management@accubridge.tech",
  logo_url: null,
};

export function useBrand(): Brand {
  const [b, setB] = useState<Brand>(DEFAULTS);
  useEffect(() => {
    supabase.from("brand_settings").select("*").eq("id", 1).single().then(({ data }) => {
      if (data) setB(data as Brand);
    });
  }, []);
  return b;
}
