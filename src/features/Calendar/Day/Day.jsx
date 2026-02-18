import { useDispatch } from 'react-redux';
import { addEvent } from '../calendarSlice'; 
import './Day.css';

const Day = ({ date, details }) => {
    const dispatch = useDispatch();

    const handleDayClick = () => {
        const eventName = prompt(`הזן אירוע חדש לתאריך ${details.hebrew}:`);

        if (eventName && eventName.trim() !== "") {
            dispatch(addEvent({ date, eventName }));
        }
    };

    return (
        <div className="day-card" onClick={handleDayClick}>
            <div className="hebrew-date">{details.hebrew}</div>
            <div className="english-date">{date}</div>

            <div className="events-list">
                {details.events.map((event, index) => (
                    <div key={index} className="event-item">
                        {event}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Day;