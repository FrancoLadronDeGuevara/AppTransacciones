import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/formatPrice";

function createData(amount, category, description, type) {
  return { amount, category, description, type };
}

const headStyle = {
  color: "white",
  fontWeight: "bolder !important",
};

const Summary = () => {
  const { transactions } = useSelector((state) => state.transaction);

  const rows = transactions.map((transaction) =>
    createData(
      transaction.amount,
      transaction.category,
      transaction.description,
      transaction.type
    )
  );

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

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
        <Container
          sx={{
            py: 5,
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }}>
              <TableHead sx={{ background: "#01B591" }}>
                <TableRow>
                  <TableCell align="center" sx={headStyle}>
                    Descripcion
                  </TableCell>
                  <TableCell align="center" sx={headStyle}>
                    Categoria
                  </TableCell>
                  <TableCell align="center" sx={headStyle}>
                    Gastos
                  </TableCell>
                  <TableCell align="center" sx={headStyle}>
                    Ingresos
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" sx={{ maxWidth: 50 }}>
                      <Typography variant="subtitle2">
                        {row.description}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold !important" }}
                    >
                      {row.category}
                    </TableCell>
                    <TableCell align="center">
                      {row.type === "income" ? null : (
                        <Typography sx={{ color: "#ed0000" }}>
                          {formatPrice(row.amount)}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.type === "income" ? (
                        <Typography sx={{ color: "green" }}>
                          {formatPrice(row.amount)}
                        </Typography>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                    sx={{ fontWeight: "bold !important", fontSize: 20 }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold !important", color: "#ed0000" }}
                  >
                    {formatPrice(totalExpense)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold !important", color: "green" }}
                  >
                    {formatPrice(totalIncome)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  );
};

export default Summary;
