import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import NavigationBar from "../components/Navbar/navbar";

export const Route = createRootRoute({
  component: () => (
    <>

      <NavigationBar />

      <Container>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  ),
});
