import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import { CreateCategory, DetailsCategory, EditeCategory, ShowCategory } from ".";

export const categoryRoutes = (
  <Route path="category" element={<Layout />}>
    <Route index element={<ShowCategory />} />
    <Route path="edite/:id" element={<EditeCategory />} />
    <Route path="details/:id" element={<DetailsCategory />} />
    <Route path="create" element={<CreateCategory />} />
  </Route>
);
