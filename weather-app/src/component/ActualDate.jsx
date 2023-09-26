import React, { useEffect, useState } from 'react'

export default function ActualDate() {

  const [date, setDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000); // Update the date every second

    return () => {
      clearInterval(timer); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <div className='date-infos'>
      <p>{date}</p>
    </div>
  );
}
