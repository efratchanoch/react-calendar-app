import { useSelector } from 'react-redux';
import Day from '../Day/Day.jsx';
import './Calendar.css';

export default function Calendar() {

    const monthData = useSelector((state) => state.calendar.monthData);

    return (
        <div className="calendar-wrapper">
            <div className="calendar-grid">
                {['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'].map(day => (
                    <div key={day} className="grid-header">{day}</div>
                ))}

                {Object.entries(monthData).map(([dateKey, dayInfo]) => (
                    <Day key={dateKey} date={dateKey} details={dayInfo} />
                ))}
            </div>
        </div>
    );
};
