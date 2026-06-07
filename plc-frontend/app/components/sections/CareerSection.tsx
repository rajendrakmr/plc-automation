"use client";

import { useState } from "react";

export default function CareerSection() {
    const [fileName, setFileName] = useState("");

    return (
        <section className="career-pro-section">
            <div className="career-pro-inner">

                {/* LEFT SIDE */}
                <div className="career-pro-left">
                    <span className="career-tag">Future Opportunities</span>
                    <h2>Don't See a Suitable Role?</h2>

                    <p>
                        If you're interested in joining PLC Automation Group but don't see a position that matches your profile, we'd still love to hear from you.

                        You are welcome to submit your CV for future opportunities, and our team will reach out if a suitable role becomes available.
                    </p>

                    {/* STATS */}
                    <div className="career-stats">
                        <div>
                            <h3>10+</h3>
                            <span>Years Experience</span>
                        </div>
                        <div>
                            <h3>500+</h3>
                            <span>Global Clients</span>
                        </div>
                        <div>
                            <h3>24/7</h3>
                            <span>Support</span>
                        </div>
                    </div>

                    {/* BENEFITS */}
                    <div className="career-benefits">
                        <div>✔ Competitive Salary</div>
                        <div>✔ International Exposure</div>
                        <div>✔ Learning & Development</div>
                        <div>✔ Innovative Projects</div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="career-pro-card">
                    <h3>Submit Your CV</h3>
                    <p className="section-sub-title">Fill in your details below. We'll open your email app with the application draft so you can send it straight to our team.</p>

                    <form className="career-pro-form">
                        <div className="grid-2">
                            <input type="text" placeholder="Full Name" required />
                            <input type="email" placeholder="Email Address" required />
                        </div>

                        <input type="text" placeholder="Position Applied For" />

                        {/* Custom File Upload */}
                        <div className="file-upload-pro">
                            <label>Upload Resume</label>

                            <div className="upload-box">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) =>
                                        setFileName(e.target.files?.[0]?.name || "")
                                    }
                                />
                                <div className="upload-ui">
                                    📄
                                    <span>
                                        {fileName ? fileName : "Click or drag file to upload"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <textarea placeholder="Message" rows={4}></textarea>

                        <button type="submit">Submit Application</button>
                    </form>
                </div>

            </div>
        </section>
    );
}