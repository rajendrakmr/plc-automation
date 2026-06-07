"use client";
import { Editor } from "primereact/editor";

export default function InputEditorForm({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-medium text-gray-700">{label}</label>
      )}
      <Editor
        value={value}
        onTextChange={(e) => onChange(e.htmlValue || "")}
        style={{ height: "250px" }}
      />
    </div>
  );
}