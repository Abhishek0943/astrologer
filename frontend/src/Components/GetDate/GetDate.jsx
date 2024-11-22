import { useState, useEffect } from 'react'
import { getZodiacSign } from '../../functions'
const GetDate = ({ setZodiac, setUser, user }) => {
    const [date, setDare] = useState({ year: new Date(user.dob).getFullYear() || "2000", month: new Date(user.dob).getMonth()  || "1", date: new Date(user.dob).getDate() || "1" })
    const yearList = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let index = 1950; index <= currentYear; index++) {
            years.push(
                <option key={index} value={index}>
                    {index}
                </option>
            );
        }
        return years;
    };
    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    const daysInMonth = getDaysInMonth(date.month, date.year);
    function handelDate(e) {
        setDare({ ...date, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        setUser({ ...user, dob: new Date(date.year, date.month, date.date) })
        setZodiac(getZodiacSign(Number(date.month), Number(date.date)))
    }, [date])
    return (
        <>
            <div style={{ display: "flex", gap: "10px", margin: "10px 0px" }}>
                <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                    <label htmlFor="year">Year</label>
                    <select name="year" id="year" value={date.year} onChange={handelDate}>
                        {yearList()}
                    </select>
                </div>
                <div style={{ display: "flex", flex: "1", flexDirection: "column" }}>
                    <label htmlFor="month">Month</label>
                    <select name="month" id="month" value={date.month} onChange={handelDate}>
                        {
                            [...Array(12).keys()].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div style={{ display: "flex", flex: "1", flexDirection: "column" }}>
                    <label htmlFor="date">Date</label>
                    <select name="date" id="date" value={date.date} onChange={handelDate}>
                        {
                            [...Array(daysInMonth).keys()].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    )
}

export default GetDate;