import { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import { JOBHUB_BASE_URL } from "../../../../../../../api/api";

const User = ({ gender }) => {
    return (
        <>
            <div>{gender}</div>
        </>
    );
};


User.propTypes = {
    gender: PropTypes.string.isRequired
};

const Vector = () => {
    const [vector, setVector] = useState([]);

    useEffect(() => {
        async function getUserInfo() {
            try {
                const response = await fetch(`${JOBHUB_BASE_URL}/candidates/getcandidates`);
                const data = await response.json();
                setVector(data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        }
        getUserInfo();
    }, []);

    return (
        <>
            {vector.map((user, index) => (
                <User key={index} gender={user.gender} />
            ))}
        </>
    );
};

export default Vector;