import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import { CreateBook, DetailsBook, EditeBook, ShowBook } from ".";

export const bookRoutes = (
  <Route path="book" element={<Layout />}>
    <Route index element={<ShowBook />} />
    <Route path="edite/:id" element={<EditeBook />} />
    <Route path="details/:id" element={<DetailsBook />} />
    <Route path="create" element={<CreateBook />} />
  </Route>
);
