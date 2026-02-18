import { useLayoutEffect, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMonthData } from '../calendarSlice';
import Day from '../Day/Day.jsx';
import './Calendar.css';

export default function Calendar() {
    const dispatch = useDispatch();
    const { monthData, loading } = useSelector((state) => state.calendar);
    const { month, year } = useParams();
    const [fullDisplayDays, setFullDisplayDays] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (month && year) {
            dispatch(fetchMonthData({
                month: parseInt(month),
                year: parseInt(year)
            }));
        }
    }, [dispatch, month, year]);

    useLayoutEffect(() => {
        const dates = Object.keys(monthData);
        if (dates.length === 0) return;

        const firstDate = new Date(dates[0]);
        const lastDate = new Date(dates[dates.length - 1]);
        const daysArray = [...dates.map(d => ({ date: d, details: monthData[d], current: true }))];

        const startDayOfWeek = firstDate.getDay();
        for (let i = 0; i < startDayOfWeek; i++) {
            const prevDay = new Date(firstDate);
            prevDay.setDate(firstDate.getDate() - (startDayOfWeek - i));
            daysArray.unshift({
                date: prevDay.toLocaleDateString('en-CA'),
                details: { hebrew: "", events: [] },
                current: false
            });
        }

        const endDayOfWeek = lastDate.getDay();
        for (let i = 1; i < (7 - endDayOfWeek); i++) {
            const nextDay = new Date(lastDate);
            nextDay.setDate(lastDate.getDate() + i);
            daysArray.push({
                date: nextDay.toLocaleDateString('en-CA'),
                details: { hebrew: "", events: [] },
                current: false
            });
        }

        setFullDisplayDays(daysArray);
    }, [monthData]);

    const displayTitle = () => {
        if (fullDisplayDays.length === 0) return "";
        const dateObj = new Date(year, month - 1);
        return dateObj.toLocaleString('he-IL', { month: 'long', year: 'numeric' });
    };

    const handleNavigate = (direction) => {
        const current = new Date(year, month - 1);

        current.setMonth(current.getMonth() + direction);

        const newMonth = current.getMonth() + 1;
        const newYear = current.getFullYear();

        navigate(`/calendar/${newMonth}/${newYear}`);
    };

    if (loading) return <div className="loader">טוען לוח שנה...</div>;

    return (
        <div className="calendar-wrapper">
            <div className="calendar-header">
                <button onClick={() => handleNavigate(1)}>{"<"} הבא</button>
                <h2>{displayTitle()}</h2>
                <button onClick={() => handleNavigate(-1)}>הקודם {">"}</button>
            </div>

            <div className="calendar-grid">
                {['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'].map(day => (
                    <div key={day} className="grid-header">{day}</div>
                ))}
                {fullDisplayDays.map((item, index) => (
                    <div key={index} className={item.current ? "" : "not-current-month"}>
                        <Day
                            date={item.date}
                            details={item.details}
                            isCurrentMonth={item.current}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}