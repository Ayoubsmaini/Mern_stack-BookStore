import React, { useEffect } from "react";

import { BiRotateRight } from "react-icons/bi";
import { BsCheckCircle, BsEye, BsPencil, BsTrash3 } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Btn from "../../../components/share/Btn";
import { commandeActions } from "../../../redux/slices/commandeSlice";
import { removeCommande } from "../../../redux/api/commandeApiCall";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { getColor } from "../../../utils/utils";
const ListCommandes = ({ commandes }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(commandes);
  }, []);
  const { deleteMessage } = useSelector((state) => state.commande);
  const handelDelete = (id) => {
    // dispatch(remove("/api/categorys",id))
    dispatch(
      commandeActions.setDeleteMessage({
        message: " Are you sure you want to remove this Commande ? ",
        id,
      })
    );
  };
  if (deleteMessage) {
    swal({
      title: deleteMessage.message,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(removeCommande("/api/commandes", deleteMessage.id));

        dispatch(commandeActions.setDeleteMessage(null));
      }
      dispatch(commandeActions.setDeleteMessage(null));
    });
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr className="table table-primary">
            <th>N°</th>
            <th>Products</th>
            <th>total price</th>
            <th>status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {commandes.length > 0 ? (
            commandes.map((c, i) => (
              <tr key={i}>
                <td> {i}</td>
                <td> {c.nomber_de_produit}</td>
                <td> {c.prix_totale}</td>
                <td className={getColor(c.status)}>
                  {" "}
                  {getIcone(c.status)} {c.status}
                </td>
                <td>
                  {" "}
                  <div className="w-100 d-flex justify-content-end align-items-center gap-2 pe-2">
                    <Link
                      className="btn btn-outline-primary btn-sm rounded-circle "
                      to={`/commande/details/${c._id}`}
                    >
                      <BsEye />
                    </Link>
                    {/* {c.status === "en attente" && */}
                    <Link
                      className="btn btn-outline-warning btn-sm rounded-circle "
                      to={`/commande/edite/${c._id}`}
                    >
                      <BsPencil />
                    </Link>
                     
                    {
                      // c.status == "traité" ||
                      <Btn
                        text={<BsTrash3 />}
                        oncklick={() => handelDelete(c._id)}
                        className="btn btn-outline-danger btn-sm rounded-circle "
                      />
                    }
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                {" "}
                <div className="w-100 text-center ">
                  <div className="fw-bolder">There are no commandes !</div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListCommandes;
export const getIcone = (status) => {
  if (status === "en attente")
    return <BiRotateRight color="orange" size={20} />;
  else if (status === "traité")
    return <BsCheckCircle color="green" size={20} />;
  else if (status === "annulé")
    return <AiOutlineCloseCircle color="red" size={20} />;
};
