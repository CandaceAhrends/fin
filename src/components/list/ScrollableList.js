import React from "react";
import ListItem from "./ListItem";
import SideBar from "../sidebar/SideBar";

const ScrollableList = ({ items }) => {
  return (
    <>
      <SideBar></SideBar>
      <aside style={{ overflow: "scroll", height: "99vh" }}>
        {" "}
        {items.map((item) => (
          <ListItem title={item.title}></ListItem>
        ))}{" "}
      </aside>
    </>
  );
};

export default ScrollableList;
