import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/session";
import { MAX_UPLOAD_BYTES, saveUpload, sniffExt } from "@/lib/uploads";

export async function POST(request: Request) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const file = (await request.formData()).get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file received." }, { status: 400 });
  if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: "Image must be 5 MB or smaller." }, { status: 413 });

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = sniffExt(buf);
  if (!ext) return NextResponse.json({ error: "Use a JPG, PNG, WebP or GIF image." }, { status: 415 });

  return NextResponse.json({ url: await saveUpload(buf, ext) });
}
