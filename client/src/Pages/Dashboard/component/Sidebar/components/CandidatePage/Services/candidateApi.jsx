import { useEffect, useState } from "react";
import { JOBHUB_BASE_URL } from "../../../../../../../api/api";
import PropTypes from "prop-types";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; // Import Button component
import { CompareArrows } from "@mui/icons-material";

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
            throw new Error("Failed to update user");
        }

        const updatedData = await response.json();
        return updatedData; // Return the updated data
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for handling in the component
    }
};

const Checks = ({ companyName, jobRole, numberOfPosition }) => {
    return (
        <>
            <div>
                <div>{companyName}</div>
                <div>{jobRole}</div>
                <div>{numberOfPosition}</div>
            </div>
        </>
    );
};

// Corrected PropTypes
Checks.propTypes = {
    companyName: PropTypes.string.isRequired,
    jobRole: PropTypes.string.isRequired,
    numberOfPosition: PropTypes.number.isRequired,
};

export const CompanyModal = ({ rowNumber }) => {
    const [companyList, setCompanyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]); // State to store selected rows

    useEffect(() => {
        getSpecific();
    }, []);

    // Fetch job data from the API
    async function getSpecific() {
        try {
            const response = await fetch(`${JOBHUB_BASE_URL}/v1/admins/alljobs`);
            const data = await response.json();

            if (data && Array.isArray(data.jobs)) {
                // Add a unique `id` to each job object
                const jobsWithId = data.jobs.map((job) => ({
                    ...job,
                    id: job._id, // Use job._id as a unique ID
                }));
                setCompanyList(jobsWithId);
            } else {
                console.error("Data.jobs is not an array:", data);
                setCompanyList([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    // Define columns for the DataGrid
    const columns = [
        { 
            field: 'companyName', 
            headerName: 'Company Name', 
            width: 250,
            headerAlign: 'center',
            align: 'center',
        },
        { 
            field: 'jobRole', 
            headerName: 'Job Role', 
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        { 
            field: 'numberOfPosition', 
            headerName: 'Number of Positions', 
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        { 
            field: 'jobLocation', 
            headerName: 'Job Location', 
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        { 
            field: 'salary', 
            headerName: 'Salary', 
            width: 150,
            headerAlign: 'center',
            align: 'center',
        },
    ];

    // Handler for row selection
    const handleRowSelection = (selectionModel) => {
        console.log("companyList:", companyList);
        console.log("selectionModel:", selectionModel);
    
        const selectedRowsData = selectionModel.map((id) => {
            const row = companyList.find((row) => row._id === id);
            console.log("Found row for id:", id, row);
            return row;
        });
    
        setSelectedRows(selectedRowsData);
    };

    // Handler for the Send button
    const handleSend = () => {
        console.log("Selected Rows:", selectedRows);
        console.log("Row Number:", rowNumber);
        // Add your logic here to process the selected rows (e.g., send data to an API)
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Paper style={{ height: 400, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
            <DataGrid
                rows={companyList}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                loading={loading}
                onSelectionModelChange={handleRowSelection} // Handle row selection
                sx={{
                    '& .MuiDataGrid-cell': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSend} // Handle the Send button click
                style={{ marginTop: '16px' }}
                disabled={selectedRows.length > 0} // Disable button if no rows are selected
            >
                Send Selected Rows
            </Button>
        </Paper>
    );
};
