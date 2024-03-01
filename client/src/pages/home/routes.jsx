import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import Home from "./Home";

export const homeRoutes = (
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
  </Route>
);
