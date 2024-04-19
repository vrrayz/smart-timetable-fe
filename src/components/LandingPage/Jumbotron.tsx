import React from "react";
import styled from "styled-components";
import { LinkedButton } from "@/styles";
import Image from "next/image";

export const Jumbotron = () => {
  return (
    <HeroSection>
      <CustomContainer className="max-w-3xl mx-auto">
        <div></div>
        <div className="text-center p-6">
          <h3 className="mulish-bold text-3xl mb-5 text-dark-green">
            Create Your Ultimate Study Timetable!
          </h3>
          <p className="mulish-regular leading-loose tracking-wider mb-5">
            Craft your ultimate schedule effortlessly with our intuitive study
            timetable generator. Take control of your academic journey and
            achieve success with smart time management starting right here.
          </p>
          <Image
            src={"/images/graduate.png"}
            alt={"Student Picture"}
            width={220}
            height={220}
            className="mx-auto mb-5"
          />
          <LinkedButton>Get Started Now</LinkedButton>
        </div>
      </CustomContainer>
    </HeroSection>
  );
};
const HeroSection = styled.section`
  background: rgb(0, 255, 150);
  background: radial-gradient(
    circle,
    rgba(192, 255, 227, 1) 0%,
    rgba(0, 255, 118, 0.4117296576833859) 100%
  );
  min-height: 80vh;
`;
const CustomContainer = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
`;
