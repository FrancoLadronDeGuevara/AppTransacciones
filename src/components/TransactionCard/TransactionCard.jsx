import { Box, Container, Typography } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { formatPrice } from "../../utils/formatPrice";
import { toArgentinaTime } from "../../utils/formatDate";

const TransactionCard = ({ transaction }) => {
  return (
    <Container
      sx={{
        width: 300,
        p: 1,
        border: "1px solid #ccc",
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold !important",
            color: transaction.type === "income" ? "#008000" : "#ed0000",
          }}
        >
          {transaction.type === "income" ? "Ingreso" : "Gasto"}
        </Typography>
        {transaction.type === "income" ? (
          <KeyboardDoubleArrowUpIcon sx={{ color: "green", fontSize: 40 }}/>
        ) : (
          <KeyboardDoubleArrowDownIcon sx={{ color: "#ed0000", fontSize: 40 }}/>
        )}
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold !important",
          color: transaction.type === "income" ? "#00800099" : "#ed000099",
        }}
      >
        {formatPrice(transaction.amount)}
      </Typography>
      <Typography sx={{color: "gray"}}>{toArgentinaTime(transaction.date)}</Typography>
      <Typography sx={{ textTransform: "capitalize !important", fontWeight: "bold !important", color: "#333" }}>{transaction.category}</Typography>
      <Typography sx={{color: "gray"}}>{transaction.description}</Typography>
    </Container>
  );
};

export default TransactionCard;
