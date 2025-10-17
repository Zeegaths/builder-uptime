import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  
  // Critical: Handle Privy SSR issues
  ssr: {
    noExternal: ['@privy-io/react-auth', '@farcaster/miniapp-sdk'],
  },
  
  optimizeDeps: {
    include: ['@privy-io/react-auth'],
  },
});