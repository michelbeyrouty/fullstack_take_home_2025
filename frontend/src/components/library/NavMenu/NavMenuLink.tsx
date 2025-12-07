import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

interface IProps extends NavLinkProps {}

export default function NavMenuLink(props: IProps) {
  return <NavLink className={({ isActive }) => (isActive ? "nav-menu-active-link" : undefined)} {...props} />;
}
