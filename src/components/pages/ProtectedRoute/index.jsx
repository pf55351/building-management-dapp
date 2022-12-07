import { useCallback, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { ethers } from "ethers";

const ProtectedRoute = ({ children }) => {
  const isValidAccount = useCallback((_account) => {
    try {
      ethers.utils.getAddress(_account);
      return true;
    } catch (_err) {
      console.error(_err.message);
      return false;
    }
  }, []);

  const validAccount = useMemo(() => {
    const account = sessionStorage.getItem("account");
    return isValidAccount(account);
  }, [isValidAccount]);

  return validAccount ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
