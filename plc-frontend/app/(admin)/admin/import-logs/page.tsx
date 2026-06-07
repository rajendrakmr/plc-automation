"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type ImportLogForm = {
    productName: string;
    sku: string;
    category: string;
    quantity: string;
    supplier: string;
    invoiceNo: string;
    date: string;
    notes: string;
    file: File | null;
};

export default function ImportLogs() {
    const [form, setForm] = useState<ImportLogForm>({
        productName: "",
        sku: "",
        category: "",
        quantity: "",
        supplier: "",
        invoiceNo: "",
        date: "",
        notes: "",
        file: null,
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            file: e.target.files?.[0] || null,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div id="tab-products">
            <div className="importLogs_container">
                <h2 className="importLogs_title">Import Logs</h2>
                <form className="importLogs_form">

                    <input className="importLogs_input" type="date" />


                    <button className="importLogs_button importLogs_full">
                        Download Admin Logs
                    </button>
                </form>
            </div>
        </div>
    );
}