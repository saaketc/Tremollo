import colors from "./colors";

export const buttonStyleOpen = {
  color: colors.white,
  border: `1px solid ${colors.primary}`,
  borderRadius: "40px",
  "&:hover": {
    backgroundColor: colors.white,
    
  },
  paddingLeft: '20px',
  paddingRight: '20px'

};

export const buttonStyleClose = {
  color: colors.white,
  border: `1px solid ${colors.primary}`,
  borderRadius: "40px",

  background: colors.primary,
  "&:hover": {
    backgroundColor: colors.primary,
  },
  paddingLeft: '20px',
  paddingRight: '20px'


};
