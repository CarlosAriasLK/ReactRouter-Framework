import { Link } from "react-router";
import type { Route } from "./+types/testingArgsPage";



export default function testingArgsPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-500 py-5">Texting args page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>

      <Link to='/auth/testing' className="text-blue-400 underline text-2xl">
        Testing
      </Link>
    </div>
  );
}