import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zaqrafnolcyufxbofkrq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Direct Supabase submission fallback if backend is offline and anon key is set
 */
export async function insertSupabaseInquiry(inquiry: {
  userName: string;
  userEmail: string;
  userPhone?: string;
  message: string;
  listingType?: string;
  listingId?: number;
}) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase anon key not configured in .env.local") };
  }

  try {
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          user_name: inquiry.userName,
          user_email: inquiry.userEmail,
          user_phone: inquiry.userPhone,
          message: inquiry.message,
          listing_type: inquiry.listingType,
          listing_id: inquiry.listingId,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    return { data, error };
  } catch (err: any) {
    return { data: null, error: err };
  }
}
