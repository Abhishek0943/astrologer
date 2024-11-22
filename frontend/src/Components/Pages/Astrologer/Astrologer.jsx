import React, { useEffect } from 'react'
import styles from "./astrologer.module.css"
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { FaStar } from "react-icons/fa";
function Astrologer() {
    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);
    return (
        <>
            <Navbar />

            <div className={styles.warper}>
                <div className={styles.whatWeOffer}>
                    <div className={styles.tarot} >
                        <img src="/tarotbg.jpg" style={{ height: "100%", width: "100%" }} alt="" />
                    </div>
                    <div className={styles.mainSection}>
                        <div className={styles.profileImage}></div>
                        <div className={styles.mainDetails}>
                            <h4>name</h4>
                            <p>consultation 200 . experience 10 years</p>
                            <p>Hindi, English</p>
                            <p>**** (40)</p>
                        </div>
                    </div>
                    <div className={styles.bio}>
                        <h4>Catagories :</h4>
                        <div className={styles.categories}>
                            {
                                [...Array(20)].map((_, e) => (
                                    <>
                                        <div className={styles.category}>hasjdgfhajj</div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.bio}>
                        <h4>Bio :</h4>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima dolores optio consequuntur illo aperiam officia vitae, rerum blanditiis animi magnam ratione mollitia alias necessitatibus aut quo tenetur quaerat dignissimos quasi!
                    </div>
                    <div className={styles.bio} style={{ width: "100%" }}>
                        <h4>Review :</h4>
                        <div className={styles.categories} style={{ gap: "30px", marginTop: "20px", flexDirection: "column", }}>
                            {
                                [...Array(20)].map((_, e) => (
                                    <>
                                        <div className={styles.review}>
                                            <div className={styles.reviewTop}>
                                                <div className={styles.reviewImg}></div>
                                                <p>vivek</p>
                                            </div>
                                            <p style={{ marginTop: "10px" }}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></p>
                                            <p>1 / 12 / 2020</p>
                                            <p style={{ color: "#d3d2d2" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci aspernatur iusto, doloribus libero temporibus quas officia, enim vitae consequatur obcaecati repellendus facilis error impedit, exercitationem officiis. Laboriosam, sint rerum fugit non magni consequatur minus est nihil quasi ea, architecto provident qui eum possimus. Ea explicabo accusamus assumenda necessitatibus ducimus iusto!</p>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Astrologer
