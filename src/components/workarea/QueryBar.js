import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const QueryBar = (props) => {
  const [query, setQuery] = useState({});

  const onSelectDate = (evt) => {
    console.log("On date Change >>", evt.target.value, evt.target.name);

    setQuery({ ...query, [evt.target.name]: evt.target.value });
  };

  return (
    <form noValidate>
      <TextField
        id="date"
        label="From"
        type="date"
        onChange={onSelectDate}
        name="fromDate"
        InputLabelProps={{
          shrink: true,
        }}
      />{" "}
      <TextField
        id="date"
        label="To"
        type="date"
        onChange={onSelectDate}
        name="toDate"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField name="symbol" variant="outlined" onChange={onSelectDate} />{" "}
      <Button
        onClick={() => props.onClick(query)}
        variant="contained"
        color="primary"
      >
        test
      </Button>
    </form>
  );
};

export default QueryBar;
