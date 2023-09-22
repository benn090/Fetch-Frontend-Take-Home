import * as React from "react";
// @mui
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box, AppBar, Toolbar } from "@mui/material";
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const FOOTER_HEIGHT = 20;

const StyledContent = styled(AppBar)(() => ({
  position: "absolute",
  justifyContent: 'center',
  top: 'auto',
  alignSelf: "flex-end",
  boxShadow: "none",
    
}));

const LinkContent = styled(Link)(() => ({
  textDecoration: "none",
  ":hover": {textDecoration: "underline"},
  color: "inherit",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: FOOTER_HEIGHT,
  [theme.breakpoints.up('lg')]: {
    minHeight: FOOTER_HEIGHT,
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: FOOTER_HEIGHT,
  },

}));

export default function Footer() {
  return (
    <StyledContent
      sx={{
        color: "text.secondary",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 2,
      }}
      component="footer"
    >
      
      <StyledToolbar>

        <Typography variant="body2">
          <LinkContent href="https://frontend-take-home.fetch.com" >
            About
          </LinkContent>
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        
        <LinkContent variant="body2" px={2}>
          Privacy
        </LinkContent>

        <Typography variant="body2">
          {new Date().getFullYear()}
        </Typography>

      </StyledToolbar>

    </StyledContent>
  );
}
