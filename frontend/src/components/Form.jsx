import { useState, useEffect } from "react";
import "./Form.css";
import { ApiConnector } from "../api/ApiConnector";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import SimpleForm from "./SimpleForm";
import WelcomeForm from "./WelcomeForm";
import AdvancedForm from "./AdvancedForm";

function Form() {
  const { getPreset } = ApiConnector();
  const [formType, setFormType] = useState("simple");
  const [preset, setPreset] = useState(null);

  async function getPresetData() {
    const _preset = await getPreset();
    setPreset(_preset);
  }

  useEffect(() => {
    getPresetData();
  }, []);

  return (
    <div className="Form">
      {formType && (
        <div className="FormSwitch">
          <span>Easy</span>{" "}
          <Toggle
            checked={formType === "advanced"}
            className="Toggle"
            icons={false}
            onChange={
              formType === "simple"
                ? () => setFormType("advanced")
                : () => setFormType("simple")
            }
          />{" "}
          <span>Advanced</span>
        </div>
      )}
      {!formType && <WelcomeForm setFormType={setFormType} />}
      {preset && formType === "simple" && (
        <SimpleForm events={preset.allEvents} presets={preset.presets.data} />
      )}
      {preset && formType === "advanced" && (
        <AdvancedForm events={preset.allEvents} />
      )}
    </div>
  );
}

export default Form;
