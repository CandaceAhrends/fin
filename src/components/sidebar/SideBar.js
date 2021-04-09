import React, { useEffect, useState } from "react";
import Search from "../search/search";
import ScrollableList from "../list/ScrollableList";
import stockSymbols from "../../api/stockSymbols";
import { saveLocalData, getLocalData } from "../../utils";
import "./sidebar.scss";
const SIDEBAR_STATE = "sidebarstate";

const SideBar = (props) => {
  const [itemsList, setItemsList] = useState([]);
  const [initialSelected, setInitialSelected] = useState("");
  useEffect(() => {
    const savedList = getLocalData(SIDEBAR_STATE);
    if (savedList) setItemsList(savedList);
  }, []);

  useEffect(() => {
    saveLocalData(itemsList, SIDEBAR_STATE);
  }, [itemsList]);

  const handleSearchSelection = (selected) => {
    console.log("handleSelection", selected);
    const exists = itemsList.find((item) => item.title === selected);
    if (!exists) {
      setItemsList([...itemsList, { title: selected }]);
    }
    setInitialSelected(selected);
    props.handleSelection(selected);
  };
  const handleListItemSelect = (selected) => {
    console.log("handleListItemSelect handleListItemSelect", selected);
    props.handleSelection(selected);
  };
  return (
    <>
      <Search
        handleSelection={handleSearchSelection}
        selectionApi={stockSymbols}
      ></Search>
      <ScrollableList
        onItemSelect={handleListItemSelect}
        items={itemsList}
        initialSelected={initialSelected}
      ></ScrollableList>
    </>
  );
};

export default SideBar;
