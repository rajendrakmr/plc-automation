"use client";

import { useState, useRef, forwardRef } from "react";
import Link from "next/link";
import FormInput from "@/app/(admin)/admin/components/FormInput";
import { usePost } from "@/app/components/hooks/usePost";
import ButtonLoader from "@/app/components/main-ui/ButtonLoader";

// ─── Types ───────────────────────────────────────────────────────────────────
interface CategoryForm {
  blog_cat_name: string;
  blog_cat_slug: string;
}

interface FormErrors {
  blog_cat_slug?: string;
  blog_cat_name?: string;
}

// ─── Defaults ────────────────────────────────────────────────────────────────
const EMPTY_FORM: CategoryForm = {
  blog_cat_name: "",
  blog_cat_slug: "",
};

// ─── Validation ──────────────────────────────────────────────────────────────
function validate(form: CategoryForm): FormErrors {
  const e: FormErrors = {};
  if (!form.blog_cat_name.trim()) e.blog_cat_name = "Category name is required.";
  if (!form.blog_cat_slug.trim()) e.blog_cat_slug = "Category slug is required.";
  else if (!/^[a-z0-9-]+$/.test(form.blog_cat_slug))
    e.blog_cat_slug = "Only lowercase letters, numbers and hyphens.";
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AddBlogCategory() {
  const [form, setForm] = useState<CategoryForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const refs = {
    blog_cat_name: useRef<HTMLDivElement>(null),
    blog_cat_slug: useRef<HTMLDivElement>(null),
  };

  const set = <K extends keyof CategoryForm>(key: K, val: CategoryForm[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleName = (v: string) => {
    set("blog_cat_name", v);
    set(
      "blog_cat_slug",
      v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    );
  };

  const { loading, error, success, post, reset } = usePost<any, { id: string }>({
    url: "/blogs/category",
    onSuccess: () => {
      setForm(EMPTY_FORM);
      setErrors({});
    },
    onErrors: (errs) => setErrors(errs as FormErrors),
  });

  const handleSubmit = async () => {
    reset();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs); 
      const order: (keyof typeof refs)[] = ["blog_cat_name", "blog_cat_slug"];
      const first = order.find((k) => errs[k]);
      if (first && refs[first].current) {
        refs[first].current.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          refs[first].current?.querySelector<HTMLElement>("input,select,textarea")?.focus();
        }, 350);
      }
      return;
    }
    await post({
      blog_cat_name: form.blog_cat_name,
      blog_cat_slug: form.blog_cat_slug,
    });
  };

  const cls = (base: string, errKey: keyof FormErrors) =>
    `${base}${errors[errKey] ? " ap-has-err" : ""}`;


  console.log("errors", errors);
  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="ap-wrap">
      {/* Header */}
      <div className="ap-header">
        <div className="ap-header-left">
          <p className="ap-title">Add New Category</p>
          <p className="ap-sub">Fill details and save</p>
        </div>
        <div className="ap-header-right">
          <Link href="/admin/blogs/category" className="ap-back">
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

      {/* Banners */}
      {!success && Object.keys(errors).length > 0 && (
        <div className="ap-banner error">
          ⚠ Please fill all mandatory fields.
        </div>
      )}
      {error && <div className="ap-banner error">⚠ {error}</div>}
      {success && (
        <div className="ap-banner success">✓ Category saved successfully!</div>
      )}

      {/* Body */}
      <div className="ap-body">
        <Card>
          {/* Category Name */}
          <div className="ap-f" ref={refs.blog_cat_name}>
            <label className="ap-lbl">
              Category Name <span className="ap-req">*</span>
            </label>
            <FormInput
              className={cls("ap-in", "blog_cat_name")}
              placeholder="Category Name"
              value={form.blog_cat_name}
              onChange={handleName}
            />
            <Err msg={errors.blog_cat_name} />
          </div>

          {/* Permalink */}
          <div className="ap-f" ref={refs.blog_cat_slug}>
            <label className="ap-lbl">
              Permalink <span className="ap-req">*</span>
            </label>
            <div className={`ap-plink${errors.blog_cat_slug ? " ap-has-err" : ""}`}>
              {/* <span className="ap-plink-pre">/</span> */}
              <input
                className="ap-in"
                placeholder="auto-generated"
                value={form.blog_cat_slug}
                onChange={(e) => set("blog_cat_slug", e.target.value)}
              />
            </div>
            <Err msg={errors.blog_cat_slug} />
          </div>
        </Card>
      </div>
    </div>
  );
}