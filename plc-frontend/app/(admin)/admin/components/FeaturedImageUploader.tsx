// components/ui/FeaturedImageUploader.tsx
import { useCallback, useEffect, useRef, useState } from "react";

interface FeaturedImageUploaderProps {
  value: File | null;
  image_url?: string | null;
  onChange: (file: File | null) => void;
}

export default function FeaturedImageUploader({
  value,
  image_url,
  onChange,
}: FeaturedImageUploaderProps) {
  const [dragging, setDragging]   = useState(false);
  const [preview, setPreview]     = useState<string | null>(null);
  const fileRef                   = useRef<HTMLInputElement>(null);

  // Edit ke time pe image_url se preview set karo
  useEffect(() => {
    if (image_url && !value) {
      setPreview(`${process.env.NEXT_PUBLIC_APP_URL}${image_url}`);
    }
  }, [image_url]);

  // value null ho jaye (remove) toh preview clear karo
  useEffect(() => {
    if (!value && !image_url) {
      setPreview(null);
    }
  }, [value]);

  const handleFile = (file: File) => {
    onChange(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }, []);

  return (
    <div>
      {/* Card Header */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      > 
        {preview && (
          <button
            onClick={handleRemove}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Remove
          </button>
        )}
      </div>

      {/* Body */}
      <div style={{ background: "var(--grey)", padding: "20px" }}>
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              borderRadius: "8px",
              objectFit: "cover",
              maxHeight: "160px",
            }}
          />
        ) : (
          <div
            style={{
              border: `2px dashed ${dragging ? "#0d9488" : "#1e293b"}`,
              borderRadius: "10px",
              padding: "28px 16px",
              textAlign: "center",
              cursor: "pointer",
              transition: "border-color 0.2s",
              background: dragging ? "rgba(13,148,136,0.05)" : "transparent",
            }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🖼️</div>
            <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
              Drag & drop or{" "}
              <span style={{ color: "#0d9488", cursor: "pointer" }}>browse</span>
            </div>
            <div style={{ fontSize: "11px", color: "#334155", marginTop: "4px" }}>
              PNG, JPG, WebP up to 10MB
            </div>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>
    </div>
  );
}