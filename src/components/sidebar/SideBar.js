import React, { useEffect } from "react";
import Search from "../search/search";

import "./sidebar.scss";

const SideBar = () => {
  useEffect(() => {
    console.log("set up listener");
  }, []);

  return (
    <>
      <Search></Search>
    </>
  );
};

export default SideBar;
