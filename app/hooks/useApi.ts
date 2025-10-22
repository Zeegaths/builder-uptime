// hooks/useApi.ts
import { useEffect, useRef } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { apiClient } from '~/lib/api';

export function useApi() {
  const { authenticated, ready, getAccessToken } = usePrivy();
  const isSettingToken = useRef(false);

  useEffect(() => {
    const updateToken = async () => {
      if (!ready || isSettingToken.current) {
        return;
      }

      if (authenticated) {
        isSettingToken.current = true;
        try {
          const token = await getAccessToken();
          if (token) {
            apiClient.setToken(token);
            console.log('✅ Token set');
          }
        } catch (error) {
          console.error('❌ Failed to get token:', error);
        } finally {
          isSettingToken.current = false;
        }
      } else {
        apiClient.setToken(null);
      }
    };

    updateToken();
  }, [authenticated, ready]);

  return apiClient;
}