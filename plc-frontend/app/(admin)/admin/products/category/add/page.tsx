"use client";

import { useState, useRef, forwardRef } from "react";
import Link from "next/link";
import InputEditorForm from "@/app/components/ui/InputEditorForm";
import FormInput from "@/app/(admin)/admin/components/FormInput";
import { usePost } from "@/app/components/hooks/usePost";
import ButtonLoader from "@/app/components/main-ui/ButtonLoader";
import FeaturedImageUploader from "../../../components/FeaturedImageUploader";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CategoryForm {
  cat_name: string;
  cat_slug: string;
  meta_title: string;
  meta_description: string;
  status: "published" | "draft";
  cat_short_text: string;
  cat_desc: string;
  meta_keywords: string;
  image_url: string;
}

interface FormErrors {
  cat_name?: string;
  cat_slug?: string;
  meta_title?: string;
  meta_description?: string;
  cat_short_text?: string;
  cat_desc?: string;
  image?: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
const EMPTY_FORM: CategoryForm = {
  cat_name: "",
  cat_slug: "",
  meta_title: "",
  meta_description: "",
  status: "published",
  cat_short_text: "",
  cat_desc: "",
  meta_keywords: "",
  image_url: "",
};

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(form: CategoryForm): FormErrors {
  const e: FormErrors = {};
  if (!form.cat_name.trim()) e.cat_name = "Category name is required.";
  if (!form.cat_slug.trim()) e.cat_slug = "Slug is required.";
  else if (!/^[a-z0-9-]+$/.test(form.cat_slug))
    e.cat_slug = "Only lowercase letters, numbers and hyphens.";
  if (!form.cat_short_text.trim()) e.cat_short_text = "Category excerpt is required.";
  if (!form.cat_desc.trim()) e.cat_desc = "Category description is required.";
  return e;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Err({ msg }: { msg?: string }) {
  return msg ? <p className="ap-err">⚠ {msg}</p> : null;
}

const Card = forwardRef<
  HTMLDivElement,
  { title?: string; children: React.ReactNode }
>(({ title, children }, ref) => (
  <div className="ap-card">
    {title && <div className="ap-card-head">{title}</div>}
    <div className="ap-card-body" ref={ref}>
      {children}
    </div>
  </div>
));
Card.displayName = "Card";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AddCategory() {
  const [form, setForm] = useState<CategoryForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const refs = {
    cat_name: useRef<HTMLDivElement>(null),
    cat_slug: useRef<HTMLDivElement>(null),
    cat_short_text: useRef<HTMLDivElement>(null),
    cat_desc: useRef<HTMLDivElement>(null),
  };

  const set = <K extends keyof CategoryForm>(key: K, val: CategoryForm[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleName = (v: string) => {
    set("cat_name", v);
    set(
      "cat_slug",
      v
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    );
  };

  const { loading, error, success, post, reset } = usePost<
    any,
    { id: string }
  >({
    url: "/products/category",
    onSuccess: () => {
      setForm(EMPTY_FORM);
      setErrors({});
      setFeaturedImage(null);
    },
    onErrors: (errs) => setErrors(errs as FormErrors),
  });

  const handleSubmit = async () => {
    reset();
    const errs = validate(form);
    console.log('errserrserrs', errs)
    if (Object.keys(errs).length) {
      setErrors(errs);
      const order: (keyof typeof refs)[] = [
        "cat_name",
        "cat_slug",
        "cat_short_text",
        "cat_desc",
      ];
      const first = order.find((k) => errs[k as keyof FormErrors]);
      if (first && refs[first].current) {
        refs[first].current.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          refs[first].current
            ?.querySelector<HTMLElement>("input,select,textarea")
            ?.focus();
        }, 350);
      }
      return;
    }

   
    let imageUrl = form.image_url || "";

    if (featuredImage) {
      const fd = new FormData();
      fd.append("file", featuredImage);
      fd.append("path", "categories");

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/upload`, {
          method: "POST",
          body: fd,
        }); 
        const json = await res.json(); 
        if (!res.ok) {
          const fileError =
            json?.detail?.errors?.file ||
            json?.errors?.file ||
            json?.detail?.message ||
            json?.message ||
            "Image upload failed";

          setErrors((prev) => ({ ...prev, image: fileError }));
          return;
        }

        imageUrl = json.url || "";

      } catch (err) {
        setErrors((prev) => ({ ...prev, image: "Image upload failed. Please try again." }));
        return;
      }
    } 
    try {
      const result = await post({
        cat_name: form.cat_name,
        cat_slug: form.cat_slug,
        cat_desc: form.cat_desc,
        cat_short_text: form.cat_short_text,
        image_url: imageUrl,
        meta_title: form.meta_title,
        meta_keywords: form.meta_keywords,
        meta_description: form.meta_description,
        status: form.status === "published" ? 1 : 0,
      }); 
      if (!result && imageUrl) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/delete`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: imageUrl }),
        });
      }

    } catch (err) { 
      if (imageUrl) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/delete`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: imageUrl }),
        });
      }
      setErrors((prev) => ({ ...prev, general: "Something went wrong. Please try again." }));
    }
  };

  const cls = (base: string, errKey: keyof FormErrors) =>
    `${base}${errors[errKey] ? " ap-has-err" : ""}`;

  return (
    <>
      <div className="ap-wrap">
        {/* ── Header ── */}
        <div className="ap-header">
          <div className="ap-header-left">
            <div>
              <p className="ap-title">Add New Category</p>
              <p className="ap-sub">Fill all mandatory fields</p>
            </div>
          </div>
          <div className="ap-header-right">
            <Link href="/admin/products/category" className="ap-back">
              ← Cancel
            </Link>
            <button
              className="ap-save"
              onClick={handleSubmit}
              disabled={loading}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              {loading && <ButtonLoader />}
              {loading ? "Saving..." : "Save Category"}
            </button>
          </div>
        </div>

        {/* ── Banners ── */}
        {!success && Object.keys(errors).length > 0 && (
          <div className="ap-banner error">⚠ Please fill all mandatory fields.</div>
        )}

        {errors.image && (
          <div className="ap-banner error">⚠ {errors.image}</div>
        )}
        {error && <div className="ap-banner error">⚠ {error}</div>}
        {success && <div className="ap-banner success">✓ Category saved successfully!</div>}

        {/* ── Body ── */}
        <div className="ap-body">
          {/* ── Left column ── */}
          <div>
            {/* Category Name & Slug */}
            <Card>
              <div className="ap-f" ref={refs.cat_name}>
                <label className="ap-lbl">
                  Category Name <span className="ap-req">*</span>
                </label>
                <FormInput
                  className={cls("ap-in", "cat_name")}
                  placeholder="Category Name"
                  value={form.cat_name}
                  onChange={handleName}
                />
                <Err msg={errors.cat_name} />
              </div>

              <div className="ap-f" ref={refs.cat_slug}>
                <label className="ap-lbl">
                  Slug <span className="ap-req">*</span>
                </label>
                <div className={`ap-plink${errors.cat_slug ? " ap-has-err" : ""}`}>
                  <input
                    className="ap-in"
                    placeholder="auto-generated"
                    value={form.cat_slug}
                    onChange={(e) => set("cat_slug", e.target.value)}
                  />
                </div>
                <Err msg={errors.cat_slug} />
              </div>
            </Card>

            {/* Category Excerpt */}
            <Card title="Category Excerpt" ref={refs.cat_short_text}>
              <InputEditorForm
                value={form.cat_short_text}
                onChange={(v) => set("cat_short_text", v)}
              />
              <Err msg={errors.cat_short_text} />
            </Card>

            {/* Category Description */}
            <Card title="Category Description" ref={refs.cat_desc}>
              <InputEditorForm
                value={form.cat_desc}
                onChange={(v) => set("cat_desc", v)}
              />
              <Err msg={errors.cat_desc} />
            </Card>

            {/* SEO & Meta */}
            <Card title="SEO & Meta">
              <div className="ap-f">
                <label className="ap-lbl">Meta Title</label>
                <input
                  className="ap-in"
                  placeholder="e.g. Best Electronics – Shop Now"
                  value={form.meta_title}
                  onChange={(e) => set("meta_title", e.target.value)}
                />
              </div>
              <div className="ap-f">
                <label className="ap-lbl">Meta Keywords</label>
                <input
                  className="ap-in"
                  placeholder="electronics, gadgets, deals"
                  value={form.meta_keywords}
                  onChange={(e) => set("meta_keywords", e.target.value)}
                />
              </div>
              <div className="ap-f" style={{ marginBottom: 0 }}>
                <label className="ap-lbl">Meta Description</label>
                <textarea
                  className="ap-ta"
                  rows={2}
                  placeholder="150–160 chars SEO description…"
                  value={form.meta_description}
                  onChange={(e) => set("meta_description", e.target.value)}
                />
              </div>
            </Card>
          </div>

          {/* ── Right column ── */}
          <div>
            {/* Status */}
            <div className="ap-pub-card">
              <div className="ap-pub-head">Status</div>
              <div className="ap-status-cards">
                <label
                  className={`ap-status-card-item ${form.status === "published" ? "active published" : ""
                    }`}
                >
                  <input
                    type="radio"
                    name="status"
                    checked={form.status === "published"}
                    onChange={() => set("status", "published")}
                  />
                  <div className="ap-status-icon">✓</div>
                  <div className="ap-status-content">
                    <div className="ap-status-title">Active</div>
                  </div>
                </label>
                <label
                  className={`ap-status-card-item ${form.status === "draft" ? "active draft" : ""
                    }`}
                >
                  <input
                    type="radio"
                    name="status"
                    checked={form.status === "draft"}
                    onChange={() => set("status", "draft")}
                  />
                  <div className="ap-status-icon">📝</div>
                  <div className="ap-status-content">
                    <div className="ap-status-title">Inactive</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Featured Image */}
            <Card title="Featured Image">
              <FeaturedImageUploader
                value={featuredImage}
                onChange={setFeaturedImage}
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}