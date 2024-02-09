import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useState } from "react";
import "./Form.css";
import { ApiConnector } from "../api/ApiConnector";
import { useNavigate } from "react-router-dom";
import SimpleForm from "./SimpleForm";
import WelcomeForm from "./WelcomeForm";

function Form() {
  const navigate = useNavigate();
  const {} = ApiConnector();
  const [formType, setFormType] = useState("");

  return (
    <div className="Form">
      {!formType && <WelcomeForm setFormType={setFormType} />}
      {formType === "simple" && <SimpleForm />}
      {formType === "advanced" && <div>adv</div>}
    </div>
  );
}

export default Form;
