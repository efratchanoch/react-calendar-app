import { fetchMonthData } from '../calendarSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Day from '../Day/Day.jsx';
import './Calendar.css';

export default function Calendar() {

    const dispatch = useDispatch();
    const { monthData, loading } = useSelector((state) => state.calendar);

    useEffect(() => {
        const now = new Date();
    
        dispatch(fetchMonthData({
            month: now.getMonth() + 1,
            year: now.getFullYear()
        }));
    }, [dispatch]);

    if (loading) return <div>טוען לוח שנה...</div>;

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


