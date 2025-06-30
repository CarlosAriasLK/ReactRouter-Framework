import type { Route } from "./+types/product"

export async function loader( { params }: Route.LoaderArgs ) {
  const { name } = params;
  return { name: name.toUpperCase() }
}


const productPage = ( { loaderData }: Route.ComponentProps ) => {

  const { name } = loaderData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Producto</h1>
        <p className="text-xl text-blue-600 font-semibold">{name}</p>
      </div>
    </div>
  )

}

export default productPage