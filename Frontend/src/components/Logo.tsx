import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <span className="sr-only">FinSplit</span>
      <p className="text-2xl font-bold">
        FinSplit <span className="text-blue-600"></span>
      </p>
    </Link>
  );
};

export default Logo;
