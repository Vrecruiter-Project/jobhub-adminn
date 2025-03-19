import { JOBHUB_BASE_URL } from "../../../../../../../api/api";
export const upCompany = async (updatedCompany) => {
  try {
    const response = await fetch(`${JOBHUB_BASE_URL}/v1/jobs/update-job/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId: updatedCompany._id,
        jobTitle: updatedCompany.jobTitle,
        jobRole: updatedCompany.jobRole,
        numberOfPosition: updatedCompany.numberOfPosition,
        companyName: updatedCompany.companyName,
        jobLocation: updatedCompany.jobLocation,
        experience: updatedCompany.experience,
        salary: updatedCompany.salary,
        english: updatedCompany.english,
        students: updatedCompany.students,
        benefits: updatedCompany.benefits,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update company");
    }

    const updatedData = await response.json();
    return updatedData; // Return the updated data
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};