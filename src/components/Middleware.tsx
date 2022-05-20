import { Navigate, useLocation } from "react-router-dom";

type ChildrenType = {
  children: JSX.Element;
};

function Middleware({ children }: ChildrenType) {
  const location: any = useLocation();
  const item = location.state;

  // check for item
  if (!item) return <Navigate to="/" />;

  return children;
}

export default Middleware;
