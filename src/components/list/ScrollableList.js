import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import "./list.scss";

const ScrollableList = ({ items, onItemSelect, initialSelected }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);
  const handleItemSelect = (symbol) => {
    setSelected(symbol);
    onItemSelect(symbol);
  };
  return (
    <>
      <ul style={{ overflow: "scroll", height: "99vh", padding: "1rem" }}>
        {items.map((item) => (
          <ListItem
            className="list"
            onItemSelect={handleItemSelect}
            title={item.title}
            selected={selected === item.title}
          ></ListItem>
        ))}
      </ul>
    </>
  );
};

export default ScrollableList;
