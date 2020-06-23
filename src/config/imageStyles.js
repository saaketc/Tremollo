import colors from './colors';

export const extraSmallPicStyle = {
   
        borderRadius: "50%",
        border: `1px solid ${colors.primary}`,
        width: 30,
        height: 30,
        verticalAlign: "middle",
        padding: "2px",
      
}

export const smallPicStyle = {
   
    borderRadius: "50%",
    border: `1px solid ${colors.primary}`,
    width: 60,
    height: 60,
    verticalAlign: "middle",
    padding: "2px",
  
}

export const largePicStyle = {
   
    borderRadius: "50%",
    border: `2px solid ${colors.primary}`,
    width: 250,
    height: 250,
    verticalAlign: "middle",
    "&:hover": {
      opacity: 0.3,
    },
    padding: "5px",
  
}