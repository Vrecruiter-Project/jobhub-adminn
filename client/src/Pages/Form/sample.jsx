// import React, { useState } from "react";
// import {
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
//   Typography,
//   Box,
//   Paper,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// // Constants for job roles, types, etc.
// const JOB_ROLES = [
//   "TeleCaller",
//   "Document-Verification",
//   "Data_Entry",
//   "Web-Designer",
//   "Graphic-Designer",
//   "Web-Developer",
//   "Construction",
//   "Front-Office",
//   "Back-Office",
//   "House-Keeping",
//   "Delivery",
//   "Security-Guard",
//   "Hotel-Staff",
//   "Ware-House-Staff",
//   "Factory-Workers",
//   "Digital-Marketing",
//   "Content Writing",
//   "Seo (Search Engine Optimization)",
//   "Video-Editing",
//   "Photography",
//   "Photo Editing",
//   "Accounting",
//   "HR (Human Resources)",
//   "Electrical",
//   "Plumbing",
//   "Mechanical",
//   "Technical",
// ];

// const JOB_TYPES = ["Technical", "Non-Technical", "Others"];
// const WORK_TYPES = ["Work-From-Office", "Work-From-Home", "Work-From-Office/Work-From-Home"];
// const BENEFITS = ["Health Insurance", "Retirement Plans", "Paid Time Off","ESCI", "Provident Fund", "Flexible Working Hours"];
// const EDUCATION_LEVELS = ["10th Pass", "12th Pass", "Graduate", "Post Graduate", "Diploma Holder", "Other"];
// const ENGLISH_LEVELS = ["No English", "Basic English", "Good English", "Advanced English"];
// const EXPERIENCE_LEVELS = ["Any", "Experienced Only", "Freshers Only"];
// const GENDER_OPTIONS = ["Male", "Female", "Any"];
// const INTERVIEW_MODES = ["In-person", "Virtual"];
// const COMMUNICATION_OPTIONS = ["WhatsApp only", "Direct Call", "Email SMS", "SMS"];

// const JobForm = () => {
//   const [jobDetails, setJobDetails] = useState({
//     companyName: "",
//     jobTitle: "",
//     jobRole: "",
//     numberOfPosition: "",
//     jobType: "",
//     workType: "",
//     salary: "",
//     benefits: "",
//     jobLocation: "",
//     ExpireJob: "",
//     education: "",
//     english: "",
//     experience: "",
//     gender: "",
//     age: "",
//     description: "",
//     interviewMode: "",
//     communication: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     // If the field is "benefits", ensure the value is an array
//     if (name === "benefits") {
//       setJobDetails((prev) => ({
//         ...prev,
//         [name]: Array.isArray(value) ? value : [value], // Ensure value is always an array
//       }));
//     } else {
//       setJobDetails((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     const formattedJobDetails = {
//       ...jobDetails,
//       benefits: jobDetails.benefits
//     };

//     try {
//       const response = await fetch(
//         "https://jobhub-project-official-1.onrender.com/api/v1/jobs/create-job-admin",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ jobDetails: formattedJobDetails }),
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         setMessage({ type: "success", text: "Job created successfully!" });
//         setJobDetails({
//           companyName: "",
//           jobTitle: "",
//           jobRole: "",
//           numberOfPosition: "",
//           jobType: "",
//           workType: "",
//           salary: "",
//           benefits: "",
//           jobLocation: "",
//           ExpireJob: "",
//           education: "",
//           english: "",
//           experience: "",
//           gender: "",
//           age: "",
//           description: "",
//           interviewMode: "",
//           communication: "",
//         });
//       } else {
//         setMessage({ type: "error", text: data.message || "Failed to create job." });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setMessage({ type: "error", text: "Something went wrong." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const theme = createTheme({
//     palette: {
//       mode: "dark",
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         component={Paper}
//         sx={{
//           maxWidth: "800px",
//           margin: "15px",
//           padding: "24px",
//           backgroundColor: "background.paper",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Create a New Job
//         </Typography>
//         {message.text && (
//           <Alert severity={message.type} sx={{ mb: 2 }}>
//             {message.text}
//           </Alert>
//         )}
//         <form onSubmit={handleSubmit}>
//           <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
//             <TextField
//               name="companyName"
//               label="Company Name"
//               value={jobDetails.companyName}
//               onChange={handleChange}
//               required
//               fullWidth
//             />
//             <TextField
//               name="jobTitle"
//               label="Job Title"
//               value={jobDetails.jobTitle}
//               onChange={handleChange}
//               required
//               fullWidth
//             />
//             <FormControl fullWidth>
//               <InputLabel id="jobRole-label">Job Role</InputLabel>
//               <Select
//                 labelId="jobRole-label"
//                 name="jobRole"
//                 value={jobDetails.jobRole}
//                 onChange={handleChange}
//                 label="Job Role"
//                 required
//               >
//                 {JOB_ROLES.map((role) => (
//                   <MenuItem key={role} value={role}>
//                     {role}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               name="numberOfPosition"
//               label="Number of Positions"
//               value={jobDetails.numberOfPosition}
//               onChange={handleChange}
//               type="number"
//               required
//               fullWidth
//             />
//             <FormControl fullWidth>
//               <InputLabel id="jobType-label">Job Type</InputLabel>
//               <Select
//                 labelId="jobType-label"
//                 name="jobType"
//                 value={jobDetails.jobType}
//                 onChange={handleChange}
//                 label="Job Type"
//                 required
//               >
//                 {JOB_TYPES.map((type) => (
//                   <MenuItem key={type} value={type}>
//                     {type}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl fullWidth>
//               <InputLabel id="workType-label">Work Type</InputLabel>
//               <Select
//                 labelId="workType-label"
//                 name="workType"
//                 value={jobDetails.workType}
//                 onChange={handleChange}
//                 label="Work Type"
//                 required
//               >
//                 {WORK_TYPES.map((type) => (
//                   <MenuItem key={type} value={type}>
//                     {type}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               name="salary"
//               label="Salary"
//               value={jobDetails.salary}
//               onChange={handleChange}
//               type="number"
//               required
//               fullWidth
//               sx={{ gridColumn: "1 / -1" }}
//             />

//             <FormControl sx={{ gridColumn: "1 / -1" }}>
//             <InputLabel id="benefits-label">Benefits</InputLabel>
//             <Select
//               labelId="benefits-label"
//               name="benefits"
//               value={jobDetails.benefits}
//               onChange={handleChange}
//               label="Benefits"
//               required
              
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((value) => (
//                     <Box
//                       key={value}
//                       sx={{
//                         backgroundColor: "green",
//                         color: "primary.contrastText",
//                         borderRadius: "4px",
//                         padding: "4px 8px",
//                         fontSize: "0.875rem",
//                       }}
//                     >
//                       {value}
//                     </Box>
//                   ))}
//                 </Box>
//               )}
//             >
//               {BENEFITS.map((benefit) => (
//                 <MenuItem key={benefit} value={benefit}>
//                   {benefit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//             <TextField
//               name="jobLocation"
//               label="Job Location"
//               value={jobDetails.jobLocation}
//               onChange={handleChange}
//               required
//               fullWidth
//                       />
//                       <input type="date" name="ExpireJob" value={jobDetails.ExpireJob} onChange={handleChange} className="border p-2 rounded" required />

//             {/* <FormControl fullWidth>
//               <InputLabel id="education-label">Education Requirement</InputLabel>
//               <Select
//                 labelId="education-label"
//                 name="education"
//                 value={jobDetails.education}
//                 onChange={handleChange}
//                 label="Education Requhandle irement"
//                 required
//               >
//                 {EDUCATION_LEVELS.map((level) => (
//                   <MenuItem key={level} value={level}>
//                     {level}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl> */}
//             {/* <FormControl fullWidth>
//               <InputLabel id="english-label">English Requirement</InputLabel>
//               <Select
//                 labelId="english-label"
//                 name="english"
//                 value={jobDetails.english}
//                 onChange={handleChange}
//                 label="English Requirement"
//                 required
//               >
//                 {ENGLISH_LEVELS.map((level) => (
//                   <MenuItem key={level} value={level}>
//                     {level}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl> */}
//             <FormControl fullWidth>
//               <InputLabel id="experience-label">Total Experience Required</InputLabel>
//               <Select
//                 labelId="experience-label"
//                 name="experience"
//                 value={jobDetails.experience}
//                 onChange={handleChange}
//                 label="Total Experience Required"
//                 required
//               >
//                 {EXPERIENCE_LEVELS.map((exp) => (
//                   <MenuItem key={exp} value={exp}>
//                     {exp}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl fullWidth>
//               <InputLabel id="gender-label">Gender Requirement</InputLabel>
//               <Select
//                 labelId="gender-label"
//                 name="gender"
//                 value={jobDetails.gender}
//                 onChange={handleChange}
//                 label="Gender Requirement"
//                 required
//               >
//                 {GENDER_OPTIONS.map((gender) => (
//                   <MenuItem key={gender} value={gender}>
//                     {gender}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               name="age"
//               label="Age Requirement"
//               value={jobDetails.age}
//               onChange={handleChange}
//               type="number"
//               required
//               fullWidth
//             />
//             <TextField
//               name="description"
//               label="Job Description"
//               value={jobDetails.description}
//               onChange={handleChange}
//               multiline
//               rows={4}
//               required
//               fullWidth
//               sx={{ gridColumn: "1 / -1" }}
//             />
//             <FormControl fullWidth>
//               <InputLabel id="interviewMode-label">Interview Mode</InputLabel>
//               <Select
//                 labelId="interviewMode-label"
//                 name="interviewMode"
//                 value={jobDetails.interviewMode}
//                 onChange={handleChange}
//                 label="Interview Mode"
//                 required
//               >
//                 {INTERVIEW_MODES.map((mode) => (
//                   <MenuItem key={mode} value={mode}>
//                     {mode}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             {/* <FormControl fullWidth>
//               <InputLabel id="communication-label">Communication Requirement</InputLabel>
//               <Select
//                 labelId="communication-label"
//                 name="communication"
//                 value={jobDetails.communication}
//                 onChange={handleChange}
//                 label="Communication Requirement"
//                 required
//               >
//                 {COMMUNICATION_OPTIONS.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl> */}
//             <Button
//               type="submit"
//               variant="contained"
//               color="success"
//               disabled={loading}
//               sx={{ gridColumn: "1 / -1", mt: 2 }}
//             >
//               {loading ? <CircularProgress size={24} /> : "Create Job"}
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default JobForm;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

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

        <select type="text" value={jobDetails.jobRole} onChange={handleChange} name="jobRole"  className="border p-2 rounded" required >
          <option value="" disabled>Job Role</option>
        <option value="TeleCaller">TeleCaller</option>
  <option value="Document-Verification">Document-Verification</option>
  <option value="Data_Entry">Data_Entry</option>
  <option value="Web-Designer">Web-Designer</option>
  <option value="Graphic-Designer">Graphic-Designer</option>
  <option value="Web-Developer">Web-Developer</option>
  <option value="Construction">Construction</option>
  <option value="Front-Office">Front-Office</option>
  <option value="Back-Office">Back-Office</option>
  <option value="House-Keeping">House-Keeping</option>
  <option value="Delivery">Delivery</option>
  <option value="Security-Guard">Security-Guard</option>
  <option value="Hotel-Staff">Hotel-Staff</option>
  <option value="Ware-House-Staff">Ware-House-Staff</option>
  <option value="Factory-Workers">Factory-Workers</option>
  <option value="Digital-Marketing">Digital-Marketing</option>
  <option value="Content Writing">Content Writing</option>
  <option value="Seo (Search Engine Optimization)">Seo (Search Engine Optimization)</option>
  <option value="Video-Editing">Video-Editing</option>
  <option value="Photography">Photography</option>
  <option value="Photo Editing">Photo Editing</option>
  <option value="Accounting">Accounting</option>
  <option value="HR (Human Resources)">HR (Human Resources)</option>
  <option value="Electrical">Electrical</option>
  <option value="Plumbing">Plumbing</option>
  <option value="Mechanical">Mechanical</option>
  <option value="Technical">Technical</option>
        </select>
        {/* <input type="text" name="jobRole" placeholder="Job Role" value={jobDetails.jobRole} onChange={handleChange} className="border p-2 rounded" required /> */}

        <input type="number" name="numberOfPosition" placeholder="Number of Positions" value={jobDetails.numberOfPosition} onChange={handleChange} className="border p-2 rounded" required />

        <select name="jobType" value={jobDetails.jobType} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>

        <select name="workType" value={jobDetails.workType} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Work Type</option>
          <option value="On-Site">On-Site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <input type="text" name="salary" placeholder="Salary" value={jobDetails.salary} onChange={handleChange} className="border p-2 rounded" required />

        <select name="benefits" value={jobDetails.benefits} onChange={handleChange} className="border p-2 rounded" required>
        <option value="">Benefits</option>
        <option value="Health-Insurance">Health Insurance</option>
  <option value="Retirement-Plans">Retirement Plans</option>
  <option value="Paid-Time-Off">Paid Time Off</option>
  <option value="ESCI">ESCI</option>
  <option value="Provident-Fund">Provident Fund</option>
  <option value="Flexible-Working-Hours">Flexible Working Hours</option>
          
        </select>
        {/* <input type="text" name="benefits" placeholder="Benefits (comma separated)" value={jobDetails.benefits} onChange={handleChange} className="border p-2 rounded" required /> */}

        <input type="text" name="jobLocation" placeholder="Job Location" value={jobDetails.jobLocation} onChange={handleChange} className="border p-2 rounded" required />

        <input type="date" name="ExpireJob" value={jobDetails.ExpireJob} onChange={handleChange} className="border p-2 rounded" required />

        <select name="experience" value={jobDetails.experience} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-2 years">1-2 years</option>
          <option value="3+ years">3+ years</option>
        </select>

        <select name="gender" value={jobDetails.gender} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Any">Any</option>
        </select>

        <textarea name="description" placeholder="Job Description" value={jobDetails.description} onChange={handleChange} className="border p-2 rounded col-span-2" required></textarea>

        <select name="interviewMode" value={jobDetails.interviewMode} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Interview Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded col-span-2" disabled={loading}>
          {loading ? "Submitting..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};
export default JobForm