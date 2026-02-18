import { useDispatch } from 'react-redux';
import { addEvent, removeEvent } from '../calendarSlice';
import { useNavigate } from 'react-router-dom';
import './Day.css';

const Day = ({ date, details, isCurrentMonth }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDayClick = () => {
        if (!isCurrentMonth) {
            const clickedDate = new Date(date);
            const newMonth = clickedDate.getMonth() + 1;
            const newYear = clickedDate.getFullYear();

            navigate(`/calendar/${newMonth}/${newYear}`);
            return;
        }

        const eventName = prompt(`הזן אירוע חדש לתאריך ${details.hebrew}:`);
        if (eventName && eventName.trim() !== "") {
            dispatch(addEvent({ date, eventName }));
        }
    };

    const handleRemove = (e, index) => {
        e.stopPropagation();
        if (window.confirm("האם למחוק את האירוע?")) {
            dispatch(removeEvent({ date, index }));
        }
    };

    return (
        <div className="day-card" onClick={handleDayClick}>
            <div className="hebrew-date">{details.hebrew}</div>
            <div className="english-date">{date}</div>

            <div className="events-list">
                {details.events.map((event, i) => (
                    <div key={i} className="event-item">
                        <button className="delete-btn" onClick={(e) => handleRemove(e, i)}>×</button>
                        <span>{event}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Day;