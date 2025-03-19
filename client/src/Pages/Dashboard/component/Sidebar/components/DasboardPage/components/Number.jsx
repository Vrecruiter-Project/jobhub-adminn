import { useState, useEffect } from "react";
import { JOBHUB_BASE_URL } from "../../../../../../../api/api";

const useFetchCounts = () => {
    const [numCompany, setNumCompany] = useState([]);
    const [numCandidate, setNumCandidate] = useState([]);

    useEffect(() => {
        const getCompanyNum = async () => {
            try {
                const response = await fetch(`${JOBHUB_BASE_URL}/v1/admins/alljobs`);
                if (!response.ok) throw new Error("Failed to fetch jobs");
                const json = await response.json();
                setNumCompany(json.jobs || []);
            } catch (error) {
                console.error(error);
                alert("Failed to load jobs, please try again later.");
            }
        };

        const getUserNum = async () => {
            try {
                const response = await fetch(`${JOBHUB_BASE_URL}/candidates/getcandidates`);
                if (!response.ok) throw new Error("Failed to fetch candidates");
                const data = await response.json();
                setNumCandidate(data.reverse());
            } catch (error) {
                console.error(error);
                alert("Failed to load candidates, please try again later.");
            }
        };

        getCompanyNum();
        getUserNum();
    }, []);

    return {
        totalCount: numCompany.length,
        totalCandidateNum: numCandidate.length,
    };
};

export default useFetchCounts;