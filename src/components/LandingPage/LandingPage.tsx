"use client";

import React from "react";
import { Navbar } from "../Navbar";
import { Jumbotron } from "./Jumbotron";
import styled from "styled-components";
import { Features } from "./Features";

export const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Jumbotron />
        <Features />
      </main>
    </>
  );
};

