import { Menu } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

// Styled menu for avatar
export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "var(--body_background)",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    marginTop: theme.spacing(1),
    minWidth: 120,
    padding: 3,
    color: "var(--color-text)",

    "& .MuiMenu-list": {
      padding: "2px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
