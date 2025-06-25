import { Link } from "react-router";
import type { Route } from "./+types/testingPage";


export async function loader() {
  return { message: 'Hola desde serverLoader - Server' }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  // call the server loader
  const serverData = await serverLoader();
  // And/or fetch data on the client
  // Return the data to expose through useLoaderData()
  return {
    message: 'Hola desde clientLoader - Client',
    serverData
  };
}

export default function testingPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-500 py-5">Testing page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>


      <Link to='/auth/testingargs' className="text-blue-400 underline text-2xl">
        Testing Args
      </Link>

    </div>
  );
}