import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days } = props;

  const listDays = days.map((day) => (
    <DayListItem
      key={day.id}
      id={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />
  ));

  return <ul>{listDays}</ul>;
}
