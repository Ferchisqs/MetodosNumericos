import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({ rows, raiz }) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '250px' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Iteración</StyledTableCell>
            <StyledTableCell align="right">xa</StyledTableCell>
            <StyledTableCell align="right">xb</StyledTableCell>
            <StyledTableCell align="right">x</StyledTableCell>
            <StyledTableCell align="right">fxp</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((iteration, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{iteration.iteracion}</StyledTableCell>
              <StyledTableCell align="right">{iteration.xa}</StyledTableCell>
              <StyledTableCell align="right">{iteration.xb}</StyledTableCell>
              <StyledTableCell align="right">{iteration.x}</StyledTableCell>
              <StyledTableCell align="right">{iteration.fxp}</StyledTableCell>
            </StyledTableRow>
          ))}
          {raiz && (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Raíz
              </StyledTableCell>
              <StyledTableCell align="right" colSpan={4}>{raiz}</StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
