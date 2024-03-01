import request from "../../../utils/request";

export const deleteImage = async (resource, filename) => {
  await request
    .delete(`${resource}/${filename}`)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return console.log(`Deleted image with filename: ${filename}`);
    })
    .catch((err) => console.log(err));
};