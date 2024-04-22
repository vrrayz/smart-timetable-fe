"use client";

import React, { useState } from "react";
import { TabItems, Tabs } from "./Tabs";
import { TabBody } from "./TabBody";

export const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<TabItems>("class");
  return (
    <>
      <Tabs setCurrentTab={setCurrentTab} />
      <TabBody tabItem={currentTab} />
    </>
  );
};
