import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import { CreateCommande, DetailsCommande, EditeCommande, ShowCommande } from ".";

export const commandeRoutes = (
  <Route path="commande" element={<Layout />}>
    <Route index element={<ShowCommande/>} />
    <Route path="edite/:id" element={<EditeCommande/>} />
    <Route path="details/:id" element={<DetailsCommande/>} />
    <Route path="create" element={<CreateCommande/>} />
  </Route>
);
