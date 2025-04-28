import { useAuth } from "../contexts/AuthContext";

const IsAdmin = ({ children }) => {
  const { userRoles } = useAuth();
  
  if (!userRoles) return null;

  return userRoles.includes("Administrator") ? children : null;
}

export default IsAdmin;