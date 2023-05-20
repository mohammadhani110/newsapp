import * as React from "react";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  useScrollTrigger,
  styled,
} from "@mui/material";
import Menu from 'mdi-material-ui/Menu'

import NavigationDrawer from "../components/NavigationDrawer";

const LogoBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  textAlign: "center",
  padding: ".5rem 0",
  "& img": { maxWidth: "100%", height: "76px" },
}));
const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  padding: "1rem 0 !important",
}));

function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function NavbarMobile() {
  // const classes = useStyles()
  // const scrollPosition = useScrollPosition();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <>
      <HideOnScroll>
        {/* className={`${classes.AppBar} ${scrollPosition>0?"glassmorphism":""}`} */}
        <AppBar position="sticky" color="inherit" elevation={0}>
          <Container>
            <CustomToolbar>
              <LogoBox className="logoBox">
                {/* <img src={logo} alt="logo" height={"76px"} width="auto" /> */}
                logo
              </LogoBox>
              <Box flexGrow={1}></Box>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                onClick={() => setOpenDrawer(true)}
              >
                <Menu />
              </IconButton>

              {openDrawer && (
                <NavigationDrawer open={openDrawer} setOpen={setOpenDrawer} />
              )}
            </CustomToolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
