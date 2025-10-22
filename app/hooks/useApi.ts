import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { apiClient } from 'lib/api';

export function useApi() {
  const { authenticated, ready, getAccessToken } = usePrivy();

  useEffect(() => {
    const updateToken = async () => {
      console.log('🔑 useApi effect:', { ready, authenticated });

      if (!ready) {
        console.log('⏳ Privy not ready, skipping token update');
        return;
      }

      if (authenticated) {
        try {
          const token = await getAccessToken();
          if (token) {
            apiClient.setToken(token);
            console.log('✅ Token set successfully');
          } else {
            console.log('⚠️ No token received from Privy');
          }
        } catch (error) {
          console.error('❌ Failed to get access token:', error);
        }
      } else {
        apiClient.setToken(null);
        console.log('🔓 Token cleared (not authenticated)');
      }
    };

    updateToken();
  }, [authenticated, ready, getAccessToken]);

  return apiClient;
}
