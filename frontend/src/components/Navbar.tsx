import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwipeableDrawer } from "@mui/material";
import BoxHeader from "./BoxHeader";
import "./Navbar.css";
import getNavbarIcon from "../functions/getNavbarIcon";

type NavbarProps = {
  children: string;
};

const Navbar = ({ children }: NavbarProps) => {
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);

  function onItemClick(path: string) {
    setShowDrawer(false);
    navigate(`${path}`);
  }

  return (
    <>
      <div className="navbar-navbar">
        <div
          className="navbar-hamburger-disable"
          onClick={() => setShowDrawer(true)}
        >
          <div />
        </div>
        <header>{children}</header>
      </div>
      <SwipeableDrawer
        PaperProps={{
          sx: {
            px: 5,
            backgroundColor: "#151515",
            color: "var(--yellow)",
          },
        }}
        anchor="left"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        onOpen={() => {}}
      >
        <div
          className="navbar-drawer-hamburger"
          onClick={() => setShowDrawer(false)}
        >
          <div className="navbar-hamburger">
            <div />
          </div>
        </div>
        <div>
          <BoxHeader>Items</BoxHeader>
        </div>
        {[
          { pathName: "Restaurant", path: "/" },
          { pathName: "Movies", path: "/movies" },
        ].map((path, index) => (
          <span
            key={index}
            className="navbar-drawer-el"
            onClick={() => onItemClick(path.path)}
          >
            {getNavbarIcon(path.pathName)}
            {path.pathName}
          </span>
        ))}
        <div>
          <BoxHeader>Info</BoxHeader>
        </div>
        {[
          { pathName: "Location", path: "/location" },
          { pathName: "About Me", path: "/about" },
        ].map((path, index) => (
          <span
            key={index}
            className="navbar-drawer-el"
            onClick={() => onItemClick(path.path)}
          >
            {getNavbarIcon(path.pathName)}
            {path.pathName}
          </span>
        ))}
      </SwipeableDrawer>
    </>
  );
};

export default Navbar;
