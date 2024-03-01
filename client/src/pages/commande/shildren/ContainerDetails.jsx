import React from "react";
import CardBookCommandeDetails from "../../../components/share/CardBookCommandeDetails";
import Btn from "../../../components/share/Btn";
import { useDispatch } from "react-redux";
import { updateCommande } from "../../../redux/api/commandeApiCall";

const ContainerDetails = ({ commande, books, users, id }) => {
  const dispatch = useDispatch();
  const handelValidate = () => {
    dispatch(updateCommande(`/api/commandes/${id}`, { status: "traité" }));
  };
  const handelCancel = () => {
    dispatch(updateCommande(`/api/commandes/${id}`, { status: "annulé" }));
  };
  return (
    <div className="bg-light w-100 row text-dark rounded">
      <div className="col-md-4 p-4">
        <span className="fw-bold">
          Client :{" "}
          <p className="fw-normal">
            {" "}
            {getUser(users, commande.client.id).user_name}{" "}
          </p>
        </span>
        <span className="fw-bold">
          Phone : <p className="fw-normal"> {commande.client.tel} </p>
        </span>
        <span className="fw-bold">
          Totale books :{" "}
          <p className="fw-normal"> {commande.produits.length} </p>
        </span>
        <span className="fw-bold">
          Status : <p className="fw-normal"> {commande.status} </p>
        </span>
        <span className="fw-bold">
          Date :{" "}
          <p className="fw-normal"> {commande.createdAt.split("T")[0]} </p>
        </span>
        <div className="d-flex align-items-center justify-content-between">
          {" "}
          {commande.status === "traité" ? (
            ""
          ) : (
            <>
              {" "}
              <Btn
                text="cancel"
                className="btn btn-danger"
                oncklick={handelCancel}
              />
              <Btn
                text="validate"
                className="btn btn-primary"
                oncklick={handelValidate}
              />
            </>
          )}
        </div>
      </div>
      <div className="col-md-8">
        <div className="books-Selected rounded row p-2 row w-100">
          {books
            .filter((b) => commande.produits.includes(b._id))
            .map((p) => (
              <div className="col-md-4">
                {" "}
                <CardBookCommandeDetails book={p} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContainerDetails;

const getUser = (users, id) => {
  return users.find((u) => u._id === id);
};
