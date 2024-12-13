import {
  useState,
  useEffect,
  createContext,
  useContext,
  Children,
} from "react";
import AuthService from "../services/auth.service";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
const AuthContext = createContext(null);
export const AuthProvider = ({ Children }) => {
  const [user, setUser] = useState(getUser);
  const login = (user) => setUser(user);
  const logout = () => {
    AuthService.logout();
    setUser(null);
  };
  function getUser() {
    const savedUser = cookies.get("user") || null;
    return savedUser;
  }

  useEffect(()=>{
    cookies.set("user", JSON.stringify(user), {
      path: "/",
      expires: new Date(Date.now() + 86400),
    });
  }, [user])

  return(
    <AuthContext.Provider value={{user, login, logout}}>
        {Children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);