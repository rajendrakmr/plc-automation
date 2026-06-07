"use client";

type Job = {
    id: number;
    title: string;
    department: string;
    location: string;
    type: any
    description: string;
    responsibilities?: string[];
    requirements?: string[];
};

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
        description:
            "Drive sales growth and manage client relationships.",
    },
    {
        id: 3,
        title: "Automation Technician",
        department: "Operations",
        location: "Australia",
        type: "Full-Time",
        description:
            "Maintain and troubleshoot automation systems.",
    },
];

export default function JobOpeningSection({ type }: { type: string }) {
    const fullTimeJobs = jobsData.filter((j) => j.type === type);
    const internJobs = jobsData.filter((j) => j.type === type);

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

                <button className="apply-btn">Apply Now →</button>
            </div>
        ));

    return (
        <section className="section_white_content">
            <div className="section_container section-inner">
                <div className="section-header">
                    <div>
                        <span className="section-tag">
                            Job Opening
                        </span>
                        <h2 className="section-title">
                            Full-Time Opportunities
                        </h2>
                        <p className="section-sub">
                            Customer-facing sales roles for candidates who can bridge technical automation knowledge with commercial execution.
                        </p>
                    </div>
                </div>



                <div className="cats-grid">

                    {renderJobs(fullTimeJobs)} 
                </div>
            </div>
        </section>
    );
}



// <section className="jobs-section">
//   <div className="jobs-inner">

//     {/* HEADER */}
//     <div className="jobs-header">
//       <h2>Careers at PLC Automation Group</h2>
//       <p>Explore opportunities to grow with our global team.</p>
//     </div>

//     {/* FULL TIME */}
//     <div className="job-group">
//       <h3 className="job-group-title">Full-Time Opportunities</h3>
//       <div className="jobs-grid">
//         {renderJobs(fullTimeJobs)}
//       </div>
//     </div>

//     {/* INTERNSHIPS */}
//     <div className="job-group">
//       <h3 className="job-group-title">Internship Opportunities</h3>
//       <div className="jobs-grid">
//         {renderJobs(internJobs)}
//       </div>
//     </div>

//   </div>
// </section>