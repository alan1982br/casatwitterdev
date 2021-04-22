export const getImage = (img) => {
  if(img.includes("http")){
    return img;
  } else {
    console.log("getImage", img)

    return require("../assets/images/" + img).default;
  }
}
