import React from "react";
import TextField from "@material-ui/core/TextField";
import "./querybar.scss";

const QueryBar = (props) => {
  return (
    <form className="query-bar" noValidate>
      <TextField
        id="date"
        label="From"
        type="date"
        value={props.fromDate}
        onChange={props.handleDateSelect}
        name="fromDate"
        InputLabelProps={{
          shrink: true,
        }}
      />{" "}
      <TextField
        id="date"
        label="To"
        type="date"
        value={props.toDate}
        onChange={props.handleDateSelect}
        name="toDate"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
};

export default QueryBar;
