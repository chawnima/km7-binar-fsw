import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import NavigationBar from "../components/Navbar/navbar";
import {GoogleOAuthProvider} from "@react-oauth/google"

export const Route = createRootRoute({
  component: () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_ID}>

      <NavigationBar />

      <Container>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </GoogleOAuthProvider>
  ),
});
