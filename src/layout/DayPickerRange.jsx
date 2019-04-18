import moment from 'moment';
import React, { useRef } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

const DayPickerRange = props => {

  const toDateRef = useRef(null)
  const { from, to, setFromDate, setToDate } = props
  const defaultFormat = "DD-MM-YYYY"
  
  const showFromMonth = () => {
    if (!from) return

    if (moment(to).diff(moment(from), 'months') < 2) {
      toDateRef.current.getDayPicker().showMonth(from);
    }
  }

  const handleStartChange = startDay => {
    setFromDate(startDay);
  }

  const handleEndChange = endDay => {
    setToDate(endDay)
    showFromMonth()
  }

  const modifiers = { start: from, end: to };

  return (
    <div className="InputFromTo">
      <DayPickerInput
        placeholder={from ? moment(from).format(defaultFormat) : "начало"}
        format={defaultFormat}
        formatDate={formatDate}
        parseDate={parseDate}
        dayPickerProps={{
          selectedDays: [from, { from, to }],
          disabledDays: { after: to },
          toMonth: to,
          modifiers,
          numberOfMonths: 2,
          onDayClick: () => toDateRef.current.getInput().focus(),
        }}
        onDayChange={handleStartChange}
      />
      <span className="InputFromTo-to">
        <DayPickerInput
          ref={toDateRef}
          placeholder={to ? moment(to).format(defaultFormat) : "окончание"}
          format={defaultFormat}
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [to, { from, to }],
            disabledDays: { before: from },
            modifiers,
            month: from,
            fromMonth: from,
            numberOfMonths: 2,
          }}
          onDayChange={handleEndChange}
        />
      </span>
    </div>
  );
}

DayPickerRange.defaultProps = {
  from: '',
  to: '',
}

export default DayPickerRange