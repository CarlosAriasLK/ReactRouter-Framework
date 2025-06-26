import { Form, NavLink, useNavigation } from "react-router";
import type { Route } from "./+types/testingPage";
import { sleep } from "~/lib/sleep";

//* Actions y clientActions
export async function action({ request }: Route.ActionArgs) {
  await sleep(1000);
  const data = await request.formData();
  console.log('server side action')
  console.log({ data });

  return { ok: true, message: 'Todo bien' };
}

export async function clientAction({ serverAction }: Route.ClientActionArgs) {
  await sleep(1000);
  const data = await serverAction();
  return { message: 'hola mundo desde clientAction', data: data };
}


//* loader y clientLoader
export async function loader() {
  console.log('Hola desde serverLoader - Server')
  return { message: 'Hola desde serverLoader - Server' }
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  console.log('Hola desde clientLoader - Client')
  return { message: 'Hola desde clientLoader - Client', serverData: serverData };
}



export default function testingPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {

  const navigation = useNavigation();
  const isPosting = navigation.state === 'submitting';

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-500 py-5">Testing page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>


      <NavLink
        to='/auth/testingargs/ABC-123/juan/25'
        className={({ isPending }) => !isPending ? "text-blue-400 text-2xl underline" : "text-red-400 text-2xl underline"}
      >
        Testing Args
      </NavLink>


      <Form action="" className="mt-2 flex gap-2" method="post">
        <input type="text" className="border-2 border-black rounded-2xl" name="name" />
        <input type="text" className="border-2 border-black rounded-2xl" name="age" />
        <button
          type="submit"
          disabled={isPosting}
          className={`p-2.5 rounded bg-blue-400 ${isPosting ? "disabled:opacity-50" : ""}`}
        >
          {isPosting ? 'Submitting...' : 'Submit'}
        </button>
      </Form>

    </div>
  );
}