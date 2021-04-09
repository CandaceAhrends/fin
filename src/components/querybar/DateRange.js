import React from "react";
import TextField from "@material-ui/core/TextField";
import "./querybar.scss";

const DateRange = (props) => {
  return (
    <form className="query-bar" noValidate>
      <div>
        <label>From Date</label>
        <TextField
          className="date-input"
          id="date"
          type="date"
          value={props.fromDate}
          onChange={props.handleDateSelect}
          name="fromDate"
          InputLabelProps={{
            shrink: true,
          }}
        />{" "}
      </div>
      <div>
        <label>To Date</label>
        <TextField
          className="date-input"
          id="date"
          type="date"
          value={props.toDate}
          onChange={props.handleDateSelect}
          name="toDate"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </form>
  );
};

export default DateRange;
