import { Navigate, redirect } from "react-router";
import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

//? Primero se carga en el lado del servidor, sino está autenticado, nisiquiera se muestra en el lado del cliente
export async function Loader () {
  return redirect('/chat');
}

export default function Home() {
  return <Navigate to='/chat' />;
}
