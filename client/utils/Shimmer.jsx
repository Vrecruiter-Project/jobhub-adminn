import './Shimmer.css';
import { TableRow, TableCell } from '@mui/material';

const ShimmerEffect = ({ effect }) => {  // Destructure effect here
    return (
        <>
            {Array(12).fill('').map((_, key) => (
                <TableRow key={key}>
                    {Array(effect).fill('').map((_, cellKey) => (
                        <TableCell key={cellKey}>
                            <div className="shimmer-item"></div>
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};

export default ShimmerEffect;
