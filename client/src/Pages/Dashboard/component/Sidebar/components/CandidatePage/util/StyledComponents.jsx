import { styled } from "@mui/material/styles";
import { TableCell, TableRow } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4CAF50",
    color: theme.palette.common.white,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: "16px",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "12px",
    textAlign: "center",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const HoverIcon = styled('span')(({ theme }) => ({
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  padding: '5px',
  borderRadius: '4px',
}));

export const GreenHoverIcon = styled(HoverIcon)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'lightgrey',
    color: 'green',
  },
  marginRight: '20px',
}));

export const RedHoverIcon = styled(HoverIcon)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'lightgrey',
    color: 'red',
  },
}));