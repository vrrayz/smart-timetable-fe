import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SidebarItem } from "./SidebarItem";
import { dashboardMenuItems, menuItems } from "@/data/menuitems";
import { GRADIENT_BG } from "@/styles";
import { logout } from "@/actions";
import { redirect } from "next/navigation";

interface SidebarProps {
  isNavToggled: boolean;
  isDashboardRoute?: boolean;
}

export const Sidebar = ({ isNavToggled, isDashboardRoute }: SidebarProps) => {
  const [sidebarMenuItems, setSidebarMenuItems] = useState(menuItems);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const logoutUser = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    logout().then(res => {
      if (res === "deleted") {
        setShouldRedirect(true)
      }
    })
  }
  useEffect(() => {
    if(isDashboardRoute && shouldRedirect) redirect('/')
    if (isDashboardRoute) setSidebarMenuItems(dashboardMenuItems);
  }, [isDashboardRoute, shouldRedirect]);
  return (
    <SidebarContainer
      className={`${isNavToggled && "transformed"}`}
      onClick={(e) => console.log(e.target)}
    >
      <MainSidebar>
        <div></div>
        <div>
          <ul className="sidebar-list">
            {sidebarMenuItems.map((menuItem, i) => (
              <SidebarItem key={i}>
                <a href={menuItem.link}>{menuItem.title}</a>
              </SidebarItem>
            ))}
            {isDashboardRoute && (
              <SidebarItem>
                <a href={'#'} onClick={(event) => logoutUser(event)}>Logout</a>
              </SidebarItem>
            )}
          </ul>
        </div>
        <div></div>
      </MainSidebar>
    </SidebarContainer>
  );
};
const MainSidebar = styled.div`
  background: rgb(0, 36, 0);
  background: ${GRADIENT_BG};
  width: 75vw;
  right: 0vw;
  transition: right 5s;
  position: relative;
  box-shadow: 0px 0px 2px;
  display: grid;
  grid-template-rows: 55px 2fr 1fr;
  padding: 0px 16px;
  padding-right: 24px;
  color: #fff;
  .sidebar-list {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 1.5px;
    padding: 12px 0px;
  }
  overflow-y: scroll;
`;
const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  justify-content: end;
  background-color: rgba(0, 0, 0, 0.4);
  &.transformed {
    display: flex;
  }
  backdrop-filter: blur(1px);
`;
