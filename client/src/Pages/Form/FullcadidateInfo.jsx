import { useEffect, useState } from "react";
import { JOBHUB_BASE_URL } from "../../api/api";
// import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { capitalizeWords } from "../Dashboard/component/Sidebar/components/CandidatePage/util/CapitalWord";
const CandidateCard = ({
    _id,
    fullname,
    email,
    position,
    dob,
    number,
    qualification,
    gender,
    address
}) => {

    let formattedDob = "";
    if (dob) {
        formattedDob = new Date(dob).toISOString().split('T')[0];
    }
    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="text-xl font-bold text-gray-800 mb-2">{capitalizeWords(fullname)}</div>
            <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Email:</span> {email}
            </div>
            <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Position:</span> {position}
            </div>
            <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Date of Birth:</span> {formattedDob}
            </div>
            <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Phone:</span> {number}
            </div>
            <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Qualification:</span> {qualification}
            </div>
            <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Gender:</span> {gender}
            </div>
            <div className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Address:</span> {address}
            </div>
        </div>
        </>
    )
};

CandidateCard.propTypes = {
    fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    qualification: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
};

export default function ShowCandidateInfo({canID}) {
    const [candidateCard, setCandidateCard] = useState([]);
    
    useEffect(() => {
        async function getCandidateFullInfo() {
            try {
                const response = await fetch(`${JOBHUB_BASE_URL}/candidates/getcandidates`,{
                    method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_SECRET_KEY,
          },
                });
                if (!response.ok) throw new Error("Failed to fetch candidates");
                const data = await response.json();
                setCandidateCard(data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        }
        getCandidateFullInfo();
    }, []);
    
    const fullCardInfo = candidateCard.filter(catalog => catalog._id === canID)
    return (
        <>
            {fullCardInfo.map((card, index) => (
                <CandidateCard {...card} key={index} />
            ))}
        </>
    );
}
