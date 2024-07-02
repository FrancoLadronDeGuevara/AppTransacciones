import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  deleteTransaction,
  editTransaction,
} from "../../redux/slices/transactionSlice";
import { autoCloseAlert, customAlert } from "../../utils/alerts";
import { useState } from "react";
import { handleError } from "../../utils/handleInputError";
import { regexAmount, regexDescription } from "../Home/Home";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "thin solid #000",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

const ModalEditTransaction = ({ transaction, open, handleClose }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(transaction.amount);
  const [amountError, setAmountError] = useState(false);
  const [category, setCategory] = useState(transaction.category);
  const [description, setDescription] = useState(transaction.description);
  const [descriptionError, setDescriptionError] = useState(false);
  const [type, setType] = useState(transaction.type);

  const handleSaveTransaction = () => {
    if (amount === 0) {
      setAmountError(true);
    }
    if (!amount || !category || !description || !type) {
      return autoCloseAlert("Todos los campos son obligatorios", "error");
    }
    const newTransaction = {
      id: transaction.id,
      amount,
      category,
      description,
      type,
    };

    dispatch(editTransaction(newTransaction));
    handleClose();
    autoCloseAlert("Transacción actualizada con exito", "success");
  };

  const handleDeleteTransaction = () => {
    customAlert("¿Deseas eliminar esta transacción?", () => {
      dispatch(deleteTransaction(transaction.id));
      handleClose();
      autoCloseAlert("Transacción eliminada con exito", "success");
    });
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <CloseIcon
          onClick={handleClose}
          sx={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
        />

        <Typography
          variant="subtitle2"
          textAlign="center"
          sx={{ fontWeight: "bolder !important" }}
        >{`Editar transacción N°: ${transaction.id}`}</Typography>
        <FormControl sx={{ my: 1 }} fullWidth>
          <FormLabel id="radio-group">Tipo de transacción</FormLabel>
          <RadioGroup
            name="radio-group"
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
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

        <TextField
          label="Importe"
          variant="standard"
          size="small"
          onChange={(e) =>
            handleError(e, setAmount, setAmountError, regexAmount)
          }
          fullWidth
          sx={{ my: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          inputProps={{ maxLength: 9 }}
          value={amount}
          error={amountError}
          color={amountError ? "" : "success"}
          helperText={amountError ? "Monto no valido" : ""}
        />

        <FormControl fullWidth sx={{ my: 2 }} size="small">
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
          size="small"
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
        <Box>
          <Button
            onClick={handleSaveTransaction}
            disabled={
              amount == transaction.amount &&
              type == transaction.type &&
              category == transaction.category &&
              description == transaction.description
            }
            variant="contained"
            sx={{ width: "100%", my: 2, backgroundColor: "#01B591" }}
          >
            Guardar
          </Button>
          <Button
            onClick={handleDeleteTransaction}
            variant="contained"
            sx={{ width: "100%", backgroundColor: "#ed0000" }}
          >
            Eliminar transacción
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEditTransaction;
