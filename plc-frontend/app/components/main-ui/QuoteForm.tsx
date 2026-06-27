"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Product } from "@/app/types";

interface QuoteFormProps {
  product: Product;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  company: string;
}

export default function QuoteForm({ product }: QuoteFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.product_id,
          category_id: product.category.category_id,
          part_number: product.part_no,
          manufacturer: product.category.cat_name,
          quantity: 1,
          customer_name: formData.name,
          company_name: formData.company,
          email_address: formData.email,
          telephone: formData.phone,
          content: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "",company: "" });

    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quoteform">
      <div className="quote-header">
        <p>
          <span>Get a quick quote for </span>
          <span style={{ fontWeight: "normal" }}>
            {product.category.cat_name} - {product.part_no}
          </span>
        </p>
      </div>
      <div className="rfq-card">
        <form className="rfq-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
           <div className="form-group">
            <input
              type="text"
              name="company"
              placeholder="Company Name *"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <PhoneInput
              country={"us"}
              enableSearch
              value={formData.phone}
              onChange={(phone) =>
                setFormData((prev) => ({ ...prev, phone }))
              }
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Business Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              rows={5}
              placeholder="Tell us your requirements..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "14px", marginBottom: "8px" }}>
              {error}
            </p>
          )}
          {success && (
            <p style={{ color: "green", fontSize: "14px", marginBottom: "8px" }}>
              Your enquiry has been submitted successfully!
            </p>
          )}

          <button type="submit" className="quote-btn" disabled={loading}>
            {loading ? "Submitting..." : "Request Quote"}
          </button>
        </form>

        <p className="privacy">
          For more information on how your data is processed and stored by PLC
          Automation please read our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}