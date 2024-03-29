import React, { useState } from 'react';

const DateRangeInput = () => {
  const [dateRange, setDateRange] = useState('');

  const handleChange = (event) => {
    setDateRange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dateRangeInput">Date Range:</label>
      <input
        type="date"
        id="dateRangeInput"
        value={dateRange}
        onChange={handleChange}
      />
    </div>
  );
};

export default DateRangeInput;
