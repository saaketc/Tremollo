export const thumbnailCreator = (string) => {
  return string[0].toUpperCase();
};

export const month = (month) => {
  switch (month) {
    case 0:
      return "January";

    case 1:
      return "February";

    case 2:
      return "March";

    case 3:
      return "April";

    case 4:
      return "May";

    case 5:
      return "June";

    case 6:
      return "July";

    case 7:
      return "August";

    case 8:
      return "September";

    case 9:
      return "October";

    case 10:
      return "November";

    case 11:
      return "December";
    default:
      return "New Month";
  }
};

export const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createSlug = (string) => {
  return string
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
export const removeSlug = (string) => {
  return string
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const filter = (array, property, filteringId) => {
  return array.filter((a) => a[property] !== filteringId);
};

export const fullDate = (date) => {
  return ` ${new Date(date).getDate()}, ${month(
    new Date(date).getMonth()
  )} ${new Date(date).getFullYear()}`;
};

export const encode = (data) => {
  let enc = window.btoa(data);
  return encodeURIComponent(enc);
};

export const decode = (data) => {
  let dec = decodeURIComponent(data);
  return window.atob(dec);
};
