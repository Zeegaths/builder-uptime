import { useState, useEffect } from 'react';
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { sepolia } from 'viem/chains';
import { createBundlerClient } from 'viem/account-abstraction';
import { Implementation, toMetaMaskSmartAccount } from '@metamask/delegation-toolkit';
import { useWallets } from '@privy-io/react-auth';

export default function useMetaMaskSmartAccount() {
  const { wallets } = useWallets();
  const [smartAccount, setSmartAccount] = useState(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState(null);

  // Get the connected wallet from Privy
  const connectedWallet = wallets[0];

  useEffect(() => {
    if (!connectedWallet) return;

    const setupSmartAccount = async () => {
      try {
        setIsCreatingAccount(true);
        setError(null);

        // 1. Set up Public Client
        const publicClient = createPublicClient({
          chain: sepolia,
          transport: http(),
        });

        // 2. Set up Bundler Client
        // Replace with your actual bundler RPC URL
        const bundlerClient = createBundlerClient({
          client: publicClient,
          transport: http(process.env.NEXT_PUBLIC_BUNDLER_RPC_URL || 'https://bundler.biconomy.io/api/v2/11155111/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44'),
        });

        // 3. Get the wallet provider from Privy
        const provider = await connectedWallet.getEthereumProvider();
        
        // 4. Create wallet client
        const walletClient = createWalletClient({
          chain: sepolia,
          transport: custom(provider),
        });

        // Get accounts
        const [address] = await walletClient.getAddresses();

        // 5. Create MetaMask Smart Account (Hybrid implementation)
        const account = await toMetaMaskSmartAccount({
          client: publicClient,
          implementation: Implementation.Hybrid,
          deployParams: [address, [], [], []],
          deploySalt: '0x',
          signer: {
            account: {
              address,
              type: 'json-rpc',
            },
            client: walletClient,
          },
        });

        setSmartAccount({
          account,
          publicClient,
          bundlerClient,
          eoaAddress: address,
          smartAccountAddress: account.address,
        });
      } catch (err) {
        console.error('Error creating smart account:', err);
        setError(err.message);
      } finally {
        setIsCreatingAccount(false);
      }
    };

    setupSmartAccount();
  }, [connectedWallet]);

  return {
    smartAccount,
    isCreatingAccount,
    error,
  };
}