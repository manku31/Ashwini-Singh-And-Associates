import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/posts";

export const ogSize = { width: 1200, height: 630 };

export async function renderBlogCard(slug: string) {
  const post = (await getAllPosts()).find((p) => p.slug === slug);
  const title = post?.title ?? "Blog";
  const category = (post?.category ?? "Article").toUpperCase();
  const meta = post ? post.author : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0f172a",
        color: "#fff",
        padding: 72,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -120,
          bottom: -160,
          width: 520,
          height: 520,
          borderRadius: 999,
          background: "#b4975a",
          opacity: 0.18,
          display: "flex",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            color: "#d9c08a",
            fontSize: 28,
            letterSpacing: 6,
            fontWeight: 700,
          }}
        >
          {category}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 54 : 64,
            lineHeight: 1.15,
            fontWeight: 700,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#d9c08a",
              fontWeight: 700,
            }}
          >
            Ashwini Singh and Associates
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Chartered Accountants
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {meta}
        </div>
      </div>
    </div>,
    ogSize,
  );
}
