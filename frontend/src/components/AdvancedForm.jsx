import Input from "@mui/joy/Input";
import { Button, Checkbox } from "@mui/joy";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ApiConnector } from "../api/ApiConnector";
import Card from "@mui/joy/Card";
import { useRecoilState } from "recoil";
import { dataAtom } from "../store/atoms/dataAtom";

import ReactSelect from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowDown from "./ArrowDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function AdvancedForm({ events }) {
  const [data, setData] = useRecoilState(dataAtom);

  const [includeBody, setIncludeBody] = useState(false);
  const [startDate, setStartDate] = useState(new Date(1948, 0, 1));
  const [endDate, setEndDate] = useState(new Date(1948, 11, 31));
  const [roleList, setRoleList] = useState(null);

  // dynamic
  const [queries, setQueries] = useState([]);
  const [eventValue, setEventValue] = useState(null);
  const [roleValue, setRoleValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tempRoles, setTempRoles] = useState([]);

  const { getRolesFromEvent, getAdvancedEvent } = ApiConnector();

  async function getRolesFromEventData(event) {
    const _roles = await getRolesFromEvent(event);
    const formattedRoles = _roles.map((role) => ({
      value: role._id,
      label: role._id,
    }));
    setRoleList(formattedRoles);
  }

  async function getEventsData({ queries, includeBody, startDate, endDate }) {
    setData(null);

    const queriesPromises = [];

    queries.forEach((query) => {
      queriesPromises.push(
        getAdvancedEvent(query, includeBody, startDate, endDate)
      );
    });

    const _data = await Promise.all(queriesPromises);

    const noResults = _data.length === 1 && _data[0].results.length === 0;

    setData({
      unit: _data,
      group: null,
      noResults,
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

  function deleteQuery(id) {
    const newQueries = queries.filter((query) => {
      if (query.id !== id) return true;
    });

    setQueries(newQueries);
  }

  return (
    <div className="AdvancedForm">
      <h1 style={{ marginTop: "0" }}>
        Create <strong>queries</strong>
      </h1>
      {queries && !!queries.length && <h2>Queries:</h2>}
      {queries && !!queries.length && (
        <div className="DisplayQueries">
          {queries.map((query, i) => (
            <Card
              sx={{ mr: 2, mb: 2, padding: "20px", minWidth: "220px" }}
              key={i}
              variant="outlined"
            >
              <div className="CardHeadContainer">
                <h2>{query.event}</h2>
                <DeleteForeverIcon
                  className="DeleteIcon"
                  onClick={() => deleteQuery(query.id)}
                />
              </div>
              {!!query.roles.length && <span>Roles:</span>}
              <ul>
                {query.roles.map((role, i) => (
                  <li key={i}>
                    {role.role ? role.role : role.value ? "Value" : ""}
                    {role.value ? ":" : ""} {role.value}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
      <h2>select an event</h2>
      <div className="QueryContainer">
        <ReactSelect
          options={eventsOptions}
          className="Select1"
          classNamePrefix="select"
          placeholder="Select event"
          onChange={(value) => {
            setEventValue(value);
            setRoleValue(null);
            setTempRoles([]);
            setInputValue("");
            getRolesFromEventData(value.label);
          }}
        />
        {tempRoles && !!tempRoles.length && (
          <ul className="DisplayRoles">
            <h2>Roles</h2>
            {tempRoles.map((tp, i) => (
              <li key={i}>
                {tp.role ? tp.role : tp.value ? "Value" : ""}
                {tp.value ? ":" : ""} {tp.value}
              </li>
            ))}
          </ul>
        )}
        <div className="RolesContainer">
          <div className="Inputs">
            <span style={{ marginRight: "30px" }}>
              <h2>select a role</h2>
              <ReactSelect
                isDisabled={!eventValue && !roleList}
                isClearable
                options={roleList}
                className="Select2"
                classNamePrefix="select"
                placeholder="Select semantic role"
                onChange={(value) => setRoleValue(value)}
                value={roleValue}
              />
            </span>
            <span className="ValueContainer">
              <h2>and write a value</h2>
              <Input
                sx={{ width: "300px" }}
                placeholder="Write a value here..."
                onChange={(event) => setInputValue(event.target.value)}
                value={inputValue}
              />
            </span>
            <Button
              sx={{
                width: "120px",
                height: "36px",
                // maxWidth: "100%",
                display: "block",
                zIndex: "20",
                marginTop: "20px",
              }}
              onClick={function () {
                const newTempRoles = [
                  ...tempRoles,
                  {
                    role: roleValue?.label || "",
                    value: inputValue,
                  },
                ];
                setTempRoles(newTempRoles);
                setRoleValue(null);
                setInputValue("");
              }}
              variant="soft"
              size="sm"
            >
              ADD ROLE
            </Button>
          </div>
        </div>
        <div className="ButtonsContainer">
          <Button
            sx={{
              mt: 3,
              width: "250px",
              maxWidth: "100%",
              display: "block",
              zIndex: "2",
            }}
            onClick={function () {
              const newQueries = [
                ...queries,
                {
                  id: uuidv4(),
                  event: eventValue.label,
                  roles: tempRoles,
                },
              ];
              setQueries(newQueries);
              setTempRoles([]);
              setRoleValue(null);
              setInputValue("");
            }}
          >
            ADD QUERY
          </Button>
        </div>
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
          mt: 3,
          fontSize: "20px",
        }}
        label="Extend the search to the article body"
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
        disabled={queries.length === 0}
        onClick={function () {
          const startDateFormatted = new Date(startDate).toLocaleDateString();
          const endDateFormatted = new Date(endDate).toLocaleDateString();
          getEventsData({
            includeBody,
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            queries,
          });
        }}
      >
        EXPLORE
      </Button>
      {data && <ArrowDown />}
    </div>
  );
}

export default AdvancedForm;
