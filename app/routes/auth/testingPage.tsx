import { Link } from "react-router"

const testingPage = () => {

  return (
    <>
      <div>testingPage</div>
      <Link to={'/auth/login'} className="text-blue-500 underline">Go back</Link>
    </>

  )
}

export default testingPage