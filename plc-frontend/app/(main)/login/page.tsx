"use client";

import { useState } from "react";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { showToast } from "@/app/utils/toast";
import { useRouter } from "next/navigation";
interface FormErrors {
    email?: string;
    password?: string;
}

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: "rajendra@gmail.com", password: "test4" });
    const [errors, setErrors] = useState<FormErrors>({});
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value }); 
        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        let toastId;

        try {
            setLoading(true);
            toastId = showToast.loading("Signing in...");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
                credentials: "include", 
            });

            const data = await response.json();
            toast.dismiss(toastId);

            if (!response.ok) { 
                if (data?.detail?.errors) {
                    setErrors(data.detail.errors);
                    return;
                }
                throw new Error(data?.detail?.message || data?.message || "Login failed");
            }

            document.cookie = `admin_session=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;

            await router.push("/admin/dashboard");
            showToast.success("Login successful");
            // window.location.href = "/admin/dashboard"; 
        } catch (err: unknown) {
            console.log('err', err)
            toast.dismiss(toastId);
            if (err instanceof Error && err.message) {
                showToast.error(err.message);
            } else {
                showToast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = (hasError: boolean): React.CSSProperties => ({
        width: "100%",
        padding: "10px 14px",
        fontSize: "13px",
        fontFamily: "'DM Sans', sans-serif",
        border: `1px solid ${hasError ? "#ef4444" : "#cbd5e1"}`,
        borderRadius: "8px",
        outline: "none",
        color: "#0f172a",
        background: hasError ? "#fef2f2" : "#fff",
        boxSizing: "border-box",
        transition: "border-color 0.15s, background 0.15s",
    });

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--grey)",
                padding: "24px",
            }}
        >
            <div style={{ width: "100%", maxWidth: "520px" }}>
                <div
                    style={{
                        background: "#fff",
                        borderRadius: "16px",
                        border: "1px solid #e2e8f0",
                        padding: "32px",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <h1
                                style={{
                                    fontSize: "22px",
                                    fontWeight: 600,
                                    color: "#0f172a",
                                    // margin: "0 0 px",
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                            >
                                Sign in
                            </h1> <p
                                style={{
                                    fontSize: "13px",
                                    color: "#64748b",
                                    margin: 0,
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                            >
                                Unauthorized access to this portal is strictly prohibited
                            </p>
                            {/* Email */}
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: errors.email ? "#ef4444" : "#374151",
                                        marginBottom: "6px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        letterSpacing: "0.02em",
                                    }}
                                >
                                    Email address
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                    style={inputStyle(!!errors.email)}
                                    onFocus={(e) => {
                                        if (!errors.email) e.target.style.borderColor = "#1e293b";
                                    }}
                                    onBlur={(e) => {
                                        if (!errors.email) e.target.style.borderColor = "#cbd5e1";
                                    }}
                                />
                                {errors.email && (
                                    <p
                                        style={{
                                            margin: "5px 0 0",
                                            fontSize: "11.5px",
                                            color: "#ef4444",
                                            fontFamily: "'DM Sans', sans-serif",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                        }}
                                    >
                                        ⚠ {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                                    <label
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: 500,
                                            color: errors.password ? "#ef4444" : "#374151",
                                            fontFamily: "'DM Sans', sans-serif",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        Password
                                    </label>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            color: "var(--blue)",
                                            cursor: "pointer",
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                    >
                                        Forgot password?
                                    </span>
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    style={inputStyle(!!errors.password)}
                                    onFocus={(e) => {
                                        if (!errors.password) e.target.style.borderColor = "#1e293b";
                                    }}
                                    onBlur={(e) => {
                                        if (!errors.password) e.target.style.borderColor = "#cbd5e1";
                                    }}
                                />
                                {errors.password && (
                                    <p
                                        style={{
                                            margin: "5px 0 0",
                                            fontSize: "11.5px",
                                            color: "#ef4444",
                                            fontFamily: "'DM Sans', sans-serif",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                        }}
                                    >
                                        ⚠ {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: "100%",
                                    padding: "11px",
                                    background: "var(--blue)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    fontFamily: "'DM Sans', sans-serif",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    opacity: loading ? 0.75 : 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    transition: "opacity 0.15s",
                                    marginTop: "4px",
                                }}
                            >
                                {loading ? <CircularProgress size={18} color="inherit" /> : "Sign in"}
                            </button>

                        </div>
                    </form>
                </div>

            </div>
        </main>
    );
}