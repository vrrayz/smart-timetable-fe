'use client'

import React from "react";
import { TabItems } from "./Tabs";
import { NoItem } from "../NoItem";


interface Props {
  tabItem: TabItems;
}

export const TabBody = ({ tabItem }: Props) => {
  return (
    <NoItem imgName={tabItem} itemName={tabItem} />
  );
};

