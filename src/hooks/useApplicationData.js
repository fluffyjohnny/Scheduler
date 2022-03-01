import { useState, useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  console.log("state: ", state); //
  console.log(
    "count: ",
    getAppointmentsForDay(state, state.day).filter(
      (appointment) => appointment.interview === null
    ).length
  );

  const findDay = (day) => {
    const dayOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    return dayOfWeek[day];
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayOfWeek = findDay(state.day);

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots - 1,
    };
    let days = state.days;
    if (state.appointments[id].interview === null) {
      days[dayOfWeek] = day;
    }

    return axios
      .put(`/api/appointments/${id}`, {
        interview: appointment.interview,
      })
      .then(() => {
        setState({ ...state, appointments, days });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayOfWeek = findDay(state.day);
    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1,
    };
    let days = state.days;
    days[dayOfWeek] = day;

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}
