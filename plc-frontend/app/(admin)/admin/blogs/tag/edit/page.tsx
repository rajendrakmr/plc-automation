"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import Link from "next/link";
import FormInput from "@/app/(admin)/admin/components/FormInput";
import ButtonLoader from "@/app/components/main-ui/ButtonLoader";
import { usePatch } from "@/app/components/hooks/usePatch";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CategoryForm {
  blog_tag_id: number;
  blog_tag_name: string;
  blog_tag_slug: string;
  status?: number | string;
}



interface FormErrors {
  blog_tag_id?: string;
  blog_tag_name?: string;
  blog_tag_slug?: string;
  status?: number | string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const EMPTY_FORM: CategoryForm = {
  blog_tag_id: 0,
  blog_tag_name: "",
  blog_tag_slug: "",
  status: 1
};

function validate(form: CategoryForm): FormErrors {
  const e: FormErrors = {};
  if (!form.blog_tag_name.trim()) e.blog_tag_name = "Category name is required.";
  if (!form.blog_tag_slug.trim()) e.blog_tag_slug = "Permalink is required.";
  else if (!/^[a-z0-9-]+$/.test(form.blog_tag_slug))
    e.blog_tag_slug = "Only lowercase letters, numbers and hyphens.";
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


export default function EditBlogCategory() {
  const [form, setForm] = useState<CategoryForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const refs = {
    blog_tag_slug: useRef<HTMLDivElement>(null),
    blog_tag_name: useRef<HTMLDivElement>(null),
    blog_tag_id: useRef<HTMLDivElement>(null),
  };

  const set = <K extends keyof CategoryForm>(key: K, val: CategoryForm[K]) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  useEffect(() => {
    const blog = sessionStorage.getItem("blog-tag-edit");
    if (blog) {
      const blogsDetail = JSON.parse(blog);
      setForm(blogsDetail);
      // setSelectedTags((blogsDetail?.tags ?? []).map((t: { blog_tag_id: number }) => String(t.blog_tag_id)))
    }
  }, []);

  const handleName = (v: string) => {
    set("blog_tag_name", v);
    set("blog_tag_slug", v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  const { loading, error, success, patch, reset ,data} = usePatch<any, { id: string }>({
    url: `/blogs/tag/${form.blog_tag_id}`,
    onSuccess: () => {
      console.log("data",data)
      // setForm(EMPTY_FORM);
      setErrors({});
    },
    onErrors: (errs) => setErrors(errs as FormErrors),
  });



  const handleSubmit = async () => {
    reset();

    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const order: (keyof typeof refs)[] = ["blog_tag_name", "blog_tag_slug"];
      const first = order.find((k) => errs[k]);
      if (first && refs[first].current) {
        refs[first].current.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          refs[first].current?.querySelector<HTMLElement>("input,select,textarea")?.focus();
        }, 350);
      }
      return;
    }
    await patch({
      blog_tag_id: form.blog_tag_id,
      blog_tag_name: form.blog_tag_name,
      blog_tag_slug: form.blog_tag_slug,
      status: form.status,
    });
    // const errs = validate(form);
    // if (Object.keys(errs).length) {
    //   setErrors(errs);
    //   const order: (keyof typeof refs)[] = [
    //     "blog_tag_name", "blog_tag_slug", "blog_tag_id",
    //   ];
    //   const first = order.find(k => errs[k]);
    //   if (first && refs[first].current) {
    //     refs[first].current.scrollIntoView({ behavior: "smooth", block: "center" });
    //     setTimeout(() => {
    //       refs[first].current?.querySelector<HTMLElement>("input,select,textarea")?.focus();
    //     }, 350);
    //   }
    //   return;
    // }

    // let imageUrl = form.blog_img_url || "";
    // if (featuredImage) {
    //   const fd = new FormData();
    //   fd.append("file", featuredImage);
    //   const res = await fetch(`/api/upload/`, { method: "POST", body: fd });
    //   const json = await res.json();
    //   imageUrl = json.url || "";
    // }
    // await patch({
    //   blog_tag_id: Number(form.blog_tag_id),
    //   blog_id: Number(form.blog_id),
    //   blog_title: form.blog_title,
    //   blog_slug: form.blog_slug,
    //   blog_excerpt: form.blog_excerpt,
    //   blog_content: form.blog_content,
    //   blog_img_url: imageUrl,
    //   blog_meta_title: form.blog_meta_title,
    //   blog_meta_keywords: form.blog_meta_keywords,
    //   blog_meta_desc: form.blog_meta_desc,
    //   status,
    //   tags: selectedTags.map(id => Number(id))
    // });
  };

  const cls = (base: string, errKey: keyof FormErrors) => `${base}${errors[errKey] ? " ap-has-err" : ""}`;

  return (
    <>
      <div className="ap-wrap">
        <div className="ap-header">
          <div className="ap-header-left">
            <div>
              <p className="ap-title">Update Blog Tag</p>
              <p className="ap-sub">Fill all mandatory fields.</p>
            </div>
          </div>
          <div className="ap-header-right">
            <Link href="/admin/blogs/tag" className="ap-back">← Cancel</Link>
            <button
              className="ap-save"
              onClick={() => handleSubmit()}
              disabled={loading}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              {loading && <ButtonLoader />}
              {loading ? "Updating..." : "Update Tag"}
            </button>
          </div>
        </div>

        {!success && Object.keys(errors).length > 0 && (
          <div className="ap-banner error">
            ⚠ Please fill all mandatory fields.
          </div>
        )}
        {error && <div className="ap-banner error">⚠ {error}</div>}
        {success && <div className="ap-banner success">✓ Category updated successfully!</div>}

        <div className="ap-body">
          <div>
            <Card>
              <div className="ap-f" ref={refs.blog_tag_name}>
                <label className="ap-lbl">Category Name <span className="ap-req">*</span></label>
                <FormInput
                  className={cls("ap-in", "blog_tag_name")}
                  placeholder="Category Name"
                  value={form.blog_tag_name}
                  onChange={handleName}
                />
                <Err msg={errors.blog_tag_name} />
              </div>

              <div className="ap-f" ref={refs.blog_tag_slug}>
                <label className="ap-lbl">Slug <span className="ap-req">*</span></label>
                <div className={`ap-plink${errors.blog_tag_slug ? " ap-has-err" : ""}`}>

                  <input
                    className="ap-in"
                    placeholder="auto-generated"
                    value={form.blog_tag_slug}
                    onChange={e => set("blog_tag_slug", e.target.value)}
                  />
                </div>
                <Err msg={errors.blog_tag_slug} />
              </div>
            </Card>
          </div>

          {/* ── Right column ── */}
          <div>
            <div className="ap-pub-card">
              <div className="ap-pub-head">Status</div>
              <div className="ap-status-cards">
                <label className={`ap-status-card-item ${form.status === 1 ? "active published" : ""}`}>
                  <input
                    type="radio"
                    name="status"
                    checked={form.status === 1}
                    onChange={() => set("status", 1)}
                  />
                  <div className="ap-status-icon">✓</div>
                  <div className="ap-status-content">
                    <div className="ap-status-title">Active</div>
                  </div>
                </label>
                <label className={`ap-status-card-item ${form.status === 0 ? "active draft" : ""}`}>
                  <input
                    type="radio"
                    name="status"
                    checked={form.status === 0}
                    onChange={() => set("status", 0)}
                  />
                  <div className="ap-status-icon">📝</div>
                  <div className="ap-status-content">
                    <div className="ap-status-title">In Active</div>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}