import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DatePicker() {
  const [selectedDay, setSelectedDay] = useState(new Date);

  return (
    <DayPicker fixedWeeks 
      mode="single"
      selected={selectedDay}
      onSelect={setSelectedDay}
    />
  );
}