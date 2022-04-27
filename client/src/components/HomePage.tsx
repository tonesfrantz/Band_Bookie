import { Paper, TableContainer } from '@mui/material';

export function HomePage() {
    return (
        <>
            <h1>Welcome.</h1>
            <TableContainer
                sx={{
                    width: '90%',
                    margin: '30px',
                    padding: '20px',
                    height: '40%',
                    border: '2px solid black',
                }}
                component={Paper}>
                <p>
                    Hosting a wedding or event? Choose your favourite singer and
                    band size to make your event the special day you deserve.
                </p>
            </TableContainer>
        </>
    );
}
