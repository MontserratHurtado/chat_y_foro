import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Esto permite que se acceda desde otras IPs en la red
    port: 3000, // Puedes cambiar el puerto si es necesario
  },
});