import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Graph.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchDataForDate = (date) => {
    // Replace with actual data fetching logic for the selected date
    // This is just a mock implementation
    const hourLabels = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    const parkedCarsData = [3, 2, 1, 5, 8, 6, 7, 10, 12, 14, 15, 9]; // Mock data

    return {
      labels: hourLabels,
      datasets: [
        {
          label: `Cars Parked on ${date.toDateString()}`,
          data: parkedCarsData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  const data = fetchDataForDate(selectedDate);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Cars Parked per Day',
      },
    },
  };

  return (
    <div className="graph-container">
      <h2>Parking Statistics</h2>
      <div className="date-picker-container">
        <label>Select Date: </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;
