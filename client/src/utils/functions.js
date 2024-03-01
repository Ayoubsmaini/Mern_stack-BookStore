export const isEmpty = (data = "") =>
  data === null ||
  data === undefined ||
  (typeof data === "string" && data.trim() === "");
export const returnDate = (date) => date.substring(0, 10);

export const formatImageName = (title, fileName) => {
  const fileExtension = fileName.split(".").pop();

  const formattedTitle = title
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "_")
    .toLowerCase();

  const imageName = `${formattedTitle}.${fileExtension}`;

  return imageName;
};
export const getNumberOfBooks = (books=[],id)=> books?.filter(b=>b?.category ===id).length
export const calculatePriceTotale=(books=[],booksSelected)=>{
const prices = books?.filter(b=>booksSelected?.includes(b._id))?.map(b=>b.price)
return  prices?.reduce((a, b) => a + b, 0);
}

