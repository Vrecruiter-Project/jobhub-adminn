import { JOBHUB_BASE_URL } from "../../../../../../../api/api";


export const updateCandidate = async (updatedUser) => {
    try {
        const response = await fetch(`${JOBHUB_BASE_URL}/candidates/updatecandidate/${updatedUser._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
            alert("fill all the fields");
            // throw new Error("Failed to update user");
        }

        const updatedData = await response.json();
        return updatedData; // Return the updated data
    } catch (error) {
        console.error(error);
        throw error;
    }
};

