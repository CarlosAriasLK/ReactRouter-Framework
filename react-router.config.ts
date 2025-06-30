import type { Config } from "@react-router/dev/config";

// Genera un arreglo de 150 objetos con id (1-151), nombre y edad aleatorios
const users = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1;
  const names = ["Ana", "Luis", "Sofía", "Carlos", "María", "Pedro", "Lucía", "Javier"];
  const name = names[Math.floor(Math.random() * names.length)];
  const age = Math.floor(Math.random() * 60) + 18;
  return `auth/testingargs/${id}/${name}/${age}`;
});




export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,

  async prerender() {
    return [
      "/auth/login", 
      "/auth/register", 
      "/auth/testing",
    
      //Productos
      '/productos/iphone',
      '/productos/macbook',
      '/productos/airpods',
      '/productos/apple-watch',

      // Clientes
      ...users
    ];
  },

} satisfies Config;
