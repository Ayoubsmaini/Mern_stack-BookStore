import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCommandeById } from "../../redux/api/commandeApiCall";
import SpinerBs from "../../components/share/SpinerBs";
import ErrorAlert from "../../components/share/ErrorAlert";
import { BsEye, BsPencil, BsTrash3 } from "react-icons/bs";
import Btn from "../../components/share/Btn";
import ContainerDetails from "./shildren/ContainerDetails";
import { getBooks } from "../../redux/api/bookApiCall";
import { getusers } from "../../redux/api/authApiCalls";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { commande, loading,error } = useSelector((state) => state.commande);
  const { books } = useSelector((state) => state.book);
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCommandeById(`/api/commandes/${id}`));
    dispatch(getBooks(`/api/books`));
    dispatch(getusers());
  }, []);
  return (
    <div className="category-list w-100 h-100 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {loading && <SpinerBs />}
          {commande && (
            <h1 className="d-flex align-items-center gap-2">
              <BsEye />
              Details Commande
            </h1>
          )}
        </div>
        <div>
        {loading && <SpinerBs />}
        {commande && (
          <div className="d-flex align-items-center gap-1">
            {" "}
            <Link
              className="btn btn-outline-light btn-sm rounded-circle "
              to={`/commande/edite/${id}`}
            >
              <BsPencil />
            </Link>{" "}
            <Btn
              className="btn btn-outline-light btn-sm rounded-circle"
              text={<BsTrash3 />}
            />
          </div>
        )}
      </div>
      </div>
      <div className="table-container ">
      {loading ? (
        <SpinerBs />
      ) : (
        commande &&books&& users && <ContainerDetails id={id} commande={commande} books={books} users={users} />
      )}
      {error && <ErrorAlert error={error} />}
    </div>
    </div>
  );
};

export default Details;
