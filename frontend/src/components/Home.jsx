import "./Home.css";
import { Button, Checkbox } from "@mui/joy";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import allEvents from "../assets/allEvents.json";
import Hero from "./Hero";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Home() {
  const [presetValue, setPresetValue] = useState([]);
  const [customValues, setCustomValues] = useState([]);
  const [includeBody, setIncludeBody] = useState(false);
  const [startDate, setStartDate] = useState(new Date(1948, 0, 1));
  const [endDate, setEndDate] = useState(new Date(1948, 11, 31));

  const onChange = (dates) => {
    const [start, end] = dates;
    console.log("start", new Date(start).toLocaleDateString());
    console.log("end", end);
    setStartDate(start);
    setEndDate(end);
  };

  const navigate = useNavigate();

  const presetOptions = [
    {
      value: [
        "COMMITTING_CRIME",
        "ARREST",
        "ROBBERY",
        "USE_FIREARM",
        "SUICIDE",
      ],
      label: "Crime news",
    },
    {
      value: ["TRIAL", "ACQUITTAL", "SENTENCING", "VERDICT", "INVESTIGATION"],
      label: "Judicial news",
    },
    {
      value: ["MARRIAGE", "GIVING_BIRTH", "BEING_BORN"],
      label: "Gossip",
    },
    {
      value: ["VISITING", "ENCOUNTER", "ASSEMBLE", "COME_TOGETHER"],
      label: "Social",
    },
    {
      value: [
        "ARRIVING",
        "DEPARTING",
        "RETURN",
        "QUITTING_A_PLACE",
        "TRAVEL",
        "BEING_IN_PLACE",
      ],
      label: "Movements",
    },
    {
      value: ["STATEMENT", "ANNOUNCEMENT", "DISCUSSION", "SPEECH"],
      label: "Public speeches",
    },
    {
      value: ["STRIKE", "POLITICAL_ACTIONS"],
      label: "Strikes and demonstrations",
    },
  ];

  const eventsOptions = allEvents.map((event) => ({
    value: event,
    label: event,
  }));

  return (
    <div className="Home">
      {/* <div className="LogoContainer">
        <img className="Logo" src="/logo.png"></img>
        <img src="/logo_unimi.png" alt="" className="LogoUnimi" />
      </div> */}
      <div className="HeroContainer">
        <Hero />
      </div>
      <div className="FormContainer">
        <div className="PresetSection">
          <h1>
            Choose a <strong>preset</strong>
          </h1>
          <ReactSelect
            className="Select"
            placeholder="Select a preset"
            onChange={(newValue) => setPresetValue(newValue)}
            disabled={!!customValues.length}
            options={presetOptions}
            isDisabled={customValues.length}
          />
        </div>
        <div className="CustomChoiche">
          <h1>
            Or select your desired <strong>events</strong>
          </h1>
          <ReactSelect
            isMulti
            options={eventsOptions}
            className="Select"
            classNamePrefix="select"
            placeholder="Choose events"
            onChange={(value) => setCustomValues(value)}
            isOptionDisabled={() => customValues.length >= 6}
          />
        </div>
        <div className="RangePickerContainer">
          <h1>
            and select a <strong>date range</strong>
          </h1>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date(1948, 0, 1)}
            maxDate={new Date(1948, 11, 31)}
            dateFormat="yyyy/MM/dd"
            selectsRange
            inline
          />
        </div>
        <Checkbox
          checked={includeBody}
          sx={{
            color: "white",
            mt: 5,
            fontFamily: '"Indie Flower", cursive',
            fontSize: "25px",
          }}
          label="Include body"
          onChange={() => setIncludeBody(!includeBody)}
        />
        <Button
          sx={{ mt: 5, width: "500px" }}
          // disabled={!presetValue.length && !customValues.length}
          onClick={function () {
            const startDateFormatted = new Date(startDate).toLocaleDateString();
            const endDateFormatted = new Date(endDate).toLocaleDateString();

            if (customValues.length) {
              const _values = customValues.map((value) => value.label);
              let url = `/main?events=${_values.toString()}&startDate=${startDateFormatted}&endDate=${endDateFormatted}`;
              if (includeBody) url += "&includeBody=true";
              navigate(url);
            } else {
              let url = `/main?events=${presetValue.value.toString()}&startDate=${startDateFormatted}&endDate=${endDateFormatted}`;
              if (includeBody) url += "&includeBody=true";
              navigate(url);
            }
          }}
          variant="soft"
        >
          Explore
        </Button>
      </div>
    </div>
  );
}

export default Home;
