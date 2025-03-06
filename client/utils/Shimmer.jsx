import './Shimmer.css';
import { TableRow, TableCell } from '@mui/material';

const ShimmerEffect = () => {
    return (
        <>
            {Array(12).fill('').map((_, key) => (
                <TableRow key={key}>
                    {Array(7).fill('').map((_, cellKey) => (
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