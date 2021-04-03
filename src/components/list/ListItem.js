import React from "react";
import "./list.scss";

const ListItem = ({ title, onItemSelect, selected }) => {
  const clickHandler = () => {
    onItemSelect(title);
  };
  return (
    <p className={selected ? "item selected" : "item"} onClick={clickHandler}>
      {title}
    </p>
  );
};

export default ListItem;
