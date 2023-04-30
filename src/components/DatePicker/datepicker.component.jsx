import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

const CustomDatePicker = () =>{
  const [selectedDate, setSelectedDate] = useState(null);
  
  return (
    <div className="DataPicker">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        isClearable
        calendarClassName="custom-calendar"
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem 0"
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(value)}>
              {Array.from({ length: 12 }, (_, i) => {
                const month = new Date(date.getFullYear(), i);
                return (
                  <option key={i} value={i}>
                    {month.toLocaleDateString("default", { month: "long" })}
                  </option>
                );
              })}
            </select>
            <select
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {Array.from({ length: new Date().getFullYear() - 1970 + 1 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={i} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
      />
    </div>
  );
}

export default CustomDatePicker;
