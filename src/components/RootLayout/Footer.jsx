import { Container, Divider, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        color: "white",
        background:
          "linear-gradient(90deg, rgba(0,181,122,1) 0%, rgba(1,181,151,1) 100%)",
        pt: 2,
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
      }}
    >
      <Typography variant="h4" textAlign="center">
        Challenge App Transacciones - Curso React ADV 2024
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="subtitle2" textAlign="center">
        Franco Guevara - 2024
      </Typography>
    </Container>
  );
};

export default Footer;
