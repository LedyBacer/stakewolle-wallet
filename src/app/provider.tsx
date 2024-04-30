"use client";

import { http, createConfig, WagmiProvider } from "wagmi";
import { bsc, mainnet, sepolia } from "wagmi/chains";
///import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Provider({ children }: { children: React.ReactNode }) {
  const config = createConfig({
    chains: [mainnet, sepolia, bsc],
    connectors: [],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [bsc.id]: http(),
    },
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
