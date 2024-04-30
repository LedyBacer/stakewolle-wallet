import {
  useAccount,
  useBalance,
  useChainId,
  useDisconnect,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from "wagmi";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { parseEther } from "viem";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();
  const chainId = useChainId();
  const balance = useBalance({
    address,
    chainId,
  });
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const { data: hash, sendTransaction, isPending } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const to = recipientAddress as `0x${string}`;
    const value = amount as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
        {chains.map((chain) => (
          <Grid item key={chain.id}>
            <Button
              variant="contained"
              color={chainId === chain.id ? "primary" : "inherit"}
              onClick={() => switchChain({ chainId: chain.id })}
            >
              {chain.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Typography sx={{ mb: 1 }} noWrap>
        Address: {address}
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Balance: {balance.data?.symbol} {balance.data?.formatted}
      </Typography>
      <form onSubmit={submit}>
        <TextField
          fullWidth
          label="Recipient Address"
          variant="outlined"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Amount to Send"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress color="inherit" />
          ) : (
            "Send Transaction"
          )}
        </Button>
      </form>
      {hash && (
        <Typography sx={{ mb: 1 }} noWrap>
          Transaction Hash: {hash}
        </Typography>
      )}
      {isConfirming && (
        <Typography sx={{ mb: 1 }}>Waiting for confirmation...</Typography>
      )}
      {isConfirmed && (
        <Typography sx={{ mb: 1 }} color="green">
          Transaction confirmed!
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => disconnect()} color="error" size="small">
          Disconnect
        </Button>
      </Box>
    </>
  );
}
