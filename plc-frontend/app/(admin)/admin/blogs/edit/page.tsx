"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import InputEditorForm from "@/app/components/ui/InputEditorForm";
import FormInput from "@/app/(admin)/admin/components/FormInput";
import ButtonLoader from "@/app/components/main-ui/ButtonLoader";
import { useGet } from "@/app/components/hooks/useGet";
import { usePatch } from "@/app/components/hooks/usePatch";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  category_id: number;
  cat_name: string;
  cat_slug: string;
}

interface ProductType {
  product_type_id: number;
  name: string;
  description: string;
}

interface MetaField {
  id: string;
  meta_key: string;
  meta_title: string;
  meta_desc: string;
}

interface StockField {
  label: string;
  value: string;
}


interface ProductForm {
  product_id: string;
  category_id: string;
  product_type_id: string;
  part_no: string;
  url: string;
  short_desc: string;
  product_desc: string;
  image_url?: string;
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
  stock: string;
  status: "published" | "draft";
  meta: MetaField[];
  featuredImage?: File | null;
}

interface FormErrors {
  part_no?: string;
  url?: string;
  category_id?: string;
  product_type_id?: string;
  short_desc?: string;
  product_desc?: string;
  stock?: string;
}

interface MetaPayload {
  meta_key: string;
  meta_title: string;
  meta_desc: string;
}

interface ProductPayload
  extends Omit<ProductForm, "meta" | "featuredImage"> {
  meta: MetaPayload[];
}
// ─── Constants ────────────────────────────────────────────────────────────────


const DEFAULT_META: MetaField[] = [
  { id: "1", meta_key: "Brand", meta_title: "Brand Name", meta_desc: "" },
  { id: "2", meta_key: "Series", meta_title: "PLC Series", meta_desc: "" },
  { id: "3", meta_key: "Voltage", meta_title: "Operating Voltage", meta_desc: "" },
  { id: "4", meta_key: "Communication", meta_title: "Communication Port", meta_desc: "" },
];
const STOCK: StockField[] = [
  { value: "in-stock", label: "In Stock" },
  { value: "limited", label: "Limited" },
  { value: "out-stock", label: "Back Order" }
];


const EMPTY_FORM: ProductForm = {
  category_id: "",
  product_id: "",
  product_type_id: "",
  part_no: "6ES7214-1AG40-0XB0",
  url: "siemens-s7-1200-cpu-1214c",
  short_desc: "Siemens update S7-1200 PLC CPU",
  product_desc: "Compact PLC controller suitable for industrial automation.",
  image_url: "",
  meta_title: "Siemens S7-1200 CPU 1214C",
  meta_keywords: "siemens plc,s7-1200,cpu1214c",
  meta_description: "Buy Siemens S7-1200 CPU 1214C online.",
  stock: "in-stock",
  status: "published",
  meta: DEFAULT_META,
  featuredImage: null,
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: ProductForm): FormErrors {
  const e: FormErrors = {};
  if (!form.part_no.trim()) e.part_no = "Part No is required.";
  if (!form.url.trim()) e.url = "URL slug is required.";
  else if (!/^[a-z0-9-]+$/.test(form.url))
    e.url = "Only lowercase letters, numbers and hyphens.";
  if (!form.category_id) e.category_id = "Select a category.";
  if (!form.stock) e.stock = "Select a category.";
  if (!form.product_type_id) e.product_type_id = "Select a product type.";
  if (!form.short_desc.trim()) e.short_desc = "Short description is required.";
  if (!form.product_desc.trim()) e.product_desc = "Full description is required.";
  return e;
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="ap-err">⚠ {msg}</p> : null;
}

function Card({ ref, title, children }: { ref?: any; title?: string; children: React.ReactNode }) {
  return (
    <div className="ap-card">
      {title && <div className="ap-card-head">{title}</div>}
      <div className="ap-card-body" ref={ref}>{children}</div>
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="ap-g2">{children}</div>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AddProduct() {
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSub] = useState(false);
  const [apiError, setApiErr] = useState<string | null>(null);

  //  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    const product = sessionStorage.getItem("product-edit");
    if (product) {
      setForm(JSON.parse(product));
    }
  }, []);

  const { data: CATEGORIES, loading: catLoading } = useGet<Category[]>({
    url: "/categories/list",
  });
  const { data: PRODUCT_TYPES, loading: prdTypLoading } = useGet<ProductType[]>({
    url: "/ptypes/list",
  });

  const refs = {
    part_no: useRef<HTMLDivElement>(null),
    url: useRef<HTMLDivElement>(null),
    short_desc: useRef<HTMLDivElement>(null),
    product_desc: useRef<HTMLDivElement>(null),
    category_id: useRef<HTMLDivElement>(null),
    product_type_id: useRef<HTMLDivElement>(null),
    stock: useRef<HTMLDivElement>(null),
  };
  const set = <K extends keyof ProductForm>(key: K, val: ProductForm[K]) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  const handlePartNo = (v: string) => {
    set("part_no", v);
    set("url", v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  const addMeta = () =>
    set("meta", [
      ...form?.meta,
      {
        id: Date.now().toString(),
        meta_key: "",
        meta_title: "",
        meta_desc: "",
      },
    ]);
  const updateMeta = (id: string, field: keyof MetaField, val: string) =>
    set("meta", form?.meta?.map(m => m.id === id ? { ...m, [field]: val } : m));

  const removeMeta = (id: string) =>
    set("meta", form?.meta?.filter(m => m.id !== id));


  const { loading, error, success, patch, reset } = usePatch<ProductPayload, { id: string }>({
    url: `/products/${form?.product_id}`,
    onSuccess: () => { setForm(EMPTY_FORM); setErrors({}); },
    onErrors: (errs) => { setErrors(errs as FormErrors); },
  });

  const handleSubmit = async (status: "published" | "draft") => {
    reset();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const order: (keyof typeof refs)[] = [
        "part_no", "url", "short_desc", "product_desc",
        "category_id", "product_type_id", "stock",
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
    await patch({
      product_id: form.product_id,
      category_id: form.category_id,
      product_type_id: form.product_type_id,
      part_no: form.part_no,
      url: form.url,
      short_desc: form.short_desc,
      product_desc: form.product_desc,
      image_url: form.image_url,
      meta_title: form.meta_title,
      meta_keywords: form.meta_keywords,
      meta_description: form.meta_description,
      stock: form.stock,
      status,
      meta: form?.meta?.map(({ meta_key, meta_title, meta_desc }) => ({
        meta_key,
        meta_title,
        meta_desc,
      })),
    });

  }
  const cls = (base: string, errKey: keyof FormErrors) => `${base}${errors[errKey] ? " ap-has-err" : ""}`;

  return (
    <>
      <div className="ap-wrap">
        <div className="ap-header">
          <div className="ap-header-left">

            <div>
              <p className="ap-title">Edit :: {form?.part_no}</p>
              <p className="ap-sub">After changes save update.</p>
            </div>

          </div>
          <div className="ap-header-right">
            <Link href="/admin/products" className="ap-back">
              ← Cancel
            </Link>
            <button
              className="ap-save"
              onClick={() => handleSubmit(form.status)}
              disabled={loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {loading && <ButtonLoader />}
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>

        </div>

        {Object.keys(errors).length > 0 && (
          <div className="ap-banner error" style={{ color: "#fff" }}>
            ⚠ Please fill all mandatory fields.
          </div>
        )}
        {error && <div className="ap-banner error">⚠ {error}</div>}
        {success && <div className="ap-banner success">✓ Product saved successfully!</div>}

        <div className="ap-body">

          {/* ════ LEFT column ════ */}
          <div>

            {/* Identity */}
            <Card>
              <div className="ap-f">
                <label className="ap-lbl">Part No <span className="ap-req">*</span></label>
                <FormInput
                  className={cls("ap-in", "part_no")}
                  placeholder="e.g. 6ES7214-1AG40-0XB0"
                  value={form.part_no}
                  onChange={handlePartNo}
                />
                <Err msg={errors.part_no} />
              </div>

              <div className="ap-f">
                <label className="ap-lbl">URL slug <span className="ap-req">*</span></label>
                <div className={`ap-plink${errors.url ? " ap-has-err" : ""}`}>
                  <span className="ap-plink-pre">/products/</span>
                  <input
                    className="ap-in"
                    placeholder="auto-generated"
                    value={form.url}
                    onChange={e => set("url", e.target.value)}
                  />
                </div>
                <Err msg={errors.url} />
              </div>


            </Card>

            {/* Short description */}
            <Card title="Short description">
              <textarea
                className={cls("ap-ta", "short_desc")}
                rows={3}
                placeholder="Brief summary shown in product listings…"
                value={form.short_desc}
                onChange={e => set("short_desc", e.target.value)}
              />
              <Err msg={errors.short_desc} />
            </Card>

            {/* Full description */}
            <Card title="Full description" ref={refs.product_desc}>
              <InputEditorForm value={form.product_desc} onChange={v => set("product_desc", v)} />
              <Err msg={errors.product_desc} />
            </Card>

            {/* Stock status */}


            {/* Specifications — meta[] */}
            <Card title="Specifications (meta)">
              <div className="ap-meta-hd">
                <span>meta_key</span>
                <span>meta_title</span>
                <span>meta_desc</span>
                <span />
              </div>
              {form.meta.map(m => (
                <div key={m.id} className="ap-meta-row">
                  <input className="ap-in" style={{ fontSize: 12.5 }} placeholder="e.g. Brand" value={m.meta_key} onChange={e => updateMeta(m.id, "meta_key", e.target.value)} />
                  <input className="ap-in" style={{ fontSize: 12.5 }} placeholder="e.g. Brand Name" value={m.meta_title} onChange={e => updateMeta(m.id, "meta_title", e.target.value)} />
                  <input className="ap-in" style={{ fontSize: 12.5 }} placeholder="e.g. Siemens" value={m.meta_desc} onChange={e => updateMeta(m.id, "meta_desc", e.target.value)} />
                  <button className="ap-meta-del" onClick={() => removeMeta(m.id)} title="Remove row">×</button>
                </div>
              ))}
              <button className="ap-add-meta" onClick={addMeta}>+ Add row</button>
            </Card>

            {/* SEO */}
            <Card title="SEO & meta">
              <div className="ap-f">
                <label className="ap-lbl">Meta title</label>
                <input className="ap-in" placeholder="e.g. Siemens S7-1200 CPU 1214C – Buy Online" value={form.meta_title} onChange={e => set("meta_title", e.target.value)} />
              </div>
              <div className="ap-f">
                <label className="ap-lbl">Meta keywords</label>
                <input className="ap-in" placeholder="siemens plc, s7-1200, cpu1214c" value={form.meta_keywords} onChange={e => set("meta_keywords", e.target.value)} />
              </div>
              <div className="ap-f" style={{ marginBottom: 0 }}>
                <label className="ap-lbl">Meta description</label>
                <textarea
                  className="ap-ta"
                  rows={2}
                  placeholder="150–160 chars SEO description…"
                  value={form.meta_description}
                  onChange={e => set("meta_description", e.target.value)}
                />
              </div>
            </Card>

          </div>

          {/* ════ RIGHT column ════ */}
          <div>

            {/* Publish */}
            <div className="ap-pub-card">
              <div className="ap-pub-head">Publish</div>
              <div className="ap-pub-status">
                <span className="ap-pub-label">Status</span>
                <button
                  className={`ap-status-badge ${form.status}`}
                  onClick={() => set("status", form.status === "published" ? "draft" : "published")}
                >
                  <span className="ap-status-dot" />
                  {form.status === "published" ? "Published" : "Draft"}
                  ▾
                </button>
              </div>
              <div className="ap-pub-actions">
                <button className="ap-btn-draft" onClick={() => handleSubmit("draft")} disabled={submitting}>
                  Save as draft
                </button>
                <button className="ap-btn-pub" onClick={() => handleSubmit("published")} disabled={submitting}>
                  {submitting ? "Publishing…" : "Publish now"}
                </button>
              </div>
            </div>

            <Card title="Stock Status">
              <Grid2>
                <div className="ap-f" style={{ marginBottom: 0 }}>
                  <select className={cls("ap-sel", "stock")} value={form.stock} onChange={e => set("stock", e.target.value)}>
                    <option value="">Select…</option>
                    {STOCK.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                  <Err msg={errors.stock} />
                </div>

              </Grid2>
            </Card>



            <Card title="Category">
              <Grid2>
                <div className="ap-f" style={{ marginBottom: 0 }}>
                  {/* <label className="ap-lbl">Category <span className="ap-req">*</span></label> */}
                  <select className={cls("ap-sel", "category_id")} value={form.category_id} onChange={e => set("category_id", e.target.value)}>
                    <option value="">Select…</option>
                    {CATEGORIES?.map(c => <option key={c.category_id} value={c.category_id}>{c.cat_name}</option>)}
                  </select>
                  <Err msg={errors.category_id} />
                </div>

              </Grid2>
            </Card>

            <Card title="Product Type">
              <Grid2>
                <div className="ap-f" style={{ marginBottom: 0 }}>
                  {/* <label className="ap-lbl">e <span className="ap-req">*</span></label> */}
                  <select className={cls("ap-sel", "product_type_id")} value={form.product_type_id} onChange={e => set("product_type_id", e.target.value)}>
                    <option value="">Select…</option>
                    {PRODUCT_TYPES?.map(c => <option key={c.product_type_id} value={c.product_type_id}>{c.name}</option>)}
                  </select>
                  <Err msg={errors.product_type_id} />
                </div>

              </Grid2>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
}