// this is for getAppointmentsForDay function, but worst coding approach
// const filteredDay = state.days.filter(days => days.name === day);
// const arr = [];
// if (filteredDay.length > 0) {
//   const appointmentsList = filteredDay[0].appointments;
//   for (const id of appointmentsList) {
//     for (const id2 in state.appointments) {
//       if (id.toString() === id2.toString()) {
//         arr.push(state.appointments[id2])
//       }
//     }
//   }
// }
// return arr;

function getAppointmentsForDay(state, day) {
  let appointmentArr = [];
  let filteredAppointments = [];
  for (let objDay of state.days) {
    if (objDay.name === day) {
      appointmentArr = objDay.appointments;
    }
  }
  for (let appointmentID of appointmentArr) {
    filteredAppointments.push(state.appointments[appointmentID]);
  }
  return filteredAppointments;
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const newObj = {};
  for (const interviewer in state.interviewers) {
    if (interviewer.toString() === interview.interviewer.toString()) {
      newObj.student = interview.student;
      newObj.interviewer = state.interviewers[interviewer];
    }
  }

  return newObj;
}

function getInterviewersForDay(state, day) {
  let interviewersArr = [];
  let filteredInteviewers = [];

  for (let objDay of state.days) {
    if (objDay.name === day) {
      interviewersArr = objDay.interviewers;
    }
  }

  for (let interviewerID of interviewersArr) {
    const interviewersVar = state.interviewers[interviewerID];
    if (interviewersVar) {
      filteredInteviewers.push(interviewersVar);
    }
  }

  return filteredInteviewers;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
