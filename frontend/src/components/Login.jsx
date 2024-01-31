import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useState } from "react";
import "./Login.css";
import { ApiConnector } from "../api/ApiConnector";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { getAuthToken } = ApiConnector();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function getAuthTokenData() {
    const { authKey } = await getAuthToken(password);
    if (!authKey) {
      setError(true);
    } else {
      localStorage.setItem("authToken", authKey);
      navigate("/");
    }
  }

  return (
    <div className="Login">
      <strong>Please insert a password</strong>
      <Input
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
      />
      {error && <small>Wrong password</small>}
      <Button
        onClick={getAuthTokenData}
        sx={{ marginTop: "20px" }}
        variant="soft"
      >
        Sign in
      </Button>
    </div>
  );
}

export default Login;
