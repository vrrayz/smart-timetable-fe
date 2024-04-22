"use client";

import React, { useState } from "react";
import { TabItems, Tabs } from "./Tabs";

export const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<TabItems>("class");
  return (
    <main>
      <Tabs setCurrentTab={setCurrentTab} />
      <h1>The Current Tab is {currentTab}</h1>
    </main>
  );
};
