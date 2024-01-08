import { Link } from 'react-router-dom';

interface AuthProps{

}
const Auth:React.FC<AuthProps> = () => {
  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="card w-96 shadow-xl bg-base-100 p-6 rounded-md">
        <ul className="flex flex-row gap-4 justify-around">
          <li>
            <Link to="/SignUp" className="text-primary-500 hover:underline">
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="/Login" className="text-primary-500 hover:underline">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Auth
