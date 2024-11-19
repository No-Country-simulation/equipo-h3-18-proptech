import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <div>HomePage</div>
      <Link to={"./login"} className="text-blue-500">
        Ir al login
      </Link>
    </>
  );
}

export default HomePage;
