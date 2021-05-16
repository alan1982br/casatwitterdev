export const getImage = (img) => {
  if(img.includes("http")){
    return img;
  } else {
    return require("../assets/images/" + img);
  }
}

export const getFile = (file) => {
  if(file.includes("http")){
    return file;
  } else {
    return require(`../assets/files/${file}`);
  }
}
