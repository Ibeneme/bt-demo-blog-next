// // lib/supabase/server.ts
// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers"; // Ensure this is imported

// export function createClient() {
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         async getAll() {
//           return (await cookies()).getAll();
//         },
//         async setAll(cookiesToSet) {
//           try {
//             (await cookies()).setAll(cookiesToSet);
//           } catch {
//             // Ignore
//           }
//         },
//       },
//     }
//   );
// }