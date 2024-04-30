"use client";
// components/WalletWidget.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useAccount } from "wagmi";
import { Account } from "@/components/account";
import { WalletOptions } from "@/components/wallet-options";

const WalletWidget: React.FC = () => {
  const { isConnected } = useAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        borderRadius: 2,
        maxWidth: 500,
        minWidth: 360,
        m: "auto",
        mt: 5,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Stakewolle Wallet
      </Typography>
      {!isClient ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : isConnected ? (
        <Account />
      ) : (
        <WalletOptions />
      )}
    </Paper>
  );
};

export default WalletWidget;
