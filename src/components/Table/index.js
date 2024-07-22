import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function AccessibleTable({ title, header, data, actionButton }) {
  const newData = React.useMemo(() => {
    return data.map((row, index) => (
      {
        ...row,
        total: row.price * row.volume,
        total_done: (row.price_done || 0) * row.volume,
        action:
          row.status && row.status === 'NEW' ? 
            (
              <Button onClick={() => actionButton(index)} color="secondary" size="medium" variant="contained" >
                Cancel
              </Button>
            )
            :
            null
      }
    ))
  }, [data, actionButton])
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        {
          newData && newData.length && newData.length > 0 ? <></> : <caption>No Data</caption>
        }
        
        <TableHead>
          <TableRow>
            {
              header && header.map((row) => (
                <TableCell key={`${title}${row.id}`} align={row.align || 'right'}>{row.label}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {newData && newData.map((row, index) => (
            <TableRow key={row.name}>
              {
                header && header.map((rowHeader) => (
                  <TableCell key={`${title}-data-${index}-${rowHeader.id}`} align={rowHeader.align || 'right'}>{row[rowHeader.id]}</TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
