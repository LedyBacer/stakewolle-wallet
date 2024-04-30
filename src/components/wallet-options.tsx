import { useConnect } from "wagmi";
import { Button, Box, Typography } from "@mui/material";
import React from "react";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  console.log(connectors);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        mb: 2,
        mt: 2,
      }}
    >
      <Typography variant="inherit" sx={{ textAlign: "center", mb: 2 }}>
        Connect your Wallet:
      </Typography>
      {connectors.map((connector) => (
        <Button
          variant="contained"
          key={connector.uid}
          onClick={() => connect({ connector })}
          startIcon={
            connector.icon ? (
              <img src={connector.icon} alt={connector.name} />
            ) : (
              <></>
            )
          }
        >
          {connector.name}
        </Button>
      ))}
    </Box>
  );
}
