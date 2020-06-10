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

