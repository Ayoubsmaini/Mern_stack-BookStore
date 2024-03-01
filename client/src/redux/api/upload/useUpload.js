import request from "../../../utils/request";

export const upload = async (resource, body) => {
  const formData = new FormData();
  formData.append("image", body);
  await request
    .post(resource, formData)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return console.log("upload image ok");
    })
    .catch((err) => console.log(err));
};
