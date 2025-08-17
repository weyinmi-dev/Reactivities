import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";

import HomePage from "../../features/home/HomePage";

function App() {
  const locator = useLocation();

  return (
    <>
      {locator.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

const ObservedApp = observer(App);
export default ObservedApp;
