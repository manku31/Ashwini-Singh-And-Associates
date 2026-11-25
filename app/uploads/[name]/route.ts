import { readFile } from "node:fs/promises";
import { MIME, NAME_RE, uploadPath } from "@/lib/uploads";

export async function GET(_: Request, ctx: RouteContext<"/uploads/[name]">) {
  const { name } = await ctx.params;
  if (!NAME_RE.test(name)) return new Response("Not found", { status: 404 });
  try {
    const body = await readFile(uploadPath(name));
    return new Response(body, {
      headers: {
        "Content-Type": MIME[name.split(".").pop()!],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
