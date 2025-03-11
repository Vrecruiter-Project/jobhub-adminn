import * as XLSX from "xlsx";
import { capitalizeWords } from "./CapitalWord";
export const handleDownloadExcel = (userInfo) => {
  if (userInfo.length === 0) {
    alert("No data available to download.");
    return;
  }

  const data = userInfo.map((user, index) => ({
    S_No: index + 1,
    FullName: capitalizeWords(user.fullname),
    Email: user.email,
    Position: capitalizeWords(user.position),
    DOB: user.dob,
    PhoneNumber: user.number,
    Gender: capitalizeWords(user.gender),
    Address: capitalizeWords(user.address),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
  XLSX.writeFile(workbook, "CandidatesData.xlsx");
};