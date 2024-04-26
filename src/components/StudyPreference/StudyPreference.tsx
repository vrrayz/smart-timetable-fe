"use client";

import React, { useEffect, useState } from "react";
import { useStudyPrefernceHook } from "./hooks/useStudyPreference";
import { ListItem } from "@/styles";
import { ErrorMessage, Input } from "../Form";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  createStudyPreference,
  updateStudyPreference,
} from "@/actions/studyPreference";
import { StudyPreferenceInterface, TimeFieldsInput } from "@/types";
import { ErrorModal } from "../ErrorModal";
import { millisecondsToTime, timeToMilliseconds } from "@/helpers";

type StudyPreferenceInput = {
  startTime: number;
  endTime: number;
  coursesPerDay: number;
  breaksPerDay: number;
};

type FormNames = "startTime" | "endTime";

export const StudyPreference = () => {
  const { studyPreference, setStudyPreference } = useStudyPrefernceHook();
  const [timeFields, setTimeFields] = useState<TimeFieldsInput>({
    startTime: "00:00",
    endTime: "00:00",
  });
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudyPreferenceInput>({
    reValidateMode: "onSubmit",
  });

  const setTimeValues = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: FormNames
  ) => {
    const millisecondTime = timeToMilliseconds(event.target.value);
    setValue(name, millisecondTime);
    setTimeFields((prev) => {
      return { ...prev, [name]: event.target.value };
    });
  };

  const onSubmit: SubmitHandler<StudyPreferenceInput> = (data) => {
    // =====================================================
    if (studyPreference === undefined || studyPreference === null) {
      createStudyPreference(data).then(async (res) => {
        if (res.statusCode !== 200) setShowErrorModal(true);
        else {
          setStudyPreference(res.message as StudyPreferenceInterface);
        }
      });
    } else {
      updateStudyPreference(data, studyPreference.id).then(async (res) => {
        if (res.statusCode !== 200) setShowErrorModal(true);
        else {
          setStudyPreference(res.message as StudyPreferenceInterface);
        }
      });
    }
  };

  useEffect(() => {
    if (studyPreference) {
      setTimeFields({
        startTime: millisecondsToTime(studyPreference.startTime),
        endTime: millisecondsToTime(studyPreference.endTime),
      });
      setValue("startTime", studyPreference?.startTime);
      setValue("endTime", studyPreference?.endTime);
      setValue("breaksPerDay", studyPreference?.breaksPerDay);
      setValue("coursesPerDay", studyPreference?.coursesPerDay);
    } else {
      setValue("startTime", 0);
      setValue("endTime", 0);
      setValue("breaksPerDay", 0);
      setValue("coursesPerDay", 10);
    }
  }, [setValue, studyPreference]);
  return (
    <div>
      {showErrorModal && (
        <ErrorModal
          title={"Study Preference Update Error"}
          setShowModal={setShowErrorModal}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomListItem>
          <div>
            <h1 className="my-auto">Preferred Study Start Time</h1>
          </div>
          <div className="my-auto max-w-32">
            <Input
              type="time"
              onChange={(event) => setTimeValues(event, "startTime")}
              value={timeFields.startTime}
              required
            />
          </div>
        </CustomListItem>
        <CustomListItem>
          <div>
            <h1 className="my-auto">Preferred Study Stop Time</h1>
          </div>
          <div className="my-auto w-32">
            <Input
              type="time"
              onChange={(event) => setTimeValues(event, "endTime")}
              value={timeFields.endTime}
              required
            />
            <Input
              type="hidden"
              {...register("endTime", {
                validate: (value) =>
                  value > getValues("startTime") ||
                  "The study stop time must be greater than the study start timef",
              })}
            />
            {errors.endTime && (
              <ErrorMessage>{errors.endTime.message}</ErrorMessage>
            )}
          </div>
        </CustomListItem>
        <CustomListItem>
          <div>
            <h1 className="my-auto">Preferred Courses Per Day</h1>
          </div>
          <div className="my-auto max-w-32">
            <Input
              type="number"
              className=""
              {...register("coursesPerDay", {
                required: "Field is required",
                min: { value: 1, message: "Value must be greater than 0" },
              })}
            />
            {errors.coursesPerDay && (
              <ErrorMessage>{errors.coursesPerDay.message}</ErrorMessage>
            )}
          </div>
        </CustomListItem>
        <CustomListItem>
          <div>
            <h1 className="my-auto">
              Percentage study time allocated to breaks
            </h1>
          </div>
          <div className="my-auto max-w-32">
            <Input
              type="number"
              className=""
              {...register("breaksPerDay", {
                required: "Field is required",
                min: { value: 10, message: "Minimum value is 10%" },
              })}
            />
            {errors.breaksPerDay && (
              <ErrorMessage>{errors.breaksPerDay.message}</ErrorMessage>
            )}
          </div>
        </CustomListItem>
        <Input
          type="submit"
          value="Update Preferences"
          className="btn-primary block my-4 ml-auto max-w-48"
        />
      </form>
    </div>
  );
};

const CustomListItem = styled(ListItem)`
  justify-content: space-between;
  padding: 8px;
`;
