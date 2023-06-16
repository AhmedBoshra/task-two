const { createContext, useContext, useState } = require("react");

const AuthContext = createContext({ token: "" });

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const setAuthToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.setAuthToken) {
    throw new Error("setAuthToken is not available in AuthContext");
  }

  const { setAuthToken } = authContext;

  return authContext;
};

module.exports = { AuthProvider, AuthContext, useAuth };
