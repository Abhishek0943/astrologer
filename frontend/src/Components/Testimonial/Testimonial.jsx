import React from 'react'
import styles from "./Testimonial.module.css"
import { FaStar } from "react-icons/fa";
function Testimonial() {
    return (<>
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.imageCon}>

                </div>
                <div>
                    <h6>Jon Do</h6>
                    <Start />
                </div>
            </div>
            <p>This is an amazing app to explore and learn about yourself. I experienced how beautifully psyschic reader explains to me about my career path, and the predictions are surprisingly accurate. Great Job!!.</p>
        </div>
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.imageCon}>

                </div>
                <div>
                    <h6>Jon Do</h6>
                    <Start />
                </div>
            </div>
            <p>It was really helpful. Finally, after reading my love predictions, I let go of my ex-boyfriend knowing he no longer felt anything for me. I feel better now. Thankyou Ko-syschic.
            </p>
        </div>
        <div className={styles.card}>
            <div className={styles.top}>
                <div className={styles.imageCon}>

                </div>
                <div>
                    <h6>Jon Do</h6>
                    <Start />
                </div>
            </div>
            <p>It's is a good app, I personally chat with Rio about my personal life, "Rio's talent as a tarot reader is truly amazing. His patience in listening to my concern and providing me accurate predictions has been invaluable. Rio not only gives me insightful advice, but also gives me the confidence to transform my life for the better. Since seeking his guidance, I have noticed significant improvement and shift toward postivity. Thankyou Ko-syschic and speacial thanks to Rio.</p>
        </div>

    </>
    )
}
const Start = () => {
    return (
        <>
            <div>
                {[...Array(5)].map((_, i) => (
                    <FaStar color="#ffca00" />
                ))}
            </div>
        </>
    )
}
export default Testimonial
