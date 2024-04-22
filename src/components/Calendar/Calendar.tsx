"use client"

import React, { useState } from 'react'
import ReactCalendar  from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.css";

export const Calendar = () => {
    const [value, setValue] = useState<Date>(new Date());

    const setDate = (value: any, event: any) => {
      console.log("The target ", event.target);
      console.log("The value ", value);
      setValue(value);
    };
    return (
      <div>
        <ReactCalendar
          onChange={(value, event) => setDate(value, event)}
          value={value}
          locale="en-GB"
        />
        <div>{value.getDate()}</div>
      </div>
    );
}
