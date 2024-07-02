import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { handleError } from "../../utils/handleInputError";
import { autoCloseAlert } from "../../utils/alerts";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/slices/transactionSlice";

export const regexAmount = /^(?!0)\d{1,9}$/;
export const regexDescription = /^[\w\s.,-]{5,100}$/;

const Home = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount === 0) {
      setAmountError(true);
    }

    if (!amount || !category || !description || !type) {
      return autoCloseAlert("Todos los campos son obligatorios", "error");
    }

    const date = new Date().toISOString();

    const newTransaction = {
      id: Date.now(),
      amount,
      category,
      description,
      type,
      date: date,
    };

    dispatch(addTransaction(newTransaction));
    autoCloseAlert("Transacción agregada con exito", "success");

    setAmount(0);
    setCategory("");
    setDescription("");
    setType("");
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          my: 2,
          fontWeight: "bold !important",
          color: "#333",
        }}
      >
        Nueva transacción
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Importe"
          variant="standard"
          onChange={(e) =>
            handleError(e, setAmount, setAmountError, regexAmount)
          }
          fullWidth
          sx={{ my: 2 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          inputProps={{ maxLength: 9 }}
          value={amount}
          error={amountError}
          color={amountError ? "" : "success"}
          helperText={amountError ? "Monto no valido" : ""}
        />

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Seleccionar categoria</InputLabel>
          <Select
            value={category}
            label="Seleccionar categoria"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="Alimentos">Alimentos</MenuItem>
            <MenuItem value="Compras">Compras</MenuItem>
            <MenuItem value="Servicios">Servicios</MenuItem>
            <MenuItem value="Transporte">Transporte</MenuItem>
            <MenuItem value="Varios">Varios</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Descripcion"
          variant="outlined"
          value={description}
          onChange={(e) =>
            handleError(
              e,
              setDescription,
              setDescriptionError,
              regexDescription
            )
          }
          fullWidth
          error={descriptionError}
          color={descriptionError ? "" : "success"}
          helperText={
            descriptionError
              ? "La descripción debe ser de 5 a 100 caracteres"
              : ""
          }
          inputProps={{ maxLength: 100 }}
        />

        <FormControl sx={{ my: 2 }}>
          <FormLabel id="radio-group">Tipo de transacción</FormLabel>
          <RadioGroup
            name="radio-group"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <FormControlLabel
              value="income"
              control={<Radio />}
              label="Ingreso"
            />
            <FormControlLabel
              value="expense"
              control={<Radio />}
              label="Gasto"
            />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            my: 3,
            background:
              "linear-gradient(90deg, rgba(0,181,122,1) 0%, rgba(1,181,151,1) 100%)",
            width: 300,
            ml: "auto",
            fontWeight: "bold !important",
          }}
          type="submit"
        >
          Enviar
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
