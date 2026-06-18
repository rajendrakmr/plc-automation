"use client";

import { useState } from "react";
import "@/app/css/job.opening.css"

/* ─── Types ─────────────────────────────────────────── */
type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
};

interface ApplyForm {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  coverLetter: string;
  resume: File | null;
}

/* ─── Data ──────────────────────────────────────────── */
const jobsData: Job[] = [
  {
    id: 1,
    title: "Marketing Intern",
    department: "Marketing",
    location: "Singapore",
    type: "Full-Time",
    description:
      "Support digital marketing, branding, and content creation initiatives.",
    responsibilities: [
      "Manage social media",
      "Create content",
      "Support campaigns",
    ],
    requirements: [
      "Marketing/Business student",
      "Creative mindset",
      "Basic design skills",
    ],
  },
  {
    id: 4,
    title: "Marketing Intern",
    department: "Marketing",
    location: "Singapore",
    type: "Full-Time",
    description:
      "Support digital marketing, branding, and content creation initiatives.",
    responsibilities: [
      "Manage social media",
      "Create content",
      "Support campaigns",
    ],
    requirements: [
      "Marketing/Business student",
      "Creative mindset",
      "Basic design skills",
    ],
  },
  {
    id: 5,
    title: "Marketing Intern",
    department: "Marketing",
    location: "Singapore",
    type: "Internship",
    description:
      "Support digital marketing, branding, and content creation initiatives.",
    responsibilities: [
      "Manage social media",
      "Create content",
      "Support campaigns",
    ],
    requirements: [
      "Marketing/Business student",
      "Creative mindset",
      "Basic design skills",
    ],
  },
  {
    id: 2,
    title: "Sales Engineer",
    department: "Sales",
    location: "Dubai",
    type: "Full-Time",
    description: "Drive sales growth and manage client relationships.",
  },
  {
    id: 3,
    title: "Automation Technician",
    department: "Operations",
    location: "Australia",
    type: "Full-Time",
    description: "Maintain and troubleshoot automation systems.",
  },
];

/* ─── Initial form state ────────────────────────────── */
const INITIAL_FORM: ApplyForm = {
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  coverLetter: "",
  resume: null,
};

/* ─── Apply Modal ───────────────────────────────────── */
function ApplyModal({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ApplyForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplyForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (field: keyof ApplyForm, value: string | File | null) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const clearErr = (field: keyof ApplyForm) =>
    setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });

  const validate = () => {
    const errs: Partial<Record<keyof ApplyForm, string>> = {};
    if (!form.fullName.trim()) errs.fullName = "Enter your full name";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errs.email = "Enter a valid email address";
    if (!form.resume) errs.resume = "Please attach your CV / resume";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900)); // replace with real API call
    setIsSubmitting(false);
    setSubmitted(true);
  };

  /* close on backdrop click */
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true">
      <div className="modal-box">

        {/* Header */}
        <div className="modal-header">
          <div>
            <p className="modal-eyebrow">Applying for</p>
            <h3 className="modal-title">{job.title}</h3>
            <div className="modal-meta">
              <span>📍 {job.location}</span>
              <span>🏢 {job.department}</span>
              <span className="job-type">{job.type}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Body */}
        {submitted ? (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h4>Application submitted!</h4>
            <p>
              Thanks, <strong>{form.fullName}</strong>. We'll review your application
              and get back to you at <strong>{form.email}</strong> within 5 business days.
            </p>
            <button className="apply-btn" onClick={onClose}>Done</button>
          </div>
        ) : (
          <div className="modal-body">
            <div className="modal-form-row">
              <div className="modal-field">
                <label>Full name *</label>
                <input
                  type="text"
                  placeholder="e.g. James Tan"
                  value={form.fullName}
                  className={errors.fullName ? "inp-err" : ""}
                  onChange={(e) => { set("fullName", e.target.value); clearErr("fullName"); }}
                />
                {errors.fullName && <span className="modal-err">{errors.fullName}</span>}
              </div>
              <div className="modal-field">
                <label>Email address *</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  className={errors.email ? "inp-err" : ""}
                  onChange={(e) => { set("email", e.target.value); clearErr("email"); }}
                />
                {errors.email && <span className="modal-err">{errors.email}</span>}
              </div>
            </div>

            <div className="modal-form-row">
              <div className="modal-field">
                <label>Phone number</label>
                <input
                  type="tel"
                  placeholder="+65 9123 4567"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>LinkedIn profile</label>
                <input
                  type="url"
                  placeholder="linkedin.com/in/yourname"
                  value={form.linkedin}
                  onChange={(e) => set("linkedin", e.target.value)}
                />
              </div>
            </div>

            {/* Resume upload */}
            <div className="modal-field" style={{ marginBottom: "12px" }}>
              <label>CV / Resume *</label>
              <label className={`resume-upload ${errors.resume ? "resume-upload--err" : ""}`}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    set("resume", file);
                    clearErr("resume");
                  }}
                />
                {form.resume ? (
                  <span className="resume-filename">📎 {form.resume.name}</span>
                ) : (
                  <span className="resume-placeholder">
                    <span className="resume-icon">⬆</span>
                    Click to upload PDF, DOC, or DOCX
                  </span>
                )}
              </label>
              {errors.resume && <span className="modal-err">{errors.resume}</span>}
            </div>

            {/* Cover letter */}
            <div className="modal-field">
              <label>Cover letter <span style={{ fontWeight: 400, color: "#9ca3af" }}>(optional)</span></label>
              <textarea
                rows={4}
                placeholder="Tell us why you'd be a great fit for this role..."
                value={form.coverLetter}
                onChange={(e) => set("coverLetter", e.target.value)}
              />
              <span className="modal-charcount">{form.coverLetter.length} / 800</span>
            </div>
          </div>
        )}

        {/* Footer */}
        {!submitted && (
          <div className="modal-footer">
            <button className="modal-cancel" onClick={onClose}>Cancel</button>
            <button
              className="apply-btn"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting…" : "Submit application →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────── */
export default function JobOpeningSection({ type }: { type: string }) {
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const jobs = jobsData.filter((j) => j.type === type);

  const renderJobs = (jobs: Job[]) =>
    jobs.map((job) => (
      <div className="cat-card" key={job.id}>
        <div className="job-top">
          <h3>{job.title}</h3>
          <span className="job-type">{job.type}</span>
        </div>

        <p className="job-desc">{job.description}</p>

        {job.responsibilities && (
          <div className="job-list">
            <h4>Responsibilities</h4>
            <ul>
              {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {job.requirements && (
          <div className="job-list">
            <h4>Requirements</h4>
            <ul>
              {job.requirements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="job-meta">
          <span>📍 {job.location}</span>
          <span>🏢 {job.department}</span>
        </div>

        <button className="apply-btn" onClick={() => setActiveJob(job)}>
          Apply Now →
        </button>
      </div>
    ));

  return (
    <>
      <section className="section_white_content">
        <div className="section_container section-inner">
          <div className="section-header">
            <div>
              <span className="section-tag">Job Opening</span>
              <h2 className="section-title">Full-Time Opportunities</h2>
              <p className="section-sub">
                Customer-facing sales roles for candidates who can bridge
                technical automation knowledge with commercial execution.
              </p>
            </div>
          </div>

          <div className="cats-grid">{renderJobs(jobs)}</div>
        </div>
      </section>

      {/* Modal — rendered outside the section so it overlays everything */}
      {activeJob && (
        <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />
      )}
    </>
  );
}