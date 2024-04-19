"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { SCREENS } from "@/screens";
import { menuItems } from "@/data/menuitems";

import Image from "next/image";
import { GRADIENT_BG } from "@/styles";

export interface MenuItem {
  title: string;
  isDropdown: boolean;
  link?: string;
  items: {
    item: string;
    link: string;
  }[];
}

interface ListItemProps {
  menuItem: MenuItem;
}

export const Navbar = () => {
  const [isNavToggled, setIsNavToggled] = useState(false);
  return (
    <NavbarContainer>
      <Image
        src={"/images/logo.png"}
        width={361}
        height={69}
        alt={"Logo"}
        className="logo"
      />
      {/* <Image src={'/images/logo.webp'} width={200} height={94} alt={'Logo'} /> */}
      <ToggleMenuContainer>
        <MobileNavToggler
          className={`${isNavToggled && "transformed"}`}
          onClick={() => setIsNavToggled(!isNavToggled)}
        >
          <TogglerItem
            className={`${isNavToggled && "transformed"}`}
          ></TogglerItem>
          <TogglerItem
            className={`${isNavToggled && "transformed"}`}
          ></TogglerItem>
          <TogglerItem
            className={`${isNavToggled && "transformed"}`}
          ></TogglerItem>
        </MobileNavToggler>
      </ToggleMenuContainer>
      <NavbarList>
        {menuItems.map((menuItem: MenuItem, i: React.Key) => (
          <ListItem menuItem={menuItem} key={i} />
        ))}
      </NavbarList>
      <Sidebar isNavToggled={isNavToggled} />
    </NavbarContainer>
  );
};

const ListItem = ({ menuItem }: ListItemProps) => {
  return (
    <li className={menuItem.isDropdown ? `dropdown` : ``}>
      <a href={menuItem.link}>{menuItem.title}</a>
      {menuItem.isDropdown && (
        <ul className={`dropdown-items`}>
          {menuItem.items.map((item, j) => (
            <li key={j}>
              <a href={item.link}>{item.item}</a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const NavbarContainer = styled.div`
  padding: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 0px 0px 8px;
  font-size: 0.85rem;
  position: fixed;
  width: 100vw;
  background: rgb(0, 36, 0);
  background: ${GRADIENT_BG};
  z-index: 100000;

  .logo {
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    flex-flow: column;
    margin: auto 0;
    margin-left: 16px;
  }
  ${SCREENS.lg} {
    display: grid;
    // justify-content: center;
    grid-template-columns: 180px 1fr;
    padding: 0px 12px;
  }
  ${SCREENS.xl} {
    display: flex;
    justify-content: space-around;
    .logo {
      margin: 0;
    }
  }
`;
const ToggleMenuContainer = styled.div`
  display: flex;
  justify-content: end;

  a.nav-button {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  ${SCREENS.lg} {
    display: none;
  }
`;
const MobileNavToggler = styled.div`
  width: 40px;
  height: 40px;
  margin: auto 0px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  cursor: pointer;
  transition: padding 200ms;
  z-index: 100;
  &.transformed {
    padding: 8px 0px;
  }
`;
const TogglerItem = styled.div`
  width: 26px;
  height: 3px;
  background: #fff;
//   box-shadow: 1px 0px 3px #663399;
  margin: auto;
  border-radius: 25%;
  transition: margin 200ms, transform 200ms;
  &:nth-child(3) {
    width: 13px;
    margin-right: 7px;
    margin-bottom: 9px;
  }
  &:nth-child(1) {
    width: 13px;
    margin-left: 7px;
    margin-top: 9px;
  }
  &.transformed:nth-child(3) {
    margin-right: 9px;
    margin-bottom: 5px;
    transform: rotate(45deg);
  }
  &.transformed:nth-child(1) {
    margin-left: 9px;
    margin-top: 5px;
    transform: rotate(45deg);
  }
  &.transformed:nth-child(2) {
    transform: rotate(-45deg);
  }
`;
const NavbarList = styled.ul`
  display: none;
  grid-template-columns: repeat(${menuItems.length}, 1fr);
  text-align: center;
  font-weight: 200;
  color: #fff;
  li {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  li:hover {
    background-color: #051f80;
    color: #fff;
  }
  li a {
    padding: 16px 0px;
  }
  ${SCREENS.lg} {
    display: flex;
    justify-content: end;
    gap: 32px;
  }
  ${SCREENS.xl} {
    li a {
      padding: 16px;
    }
  }
  li.dropdown .dropdown-items {
    position: absolute;
    top: 50px;
    background: #fff;
    color: #000;
    text-align: left;
    max-height: 0px;
    overflow: hidden;
    width: 200px;
    transition: max-height 250ms;
  }
  li.dropdown:hover .dropdown-items {
    max-height: 400px;
  }
`;
const SearchContainer = styled.div`
  display: none;

  justify-content: center;
  flex-flow: column;
  margin: auto;
  ${SCREENS.lg} {
    display: flex;
  }
  ${SCREENS.xl} {
    margin: 0;
    margin-right: auto;
  }
`;
