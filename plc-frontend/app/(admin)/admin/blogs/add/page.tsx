"use client";

import { useState, useRef, forwardRef } from "react";
import Link from "next/link";
import InputEditorForm from "@/app/components/ui/InputEditorForm";
import FormInput from "@/app/(admin)/admin/components/FormInput";
import { usePost } from "@/app/components/hooks/usePost";
import ButtonLoader from "@/app/components/main-ui/ButtonLoader";
import { useGet } from "@/app/components/hooks/useGet";
import CheckBoxList from "../../components/CheckBoxList";
import FeaturedImageUploader from "../../components/FeaturedImageUploader";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Category {
  blog_cat_id: number;
  blog_cat_name: string;
  blog_cat_slug: string;
}

interface BlogTag {
  blog_tag_name: string;
  blog_tag_slug: string;
  blog_tag_id: string;
}



interface BlogForm {
  blog_cat_id: string;
  blog_title: string;
  blog_slug: string;
  blog_excerpt: string;
  blog_content: string;
  blog_img_url?: string;
  blog_meta_title?: string;
  blog_meta_keywords?: string;
  blog_meta_desc?: string;
  status: "published" | "draft";
}

interface FormErrors {
  blog_cat_id?: string;
  blog_title?: string;
  blog_slug?: string;
  blog_excerpt?: string;
  blog_content?: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const EMPTY_FORM: BlogForm = {
  blog_cat_id: "",
  blog_title: "",
  blog_slug: "",
  blog_excerpt: "",
  blog_content: "",
  blog_img_url: "",
  blog_meta_title: "",
  blog_meta_keywords: "",
  blog_meta_desc: "",
  status: "published",
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: BlogForm): FormErrors {
  const e: FormErrors = {};
  if (!form.blog_cat_id) e.blog_cat_id = "Select a category.";
  if (!form.blog_title.trim()) e.blog_title = "Post title is required.";
  if (!form.blog_slug.trim()) e.blog_slug = "Permalink is required.";
  else if (!/^[a-z0-9-]+$/.test(form.blog_slug))
    e.blog_slug = "Only lowercase letters, numbers and hyphens.";
  if (!form.blog_excerpt.trim()) e.blog_excerpt = "Excerpt is required.";
  if (!form.blog_content.trim()) e.blog_content = "Full content is required.";
  return e;
}


function Err({ msg }: { msg?: string }) {
  return msg ? <p className="ap-err">⚠ {msg}</p> : null;
}

const Card = forwardRef<HTMLDivElement, { title?: string; children: React.ReactNode }>(
  ({ title, children }, ref) => (
    <div className="ap-card">
      {title && <div className="ap-card-head">{title}</div>}
      <div className="ap-card-body" ref={ref}>{children}</div>
    </div>
  )
);
Card.displayName = "Card";


export default function AddBlog() {
  const [form, setForm] = useState<BlogForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const refs = {
    blog_title: useRef<HTMLDivElement>(null),
    blog_slug: useRef<HTMLDivElement>(null),
    blog_excerpt: useRef<HTMLDivElement>(null),
    blog_content: useRef<HTMLDivElement>(null),
    blog_cat_id: useRef<HTMLDivElement>(null),
  };

  const set = <K extends keyof BlogForm>(key: K, val: BlogForm[K]) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  const handleTitle = (v: string) => {
    set("blog_title", v);
    set("blog_slug", v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  const { loading, error, success, post, reset } = usePost<any, { id: string }>({
    url: "/blogs",
    onSuccess: () => {
      setForm(EMPTY_FORM);
      setErrors({});
      setSelectedTags([]);
      setFeaturedImage(null);
    },
    onErrors: (errs) => setErrors(errs as FormErrors),
  });

  const { data: CATEGORIES } = useGet<Category[]>({ url: "/blogs/categories?limit=100" });
  const { data: TAGS_RAW } = useGet<BlogTag[]>({ url: "/blogs/tags" });
  const TAGS = (TAGS_RAW || []).map(t => ({
    blog_tag_id: String(t.blog_tag_id),
    blog_tag_name: t.blog_tag_name,
  }));

  const handleSubmit = async (status: "published" | "draft") => {
    reset();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const order: (keyof typeof refs)[] = [
        "blog_title", "blog_slug", "blog_excerpt", "blog_content", "blog_cat_id",
      ];
      const first = order.find(k => errs[k]);
      if (first && refs[first].current) {
        refs[first].current.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          refs[first].current?.querySelector<HTMLElement>("input,select,textarea")?.focus();
        }, 350);
      }
      return;
    }

    let imageUrl = form.blog_img_url || "";
    if (featuredImage) {
      const fd = new FormData();
      fd.append("file", featuredImage);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      imageUrl = json.url || "";
    }
    await post({
      blog_cat_id: Number(form.blog_cat_id),
      blog_title: form.blog_title,
      blog_slug: form.blog_slug,
      blog_excerpt: form.blog_excerpt,
      blog_content: form.blog_content,
      blog_img_url: imageUrl,
      blog_meta_title: form.blog_meta_title,
      blog_meta_keywords: form.blog_meta_keywords,
      blog_meta_desc: form.blog_meta_desc,
      status,
      tags: selectedTags.map(id => Number(id))
    });
  };

  const cls = (base: string, errKey: keyof FormErrors) => `${base}${errors[errKey] ? " ap-has-err" : ""}`;

  return (
    <>
      <div className="ap-wrap">
        <div className="ap-header">
          <div className="ap-header-left">
            <div>
              <p className="ap-title">Add new Blog</p>
              <p className="ap-sub">Fill details and publish</p>
            </div>
          </div>
          <div className="ap-header-right">
            <Link href="/admin/blogs" className="ap-back">← Cancel</Link>
            <button
              className="ap-save"
              onClick={() => handleSubmit(form.status)}
              disabled={loading}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              {loading && <ButtonLoader />}
              {loading ? "Saving..." : "Save Blog"}
            </button>
          </div>
        </div>

        {!success && Object.keys(errors).length > 0 && (
          <div className="ap-banner error" style={{ color: "#fff" }}>
            ⚠ Please fill all mandatory fields.
          </div>
        )}
        {error && <div className="ap-banner error">⚠ {error}</div>}
        {success && <div className="ap-banner success">✓ Blog saved successfully!</div>}

        <div className="ap-body">
          <div>
            <Card>
              <div className="ap-f" ref={refs.blog_title}>
                <label className="ap-lbl">Post Title <span className="ap-req">*</span></label>
                <FormInput
                  className={cls("ap-in", "blog_title")}
                  placeholder="Post Title"
                  value={form.blog_title}
                  onChange={handleTitle}
                />
                <Err msg={errors.blog_title} />
              </div>

              <div className="ap-f" ref={refs.blog_slug}>
                <label className="ap-lbl">Permalink <span className="ap-req">*</span></label>
                <div className={`ap-plink${errors.blog_slug ? " ap-has-err" : ""}`}>
                  <span className="ap-plink-pre">/blog/</span>
                  <input
                    className="ap-in"
                    placeholder="auto-generated"
                    value={form.blog_slug}
                    onChange={e => set("blog_slug", e.target.value)}
                  />
                </div>
                <Err msg={errors.blog_slug} />
              </div>
            </Card>

            <Card title="Excerpt" ref={refs.blog_excerpt}>
              <textarea
                className={cls("ap-ta", "blog_excerpt")}
                rows={3}
                placeholder="Brief summary shown in blog listings…"
                value={form.blog_excerpt}
                onChange={e => set("blog_excerpt", e.target.value)}
              />
              <Err msg={errors.blog_excerpt} />
            </Card>

            <Card title="Full Content" ref={refs.blog_content}>
              <InputEditorForm
                value={form.blog_content}
                onChange={v => set("blog_content", v)}
              />
              <Err msg={errors.blog_content} />
            </Card>

            <Card title="SEO & Meta">
              <div className="ap-f">
                <label className="ap-lbl">Meta title</label>
                <input
                  className="ap-in"
                  placeholder="e.g. Getting Started with FastAPI – Complete Guide"
                  value={form.blog_meta_title}
                  onChange={e => set("blog_meta_title", e.target.value)}
                />
              </div>
              <div className="ap-f">
                <label className="ap-lbl">Meta keywords</label>
                <input
                  className="ap-in"
                  placeholder="fastapi, python, api"
                  value={form.blog_meta_keywords}
                  onChange={e => set("blog_meta_keywords", e.target.value)}
                />
              </div>
              <div className="ap-f" style={{ marginBottom: 0 }}>
                <label className="ap-lbl">Meta description</label>
                <textarea
                  className="ap-ta"
                  rows={2}
                  placeholder="150–160 chars SEO description…"
                  value={form.blog_meta_desc}
                  onChange={e => set("blog_meta_desc", e.target.value)}
                />
              </div>
            </Card>
          </div>

          {/* ── Right column ── */}
          <div>
            <div className="ap-pub-card">
              <div className="ap-pub-head">Status</div>
              <div className="ap-status-cards">
                <label className={`ap-status-card-item ${form.status === "published" ? "active published" : ""}`}>
                  <input
                    type="radio"
                    name="status"
                    checked={form.status === "published"}
                    onChange={() => set("status", "published")}
                  />
                  <div className="ap-status-icon">✓</div>
                  <div className="ap-status-content">
                    <div className="ap-status-title">Published</div>
                  </div>
                </label>
                <label className={`ap-status-card-item ${form.status === "draft" ? "active draft" : ""}`}>
                  <input
                    type="radio"
                    name="status"
                    checked={form.status === "draft"}
                    onChange={() => set("status", "draft")}
                  />
                  <div className="ap-status-icon">📝</div>
                  <div className="ap-status-content">
                    <div className="ap-status-title">Draft</div>
                  </div>
                </label>
              </div>
            </div>
            <Card title="Featured Image">
              <FeaturedImageUploader
                value={featuredImage}
                onChange={setFeaturedImage}
              />
            </Card>

            <Card title="Category" ref={refs.blog_cat_id}>
              <div className="ap-f" style={{ marginBottom: 0 }}>
                <select
                  className={cls("ap-sel", "blog_cat_id")}
                  value={form.blog_cat_id}
                  onChange={e => set("blog_cat_id", e.target.value)}
                >
                  <option value="">Select…</option>
                  {CATEGORIES?.map(c => (
                    <option key={c.blog_cat_id} value={c.blog_cat_id}>{c.blog_cat_name}</option>
                  ))}
                </select>
                <Err msg={errors.blog_cat_id} />
              </div>
            </Card>
            <Card title="Tags">
              <CheckBoxList
                items={TAGS || []}
                selected={selectedTags}
                onChange={setSelectedTags}
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}