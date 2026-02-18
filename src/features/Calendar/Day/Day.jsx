import './Day.css';

const Day = ({ date, details }) => {
  const handleClick = () => {
    if (details.events.length > 0) {
      alert(`אירועים בתאריך ${details.hebrew}:\n${details.events.join('\n')}`);
    } else {
      alert(`אין אירועים בתאריך ${details.hebrew}`);
    }
  };

  return (
    <div className="day-card" onClick={handleClick}>
      <div className="hebrew-date">{details.hebrew}</div>
      <div className="english-date">{date}</div>
      {details.events?.length > 0 && (
        <div className="event-count">{details.events.length} אירועים</div>
      )}
    </div>
  );
};

export default Day; 