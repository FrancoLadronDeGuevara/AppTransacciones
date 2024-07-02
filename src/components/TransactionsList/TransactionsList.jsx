import {
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import { useSelector } from "react-redux";

import { toArgentinaTime } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import { useState } from "react";
import ModalEditTransaction from "./ModalEditTransaction";

function createData(id, amount, category, description, type, date) {
  return { id, amount, category, description, type, date };
}

const headStyle = {
  color: "white",
  fontWeight: "bolder !important",
};

const TransactionsList = () => {
  const { transactions } = useSelector((state) => state.transaction);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const rows = transactions.map((transaction) =>
    createData(
      transaction.id,
      transaction.amount,
      transaction.category,
      transaction.description,
      transaction.type,
      transaction.date
    )
  );

  return (
    <>
      {transactions.length === 0 ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Typography variant="h4" sx={{ color: "#333333" }}>
            No hay transacciones
          </Typography>
        </Container>
      ) : (
        <Container sx={{ py: 5, minHeight: "80vh", display: "flex", flexDirection: "column" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: "#01B591" }}>
                <TableRow>
                  <TableCell align="center" sx={headStyle}>
                    Tipo
                  </TableCell>
                  <TableCell align="center" sx={headStyle}>
                    Importe
                  </TableCell>
                  <TableCell align="center" sx={headStyle}>
                    Categoria
                  </TableCell>
                  <TableCell align="center" sx={headStyle}>
                    Fecha
                  </TableCell>
                  <TableCell align="center" sx={headStyle}>
                    Descripcion
                  </TableCell>
                  <TableCell align="center" sx={headStyle}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {row.type === "income" ? (
                        <Chip
                          label="Ingreso"
                          color="success"
                          sx={{ width: 65 }}
                        />
                      ) : (
                        <Chip label="Gasto" color="error" sx={{ width: 65 }} />
                      )}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 18 }}>
                      {formatPrice(row.amount)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold !important" }}
                    >
                      {row.category}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 120 }}>
                      {toArgentinaTime(row.date)}
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="subtitle2" sx={{ minWidth: 150 }}>
                        {row.description}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setSelectedTransaction(row);
                          setOpenModal(true);
                        }}
                        sx={{
                          backgroundColor: "#01B591",
                        }}
                      >
                        <ModeEditOutlineOutlinedIcon sx={{ color: "#fff" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Filas"
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ background: "#01B591", color: "white", mt: "auto", borderRadius: "0 0 10px 10px" }}
          />
          {openModal && (
            <ModalEditTransaction
              transaction={selectedTransaction}
              open={openModal}
              handleClose={() => setOpenModal(false)}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default TransactionsList;
