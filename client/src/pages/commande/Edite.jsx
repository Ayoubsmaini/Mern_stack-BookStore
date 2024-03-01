import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/share/Input";
import Btn from "../../components/share/Btn";
import SelectSection from "./shildren/SelectSection";
import { getBooks } from "../../redux/api/bookApiCall";
import { calculatePriceTotale } from "../../utils/functions";
import { createCommande, getCommandeById, updateCommande } from "../../redux/api/commandeApiCall";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/share/Card";
import CardBookCommande from "../../components/share/CardBookCommande";

const Create = () => {
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.book);
  const {id}=useParams()
  const { commande } = useSelector((state) => state.commande);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // prix_totale: calculatePriceTotale(),
    prix_totale: 0,
    nomber_de_produit: 0,
    client: {
      id: user.user._id,
      tel: "",
    },
    produits: [],
  });

  const handelChange = (field, value) => {
    if (field === "tel") {
      setFormData((prev) => ({
        ...prev,
        client: { ...formData.client, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...formData.produits, value],
      }));
    }

    console.log(formData);
  };

  const handelDelete = (id) => {
    const updatedProduits = formData.produits.filter((p) => p !== id);
    setFormData((prev) => ({
      ...prev,
      produits: updatedProduits,
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateCommande(
        `/api/commandes/${id}`,
        {
          ...formData,
          prix_totale: calculatePriceTotale(books, formData.produits),
          nomber_de_produit: formData.produits.length,
        },
        () => navigate("/commande")
      )
    );
    
  };
  
  useEffect(() => {
    dispatch(getBooks("/api/books"));
    dispatch(getCommandeById(`/api/commandes/${id}`,(data)=>setFormData(prev=>data)))
  }, []);
  useEffect(()=>{

  },[])
console.log(commande)
  return (
    <div className="category-create  w-100 h-100 p-3 ">
      <div className="d-flex justify-content-start align-items-center">
        <div>
          <h1>Commande Edite </h1>
        </div>
      </div>
      {books && commande && (
        <form
          onSubmit={handelSubmit}
          className="row bg-light w-100 h-100 gap-3  text-dark w-100 py-3"
        >
          <div className="col-md-3 col-sm-12 ">
            {" "}
            <Input
              type="text"
              label="Tel"
              classLabel="fw-bold text-black"
              classParent="input-w  d-flex flex-column gap-2 w-100"
              className="form-control"
              placeholder="phone"
              field="tel"
              defaultValue={commande.client.tel}
              onchange={handelChange}
            />
            {books && (
              <SelectSection
                books={books.filter((b) => !formData.produits.includes(b._id))}
                handelAdd={handelChange}
                field="produits"
              />
            )}
            <div>totale price :{ calculatePriceTotale(books, formData.produits)} </div>
            <div>number of producte :{ formData.produits.length} </div>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="">
              <div className="books-Selected rounded row p-2">
                {books &&
                books.filter((b) => formData.produits.includes(b._id)).length >
                  0 ? (
                  books
                    .filter((b) => formData.produits.includes(b._id))
                    .map((p) => (
                      <div className="col-3">
                        <CardBookCommande book={p}  ondelete={() => handelDelete(p._id)} /></div>
                      // <p key={p._id}>
                      //   {" "}
                      //   <Btn text="x" oncklick={() => handelDelete(p._id)} />{" "}
                      // </p>
                    ))
                ) : (
                  <div className="w-1OO text-center">
                    <h1 className="text-dark">
                    There are no selected books
                    </h1>
                  </div>
                )}
              </div>{" "}
            </div>{" "}
            <div className="text text-end mt-4">
              <Btn
                type="submit"
                className="btn btn-success ms-auto"
                text="create"
                oncklick={handelSubmit}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Create;
