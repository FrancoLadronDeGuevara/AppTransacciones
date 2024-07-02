import {
  Box,
  IconButton,
  Divider,
  Grid,
  InputBase,
  Paper,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Stack,
  Pagination,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import TransactionCard from "../TransactionCard/TransactionCard";

const Search = () => {
  const { transactions } = useSelector((state) => state.transaction);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [description, setDescription] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("Todas las categorías");
  const [page, setPage] = useState(1);

  const categoryList = [
    "Todas las categorías",
    "Alimentos",
    "Compras",
    "Servicios",
    "Transporte",
    "Varios",
  ];

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    filterTransactions();
  }, [transactions, description, sortBy, category]);
  const filterTransactions = () => {
    let filtered = [...transactions];

    if (description) {
      filtered = filtered.filter((transaction) =>
        transaction.description
          .toLowerCase()
          .includes(description.toLowerCase())
      );
    }

    if (category !== "Todas las categorías") {
      filtered = filtered.filter(
        (transaction) => transaction.category === category
      );
    }

    if (sortBy === "lowerAmount") {
      filtered = filtered.sort((a, b) => a.amount - b.amount);
    } else if (sortBy === "higherAmount") {
      filtered = filtered.sort((a, b) => b.amount - a.amount);
    }

    setFilteredTransactions(filtered);
    setPage(1);
  };

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
        <Grid container maxWidth="lg" sx={{ mx: "auto", minHeight: 500 }}>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              backgroundColor: "#00B580",
              p: 1,
              color: "#fff",
            }}
          >
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Buscar por...</Typography>
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: 40,
                  mt: 1,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Descripcion..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  inputProps={{ maxLength: 100 }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton disabled>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Box>
            <Divider sx={{ mt: 5, backgroundColor: "#f2f2f2" }} />
            <Box sx={{ my: 5 }}>
              <Typography variant="subtitle1">Ordenar por...</Typography>
              <FormControl>
                <RadioGroup
                  name="sortedBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <FormControlLabel
                    value="lowerAmount"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#333",
                          },
                        }}
                      />
                    }
                    label="Menor importe"
                  />
                  <FormControlLabel
                    value="higherAmount"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#333",
                          },
                        }}
                      />
                    }
                    label="Mayor importe"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Divider sx={{ mt: 5, backgroundColor: "#f2f2f2" }} />
            <Box sx={{ my: 5 }}>
              <Typography variant="subtitle1">Filtrar por...</Typography>
              <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                <Select
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        width: 200,
                        maxHeight: 300,
                      },
                    },
                  }}
                  sx={{ backgroundColor: "#f2f2f2" }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categoryList.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            sx={{ p: 1, display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
                mt: 2,
              }}
            >
              {filteredTransactions.length > 0 ? (
                filteredTransactions
                  .slice((page - 1) * 6, page * 6)
                  .map((transaction) => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))
              ) : (
                <Typography variant="h6" sx={{ mt: 2 }}>
                  No se encontraron descripciones que coincidan con : &quot;
                  {description}&quot;
                </Typography>
              )}
            </Box>
            <Stack spacing={2} sx={{ my: 2, alignSelf: "end", mt: "auto" }}>
              <Typography>Página: {page}</Typography>
              <Pagination
                count={Math.ceil(filteredTransactions.length / 6)}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Search;
