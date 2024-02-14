import Input from "@mui/joy/Input";
import { Button, Checkbox } from "@mui/joy";
import { useState } from "react";
import { ApiConnector } from "../api/ApiConnector";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { dataAtom } from "../store/atoms/dataAtom";

import ReactSelect from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import allEvents from "../assets/allEvents.json";
import ArrowDown from "./ArrowDown";

function SimpleForm({ events, presets }) {
  const [presetValue, setPresetValue] = useState([]);
  const [customValues, setCustomValues] = useState([]);
  const [includeBody, setIncludeBody] = useState(false);
  const [startDate, setStartDate] = useState(new Date(1948, 0, 1));
  const [endDate, setEndDate] = useState(new Date(1948, 11, 31));

  const [data, setData] = useRecoilState(dataAtom);

  const { getEvent, getEventsGroup } = ApiConnector();

  async function getEventsData({
    eventsArray,
    includeBody,
    startDate,
    endDate,
  }) {
    setData(null);
    const eventsPromise = [];

    eventsArray.forEach((event) => {
      eventsPromise.push(getEvent(event, includeBody, startDate, endDate));
    });
    const _data = await Promise.all(eventsPromise);

    const _groupData = await getEventsGroup(
      eventsArray.toString(),
      includeBody,
      startDate,
      endDate
    );

    setData({
      unit: _data,
      group: _groupData,
    });
  }

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const eventsOptions = events.map((event) => ({
    value: event,
    label: event,
  }));

  return (
    <div className="SimpleForm">
      <div className="PresetSection">
        <h1>
          You can start choosing a <strong>preset</strong>
        </h1>
        <ReactSelect
          className="Select1"
          placeholder="Select a preset"
          onChange={(newValue) => setPresetValue(newValue)}
          disabled={!!customValues.length}
          options={presets}
          isDisabled={customValues.length}
        />
      </div>
      <div className="CustomChoiche">
        <h1>
          or selecting your desired <strong>events</strong>
        </h1>
        <ReactSelect
          isMulti
          options={eventsOptions}
          className="Select2"
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
          mt: 3,
          fontFamily: '"VT323", monospace',
          fontSize: "25px",
        }}
        label="I want to search also in the body of the articles"
        onChange={() => setIncludeBody(!includeBody)}
      />
      <Button
        sx={{
          margin: "50px auto",
          width: "500px",
          maxWidth: "100%",
          display: "block",
          zIndex: "20",
        }}
        disabled={presetValue.length === 0 && customValues.length === 0}
        onClick={function () {
          const startDateFormatted = new Date(startDate).toLocaleDateString();
          const endDateFormatted = new Date(endDate).toLocaleDateString();

          if (customValues.length) {
            const _values = customValues.map((value) => value.label);
            getEventsData({
              eventsArray: _values,
              includeBody,
              startDate: startDateFormatted,
              endDate: endDateFormatted,
            });
          } else {
            getEventsData({
              eventsArray: presetValue.value,
              includeBody,
              startDate: startDateFormatted,
              endDate: endDateFormatted,
            });
          }
        }}
        variant="soft"
      >
        EXPLORE
      </Button>
      {data && <ArrowDown />}
    </div>
  );
}

export default SimpleForm;
