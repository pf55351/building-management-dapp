import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import {useProvider} from "../../../hooks/useEther";

const Index = () => {
  const [account, setAccount] = useState();
  const [error, setError] = useState();
  const provider = useProvider();
  const navigate = useNavigate();

  const getWalletAccount = useCallback(async () => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setAccount(await signer.getAddress());
  }, [provider]);

  useEffect(() => {
    if (!window.ethereum) {
      setError("Please install Metamask extensions for your browser!");
      return;
    }
    if (account) {
      sessionStorage.setItem("account", account);
    }
  }, [account]);

  useEffect(() => {
    if (sessionStorage.getItem("account")) {
      navigate("dashboard");
    }
  }, [navigate]);

  return (
    <div>
      {error ? (
        error
      ) : (
        <>
          <div>
            <h1>WELCOME</h1>
          </div>
          <div>
            <h2>Please connect a wallet to start</h2>
          </div>
          <div>
            <button onClick={getWalletAccount}>Connect a wallet</button>
          </div>
          <div>
            <h3>Account:{account && account.toString().toLowerCase()}</h3>
            <div>
              <Link to="/dashboard">
                <button>Continue</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
