import React, { useEffect, useState } from 'react'
import styles from "./TerotComp.module.css"
import { useSelector } from 'react-redux';
function TerotComp({ onClick }) {
    const { user } = useSelector((state) => state.userLog)
    const [time, setTime] = useState(0)
    useEffect(() => {
        if (user._id && user?.tarotDate) {
            const a = new Date(user?.tarotDate)
            a.setDate(a.getDate() + 1)
            const userDate = a
            setInterval(() => {
                const date = new Date()
                const timeRemaining = userDate - date;
                setTime(timeRemaining)
            }, 1000);
        }
    }, [user])
    const renderElem = () => {
        const a = new Date(user?.tarotDate)
        a.setDate(a.getDate() + 1)
        const userDate = a
        const date = new Date()
        if (date < userDate && user?.tarotDate) {

            return (
                <button >
                    <span className="digits">
                        {("0" + Math.floor(time / (1000 * 60 * 60))).slice(-2)}:
                    </span>
                    <span className="digits">
                        {("0" + Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).slice(-2)}:
                    </span>
                    <span className="digits">
                        {("0" + Math.floor((time % (1000 * 60)) / 1000)).slice(-2)}
                    </span>
                </button>
            )
        }
        else {
            return (
                <button onClick={onClick}>Get Free Tarot</button>
            )
        }
    }
    return (
        <>
            <div className={styles.warper} style={{ height: "auto", }}>
                <div className={styles.whatWeOffer} >
                    <div className={styles.tarot} >
                        <img src="/tarotbg.jpg" style={{ height: "100%", width: "100%" }} alt="" />
                        <div className={styles.tarotCon}>
                            <h3>Free Tarot</h3>
                            <p>Explore the wisdom of tarot with our free daily card reading. Each day, draw a single card to gain valuable insights into your life’s challenges and opportunities. This simple, no-cost service allows you to connect with the energy of the day and receive personalized guidance. Start each morning with a moment of reflection and discover what the cards have in store for you—completely free, every day.</p>
                            {
                                renderElem()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TerotComp
