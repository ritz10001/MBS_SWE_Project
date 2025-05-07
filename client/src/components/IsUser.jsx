import { useAuth } from "../contexts/AuthContext";

const IsUser = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated != true) return null;

  return children;
}

export default IsUser;