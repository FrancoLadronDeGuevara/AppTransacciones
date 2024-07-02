import { Container, Paper, Tab, Tabs } from "@mui/material";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AddToHomeScreenOutlinedIcon from "@mui/icons-material/AddToHomeScreenOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const itemsList = [
  {
    value: 0,
    name: "Inicio",
    path: "/",
    icon: <PaymentsOutlinedIcon />,
  },
  {
    value: 1,
    name: "Transacciones",
    path: "/transactions",
    icon: <AddToHomeScreenOutlinedIcon />,
  },
  {
    value: 2,
    name: "Busqueda",
    path: "/search",
    icon: <SearchOutlinedIcon />,
  },
  {
    value: 3,
    name: "Resumen",
    path: "/summary",
    icon: <ReceiptLongOutlinedIcon />,
  },
];
const Navbar = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (location.pathname === "/") {
      setValue(0);
    } else if (location.pathname === "/transactions") {
      setValue(1);
    } else if (location.pathname === "/search") {
      setValue(2);
    } else if (location.pathname === "/summary") {
      setValue(3);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container
      disableGutters
      maxWidth="lg"
      component={Paper}
      sx={{
        background:
          "linear-gradient(90deg, rgba(0,181,122,1) 0%, rgba(1,181,151,1) 100%)",
        zIndex: 2,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            backgroundColor: "lightgreen",
            height: "4px",
          },
        }}
      >
        {itemsList.map((item, index) => (
          <Tab
            key={index}
            icon={
              <span
                style={{ color: value === item.value ? "lightgreen" : "#fff" }}
              >
                {item.icon}
              </span>
            }
            label={
              <span
                style={{ color: value === item.value ? "lightgreen" : "#fff" }}
              >
                {item.name}
              </span>
            }
            component={Link}
            to={item.path}
          />
        ))}
      </Tabs>
    </Container>
  );
};

export default Navbar;
