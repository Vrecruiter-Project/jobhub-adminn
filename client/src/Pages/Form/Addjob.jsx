import React, { useState } from "react";

const JobForm = () => {
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    jobTitle: "",
    jobRole: "",
    numberOfPosition: "",
    jobType: "",
    workType: "",
    salary: "",
    benefits: "",
    jobLocation: "",
    ExpireJob: "",
    education: "",
    english: "",
    experience: "",
    gender: "",
    age: "",
    description: "",
    interviewMode: "",
    communication: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Convert benefits to an array
    const formattedJobDetails = {
      ...jobDetails,
      benefits: jobDetails.benefits.split(",").map((b) => b.trim()),
    };

    try {
      const response = await fetch("https://jobhub-project-official-1.onrender.com/api/v1/jobs/create-job-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDetails: formattedJobDetails }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Job created successfully!");
        setJobDetails({
          companyName: "",
          jobTitle: "",
          jobRole: "",
          numberOfPosition: "",
          jobType: "",
          workType: "",
          salary: "",
          benefits: "",
          jobLocation: "",
          ExpireJob: "",
          education: "",
          english: "",
          experience: "",
          gender: "",
          age: "",
          description: "",
          interviewMode: "",
          communication: "",
        });
      } else {
        setMessage(data.message || "Failed to create job.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Create a New Job</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input type="text" name="companyName" placeholder="Company Name" value={jobDetails.companyName} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="jobTitle" placeholder="Job Title" value={jobDetails.jobTitle} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="jobRole" placeholder="Job Role" value={jobDetails.jobRole} onChange={handleChange} className="border p-2 rounded" required />

        <input type="number" name="numberOfPosition" placeholder="Number of Positions" value={jobDetails.numberOfPosition} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="jobType" placeholder="Job Type" value={jobDetails.jobType} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="workType" placeholder="Work Type" value={jobDetails.workType} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="salary" placeholder="Salary" value={jobDetails.salary} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="benefits" placeholder="Benefits (comma separated)" value={jobDetails.benefits} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="jobLocation" placeholder="Job Location" value={jobDetails.jobLocation} onChange={handleChange} className="border p-2 rounded" required />

        <input type="date" name="ExpireJob" value={jobDetails.ExpireJob} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="education" placeholder="Education Requirement" value={jobDetails.education} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="english" placeholder="English Requirement" value={jobDetails.english} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="experience" placeholder="Experience" value={jobDetails.experience} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="gender" placeholder="Gender Requirement" value={jobDetails.gender} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="age" placeholder="Age Requirement" value={jobDetails.age} onChange={handleChange} className="border p-2 rounded" required />

        <textarea name="description" placeholder="Job Description" value={jobDetails.description} onChange={handleChange} className="border p-2 rounded col-span-2" required></textarea>

        <input type="text" name="interviewMode" placeholder="Interview Mode" value={jobDetails.interviewMode} onChange={handleChange} className="border p-2 rounded" required />

        <input type="text" name="communication" placeholder="Communication Requirement" value={jobDetails.communication} onChange={handleChange} className="border p-2 rounded" required />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded col-span-2" disabled={loading}>
          {loading ? "Submitting..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
