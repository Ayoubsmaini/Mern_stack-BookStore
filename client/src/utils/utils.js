import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiRotateRight } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";

export const getProductNameById=(objectID,products=[])=>{
return products?.find(e=>e._id===objectID)?.nom
}
export const getPrix =(id,products=[],newValue)=>{
    return ( products?.find(p=>p._id===id)?.price)*newValue
}
export function getPrixTotale(client = []) {
    return client
      .map((c) => +c.prix)
      .filter((value) => !isNaN(value)) 
      .reduce((a, b) => a + b, 0);
  }
export const isEmpty=(value)=>{
return  !value?.length>0
} 
export const equalToZero=(value)=>{
return value===0
}
export const getColor=(status)=>{
  if(status==="en attente")return "text text-warning"
  else if(status==="traité")return "text text-success"
  else if(status==="annulé") return "text text-danger"
  }

export const getPriceInCommande =(objectId,products)=>{
 return products?.find((p)=>p?._id===objectId)?.price
  }
export const getNameInCommande =(objectId,products)=>{
 return products?.find((p)=>p?._id===objectId)?.nom
  }
export const getStockInCommande =(objectId,products)=>{
 return products?.find((p)=>p?._id===objectId)?.stock
  }
export const getImageInCommande =(objectId,products)=>{
 return products?.find((p)=>p?._id===objectId)?.image
  }
  export const getCategoryInCommande=(objectId,products,categorys)=>{
    const categoryId = products?.find(p=>p?._id===objectId)?.categories?.[0]

return categorys?.find(c=>c?._id===categoryId)?.nom
  }
  export const getColorInCommande=(objectId,products,categorys)=>{
    const categoryId = products?.find(p=>p?._id===objectId)?.categories?.[0]

return categorys?.find(c=>c?._id===categoryId)?.couleur
  }

  export const chekStockProducts = (selectedProducts, products) => {
    const selectedProductIds = selectedProducts?.map(p => p?.produit);
    const relevantProducts = products?.filter(p => selectedProductIds?.includes(p?._id));
  
    return relevantProducts?.some(product => {
      const selectedProduct = selectedProducts?.find(p => p?.produit === product?._id);
      return selectedProduct?.quantite > product?.stock;
    });
  };
 export const getBgColorCard =(product,products)=>{
return products?.find(p=>p?._id===product?.produit)?.stock<product?.quantite ?" bg-secondary":" bg-light"
  }
export const getFileExtension=(fileName)=> {
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex !== -1) {
      return fileName.substring(dotIndex);
    }
    return ''; // Return an empty string if no extension is found
  }
  
  