import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AppliedjobsTable = () => {


  function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }
  



    const rows = [
        createData('Software engineer','Microsoft','Selected','18-03-2005'),
        createData('Software engineer','Microsoft','Selected','18-03-2005'),
        createData('Software engineer','Microsoft','Selected','18-03-2005'),
        createData('Software engineer','Microsoft','Selected','18-03-2005')
            ];




  return (
    <>
    <div className="table">
    <h1 className='header'>Applied jobs :</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Job role </TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
   
    </>
  )
}

export default AppliedjobsTable