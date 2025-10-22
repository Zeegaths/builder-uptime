import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { apiClient } from 'lib/api';

export function useApi() {
  const { authenticated, ready, getAccessToken } = usePrivy();

  useEffect(() => {
    const updateToken = async () => {
      if (!ready) return;

      if (authenticated) {
        try {
          const token = await getAccessToken();
          if (token) {
            apiClient.setToken(token);
          }
        } catch (error) {
          console.error('Failed to get access token:', error);
        }
      }
    };

    updateToken();
  }, [authenticated, getAccessToken]);

  return apiClient;
}