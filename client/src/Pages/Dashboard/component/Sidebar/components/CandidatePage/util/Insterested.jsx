import { StyledTableCell, StyledTableRow } from "./StyledComponents";

const Interested = ({ count,companyName,jobRole, students }) => {
  return (
      <>
      {
        students.map((student, idx) => (
          <StyledTableRow key={idx}>
            <StyledTableCell>{count}</StyledTableCell>
                <StyledTableCell>{jobRole}</StyledTableCell>
            <StyledTableCell>{companyName}</StyledTableCell>
            <StyledTableCell>
              {student.firstName} {student.lastName}
            </StyledTableCell>
            <StyledTableCell>{student.email}</StyledTableCell>
            <StyledTableCell>{student.mobileNumber}</StyledTableCell>
            <StyledTableCell>{student.dob}</StyledTableCell>
            <StyledTableCell>{student.gender}</StyledTableCell>
            <StyledTableCell>{student.qualification}</StyledTableCell>
            <StyledTableCell>{student.address}</StyledTableCell>
          </StyledTableRow>
        ))
      }
      </>
  );
};

export default Interested;