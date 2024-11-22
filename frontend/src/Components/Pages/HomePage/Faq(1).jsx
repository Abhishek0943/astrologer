import React, { useState } from 'react'
import styles from './Faq.module.css';
const a = [
    {
        id: 1,
        q: "What is difference between “ASK” and “CHAT” ?",
        a: "When Pyschic Master are online, then you can “CHAT” with Pyschic Master live. This will be one and one live session for which you will be charged on per minute basis. Where as when Psychic Master are offline then you can “ASK” them a message for which you will be charged on per message basis"
    }, {
        id: 2,
        q: "how much time it take to get reply of “ASK” ?",
        a: "“Ask” questions answer are replied within 24 hours"
    }, {
        id: 3,
        q: "What is Pyschic Reading ?",
        a: "In this Pyschic Master read your zodiac sunshine with Vedic method, and give your question answer with remedies"
    }, {
        id: 4,
        q: "How to reach support Team of Unzzip Truth?",
        a: "You can reach us at contact@unzziptruth.com"
    },
]
function Faq() {
    const [active, setActive] = useState(0)
    return (
        <div className={styles.container} id='faq'>
            <h2 style={{ fontSize: "2rem" }}>Frequently Asked Questions</h2>
            <div className={styles.accordion} >
                {
                    a.map((e) => (
                        <div className={styles.accordion_item} key={e.id}>
                            <button id="accordion-button-1" aria-expanded={active === e.id ? true : false} onClick={() => active === e.id ? setActive(0) : setActive(e.id)} >
                                <span className={styles.accordion_title} style={{ fontSize: "1.3rem" }}>{e.q}</span>
                                <span className={styles.icon} aria-hidden="true"></span>
                            </button>
                            <div className={styles.accordion_content} >
                                <p style={{ fontSize: "1.2rem" }}>
                                    {e.a}
                                </p>
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>
    )
}

export default Faq
