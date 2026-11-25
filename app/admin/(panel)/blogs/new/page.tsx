import { adminUploads } from "@/lib/admin-data";
import { COVER_IMAGES } from "@/lib/blog-content";
import { PostForm } from "./post-form";

export default async function NewPostPage() {
  const library = await adminUploads();
  return (
    <>
      <h1 className="mb-1 text-[28px] font-bold">New blog post</h1>
      <p className="mb-6 text-sm text-slate-body">Fill the form on the right — the preview on the left updates as you type.</p>
      <PostForm library={library} existing={COVER_IMAGES} />
    </>
  );
}
