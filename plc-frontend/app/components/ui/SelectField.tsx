"use client"
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface Option {
    label: string;
    value?: string;
}

interface SelectFieldProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
}

export default function SelectField({ value, onChange, options, placeholder = "Select product type" }: SelectFieldProps) {
    const [open, setOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                !triggerRef.current?.contains(e.target as Node) &&
                !dropdownRef.current?.contains(e.target as Node)
            ) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleOpen = () => {
        if (!open && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
        setOpen((o) => !o);
    };

    const selectedLabel = options.find((o) => o.label === value)?.label ?? placeholder;

    return (
        <>
            <div ref={triggerRef} style={{ position: "relative", width: "100%" }}>
                <div
                    onClick={handleOpen}
                    style={{
                        display: "flex",
                        height: "45px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        background: "#fff",
                        border: `1px solid ${open ? "#1e293b" : "#cbd5e1"}`,
                        borderRadius: open ? "8px 8px 0 0" : "8px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontFamily: "'DM Sans', sans-serif",
                        color: "#0f172a",
                        boxShadow: open ? "0 0 0 3px rgba(30,41,59,0.1)" : "none",
                        transition: "border-color 0.15s, box-shadow 0.15s",
                        userSelect: "none",
                    }}
                >
                    <span>{selectedLabel}</span>
                    <span
                        style={{
                            fontSize: "16px",
                            color: "#94a3b8",
                            transition: "transform 0.2s",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            display: "inline-block",
                        }}
                    >
                        ▾
                    </span>
                </div>
            </div>

            {open && typeof window !== "undefined" && createPortal(
                <div
                    ref={dropdownRef}
                    style={{
                        position: "absolute",
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        width: dropdownPos.width,
                        background: "#fff",
                        border: "1px solid #1e293b",
                        borderTop: "none",
                        borderRadius: "0 0 8px 8px",
                        overflow: "hidden",
                        zIndex: 99999,
                        boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
                    }}
                >
                    {options.map((item) => (
                        <div
                            key={item.label}
                            onClick={() => {
                                onChange(item.label);
                                setOpen(false);
                            }}
                            style={{
                                padding: "9px 14px",
                                fontSize: "13px",
                                fontFamily: "'DM Sans', sans-serif",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                background: value === item.label ? "#eff6ff" : "transparent",
                                color: value === item.label ? "#1d4ed8" : "#0f172a",
                                fontWeight: value === item.label ? 500 : 400,
                            }}
                            onMouseEnter={(e) => {
                                if (value !== item.label)
                                    (e.currentTarget as HTMLDivElement).style.background = "#f8fafc";
                            }}
                            onMouseLeave={(e) => {
                                if (value !== item.label)
                                    (e.currentTarget as HTMLDivElement).style.background = "transparent";
                            }}
                        >
                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: "currentColor",
                                    opacity: value === item.label ? 1 : 0.4,
                                    flexShrink: 0,
                                }}
                            />
                            {item.label}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </>
    );
}