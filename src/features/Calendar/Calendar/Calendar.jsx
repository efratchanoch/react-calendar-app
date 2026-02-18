import { useSelector } from 'react-redux';
import Day from '../Day/Day';
import './Calendar.css';

export default Calendar = () => {

    const monthData = useSelector((state) => state.calendar.monthData);

    return (
        <div className="calendar-wrapper">
            <div className="calendar-grid">
                {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map(day => (
                    <div key={day} className="grid-header">{day}</div>
                ))}

                {Object.entries(monthData).map(([dateKey, dayInfo]) => (
                    <Day key={dateKey} date={dateKey} details={dayInfo} />
                ))}
            </div>
        </div>
    );
};
