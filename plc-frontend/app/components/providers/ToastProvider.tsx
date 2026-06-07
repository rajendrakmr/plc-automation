"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,

                style: {
                    borderRadius: "10px",
                    fontSize: "14px",
                    padding: "14px 16px",
                },

                success: {
                    style: {
                        border: "1px solid #4caf50",
                    },
                },

                error: {
                    style: {
                        border: "1px solid #f44336",
                    },
                },
            }}
        />
    );
}