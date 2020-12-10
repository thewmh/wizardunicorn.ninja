import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const themeHook = useState("orange");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to={"/frontend-masters/complete-intro-react/"}>
              Adopt Me!
            </Link>
          </header>
          <Router>
            <SearchParams path="/frontend-masters/complete-intro-react/" />
            <Details path="/frontend-masters/complete-intro-react/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));