import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "components/Appointment";

import "components/Application.scss";








export default function Application(props) {
  const [day, setDay] = useState([]);
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    axios.get(daysURL)
      .then((response) => {
        setDays(response.data)
      })
      .catch((err) => {
        console.log(err.message)
      });
  }, []);

  useEffect(() => {
    const appointmentsURL = `http://localhost:8001/api/appointments`;
    axios.get(appointmentsURL)
      .then((response) => {
        setAppointments(response.data)
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err.message)
      });
  }, []);

  // const appointment = appointments.map((appointment) =>
  //   <Appointment key={appointment.id} {...appointment} />
  // )

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
          <DayList
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      {/* <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section> */}
    </main>
  );
}


