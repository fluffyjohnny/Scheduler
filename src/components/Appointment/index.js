import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = `SAVING`;
  const CONFIRM = `CONFIRM`;
  const DELETING = `DELETING`;
  const EDIT = `EDIT`;
  const ERROR_SAVE = `ERROR_SAVE`;
  const ERROR_DELETE = `ERROR_DELETE`;
  const ERROR = `ERROR`;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props
      .bookInterview(props.id, interview)
      .then((res) => {
        transition(SHOW);
      })
      .then((res) => {

      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  }

  function cancel() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then((res) => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          id={props.id}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={() => back()}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === ERROR && (
        <Form
          onCancel={() => back()}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === EDIT && (
        <Form
          onCancel={() => back()}
          onSave={save}
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={`Are you sure you would like to cancel?`}
          onCancel={() => back()}
          onConfirm={cancel}
        />
      )}
      {mode === SAVING && <Status message={`Saving...`} />}
      {mode === DELETING && <Status message={`Deleting...`} />}
      {mode === ERROR_SAVE && (
        <Error
          message={`ERROR SAVING`}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={`ERROR DELETING`}
          onClose={() => back()}
        />
      )}
    </article>
  );
}
