import { Link } from "react-router";
import type { Route } from "./+types/testingArgsPage";
import { sleep } from "~/lib/sleep";

//? Metadatos: Se pueden crear aqui o dentro del componente
export function meta() {
  return [
    { title: "Very cool app" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}

//? Cabeceras HTTP para respuestas SSR (server side rendering).
export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}


//? Cosas que queremos que sean precargadas
export function links() {
  return [
    /* {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: "https://example.com/some/styles.css",
    },
    {
      rel: "preload",
      href: "/images/banner.jpg",
      as: "image",
    }, */
  ];
}

//* Loader, clientLoader
export async function loader({ params }: Route.LoaderArgs ) {
  await sleep(1500);
  console.log({params})
  return { message: 'Hola mundo' };
}

export async function clientLoader({ params }: Route.ClientLoaderArgs ) {
  await sleep(1500);
  console.log({params})
  return { message: 'Hola mundo desde clientLader y fallBack' };
}

//? Mientras se carga la data me hace un loader o un fallback
export function HydrateFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <p className="text-2xl font-semibold text-blue-500 animate-pulse">Loading Game...</p>
    </div>
  );
}

clientLoader.hydrate = true as const;

export default function testingArgsPage({ loaderData, actionData, params, matches, }: Route.ComponentProps) {

  //? Parametros de ruta
  const { id, name, age } = params;
  console.log(id, name, age);

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