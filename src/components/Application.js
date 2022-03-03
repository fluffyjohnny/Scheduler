import React from "react";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointment = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          interviewers={dailyInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
