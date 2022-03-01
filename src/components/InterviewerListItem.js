import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  // const interviewerName = () => {
  //   if(!props.selected) {
  //     return '';
  //   }
  //   return props.name;
  // }

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
