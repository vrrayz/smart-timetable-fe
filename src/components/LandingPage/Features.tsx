import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { SCREENS } from "@/screens";

export const Features = () => {
  return (
    <FeatureSection className="p-8">
      <div className="max-w-5xl mx-auto">
        <FeaturesDisplay className="py-10">
          <Feature className="mulish-bold text-dark-slate-gray hover:text-dark-green tracking-wider text-lg">
            <Image
              src={"/images/icons/scheduler.png"}
              alt="schedule icon"
              width={50}
              height={50}
            />
            <span className="my-auto">Scheduling</span>
          </Feature>
          <Feature className="mulish-bold text-dark-slate-gray hover:text-dark-green tracking-wider text-lg">
            <Image
              src={"/images/icons/tasks.png"}
              alt="schedule icon"
              width={50}
              height={50}
            />
            <span className="my-auto">Tasks</span>
          </Feature>
          <Feature className="mulish-bold text-dark-slate-gray hover:text-dark-green tracking-wider text-lg">
            <Image
              src={"/images/icons/reminder.png"}
              alt="schedule icon"
              width={50}
              height={50}
            />
            <span className="my-auto">Reminders</span>
          </Feature>
        </FeaturesDisplay>
        <FeatureDescriptionDisplay className="py-10">
          <Image
            src={"/images/student.jpg"}
            alt="Student"
            width={330}
            height={495}
            className="my-auto"
          />
          <FeatureDescriptionList>
            <FeatureDescription>
              <Badge className="bg-teal">
                <Image
                  src={"/images/icons/scheduler_white.png"}
                  alt="schedule icon"
                  width={18}
                  height={18}
                />
                <span className="my-auto">Scheduling</span>
              </Badge>
              <h3 className="mulish-bold text-2xl text-dark-green">
                School planner and organizer
              </h3>
              <p className="mulish-regular text-dark-green tracking-wider leading-relaxed">
                The MyStudyAssistant planner app supports rotation schedules, as
                well as traditional weekly schedules. MSA allows you to enter
                your school subjects, organize your workload, and enter
                information about your classes – all so you can effortlessly
                keep on track of your school calendar.
              </p>
            </FeatureDescription>
            <FeatureDescription>
              <Badge className="bg-teal">
                <Image
                  src={"/images/icons/tasks_white.png"}
                  alt="schedule icon"
                  width={18}
                  height={18}
                />
                <span className="my-auto">Tasks</span>
              </Badge>
              <h3 className="mulish-bold text-2xl text-dark-green">
                Task tracker
              </h3>
              <p className="mulish-regular text-dark-green tracking-wider leading-relaxed">
                Become a master of task management by tracking every single task
                with our online planner – no matter how big or small.
              </p>
            </FeatureDescription>
            <FeatureDescription>
              <Badge className="bg-teal">
                <Image
                  src={"/images/icons/reminder_white.png"}
                  alt="schedule icon"
                  width={18}
                  height={18}
                />
                <span className="my-auto">Reminders</span>
              </Badge>
              <h3 className="mulish-bold text-2xl text-dark-green">
                Reminders
              </h3>
              <p className="mulish-regular text-dark-green tracking-wider leading-relaxed">
                Stay on top of your workload by receiving notifications of
                upcoming classes, assignments or exams, as well as incomplete
                tasks, on all your devices.
              </p>
            </FeatureDescription>
          </FeatureDescriptionList>
        </FeatureDescriptionDisplay>
      </div>
    </FeatureSection>
  );
};
const FeatureSection = styled.section``;
const FeaturesDisplay = styled.div`
  display: grid;
  gap: 32px;
  ${SCREENS.md} {
    grid-template-columns: 1fr 1fr;
  }
  ${SCREENS.lg} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const Feature = styled.div`
  display: flex;
  justify-content: start;
  gap: 24px;
  box-shadow: 0px 6px 14px 7px #0000001c;
  padding: 16px 24px;
  border-radius: 14px;
`;
const FeatureDescriptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const FeatureDescriptionDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  ${SCREENS.md}{
    flex-direction: row;
  }
`;
const FeatureDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Badge = styled.div`
  display: flex;
  width: fit-content;
  padding: 8px 24px;
  border-radius: 24px;
  color: #fff;
  gap: 6px;
  padding-left: 18px;
  font-size: 0.85rem;
`;
