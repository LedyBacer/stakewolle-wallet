import WalletWidget from "@/components/wallet-widget";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          minHeight: "100vh",
          bgcolor: "#f4f4f4",
        }}
      >
        <WalletWidget />
      </Box>
    </main>
  );
}
