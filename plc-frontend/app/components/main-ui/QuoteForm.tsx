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
}

export default function QuoteForm({ product }: QuoteFormProps) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({
            ...formData,
            product: `${product.category.cat_name} ${product.part_no}`,
        });

        // API call here
    };

    return (
        <div className="quoteform">
            <div className="quote-header"> 
                <p>
                    <span>Get a quick quote for </span><span style={{fontWeight:"normal"}}>{product.category.cat_name} - {product.part_no}</span>
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
                        <PhoneInput
                            country={"us"}
                            enableSearch
                             regions={['north-america', 'carribean']}
                            value={formData.phone}
                            onChange={(phone) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    phone,
                                }))
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

                    <button type="submit" className="quote-btn">
                        Request Quote
                    </button>
                </form>

                <p className="privacy">
                    For more information on how your data is processed and stored by PLC Automation please read our
                    <Link href="/privacy-policy"> Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
}