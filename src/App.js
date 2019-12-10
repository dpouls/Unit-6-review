import React from "react";
import routes from "./routes";
import { withRouter } from "react-router-dom";
import Header from "./Components/Header";
import "./App.css";

function App(props) {
  // console.log(props);
  return (
    <div className="App">
      {props.location.pathname === "/" ||
      props.location.pathname === "/register" ? (
        <>{routes}</>
      ) : (
        // <> react fragment (wraps without needing a div)
        <>
          <Header /> 
          {routes}                  
        </>
      )}
    </div>
  );
}

export default withRouter(App);
