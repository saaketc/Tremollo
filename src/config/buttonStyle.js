import colors from "./colors";

export const buttonStyleOpen = {
  color: colors.primary,
  border: `1px solid ${colors.primary}`,
  borderRadius: "40px",
  "&:hover": {
    backgroundColor: colors.white,
    
  },
};

export const buttonStyleClose = {
  color: colors.white,
  border: `1px solid ${colors.primary}`,
  borderRadius: "40px",

  background: colors.primary,
  "&:hover": {
    backgroundColor: colors.primary,
  },
};
