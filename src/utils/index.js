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

export const getDate = () => {

  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth();
  var year = currentDate.getFullYear();
  var time = new Date().getTime();
  var monthDateYear = (month + 1) + "/" + date + "/" + year + "/" + time;

  return monthDateYear;
}


