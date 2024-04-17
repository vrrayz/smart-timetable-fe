import styled from "styled-components";

export const SidebarItem = styled.li`
  padding: 12px 0px;
  border-bottom: 1px solid #fff;
  display: flex;
  justify-content: space-between;

  &.dropdown {
    justify-content: start;
    flex-direction: column;
  }
  &.dropdown.is-hidden {
    border: none;
  }
  &.dropdown .dropdown-head {
    // border-bottom: 1px solid #fff;
    display: flex;
    justify-content: space-between;
  }
  &.dropdown .dropdown-list {
    padding-left: 12px;
    transition: height 500ms;
    height: 200px;
    overflow: hidden;
  }
  &.dropdown .dropdown-list.is-hidden {
    height: 0px;
    // transition: height 3s;
  }
  svg {
    color: #555;
    font-size: 18px;
    margin-top: 3px;
    margin-right: 3px;
  }
`;