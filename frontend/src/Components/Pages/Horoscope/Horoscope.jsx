import React, { useEffect } from 'react'
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import styles from "./Horoscope.module.css"
import top from "../Privacy/Privacy.module.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo, GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces } from "react-icons/gi";
import { GetHoroscope } from '../../../api/OtherReducer';

function Horoscope() {
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search);
    const q = queryParams.get('q');
    const dispatch = useDispatch()
    const { horoscope } = useSelector((state) => state.other)
    useEffect(() => {
        dispatch(GetHoroscope({ zodiac: q }))
    }, [q])
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
                <div className={top.top}>
                    <div className={top.image}>
                        <div className={top.overlay}>
                            <h3>Get Your Horoscope</h3>
                        </div>
                        <img src="/horoscope.jpeg" className={top.img} alt="Privacy" />
                    </div>
                </div>
                <div className={styles.zodiacContainer} >
                    <div onClick={() => navigate("/horoscope?q=aries")} className={`${styles.zodiac} ${styles.active}`}>
                        <div><GiAries className={`${styles.zodiacSign} ${q === "aries" && styles.active}`} /></div>
                        <p>Aries</p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=taurus")} className={styles.zodiac}>
                        <div><GiTaurus className={`${styles.zodiacSign} ${q === "taurus" && styles.active}`} /></div>
                        <p>Taurus</p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=gemini")} className={styles.zodiac}>
                        <div><GiGemini className={`${styles.zodiacSign} ${q === "gemini" && styles.active}`} /></div>
                        <p>Gemini</p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=cancer")} className={styles.zodiac}>
                        <div><GiCancer className={`${styles.zodiacSign} ${q === "cancer" && styles.active}`} /></div>
                        <p>Cancer</p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=leo")} className={styles.zodiac}>
                        <div><GiLeo className={`${styles.zodiacSign} ${q === "leo" && styles.active}`} /></div>
                        <p>Leo </p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=virgo")} className={styles.zodiac}>
                        <div><GiVirgo className={`${styles.zodiacSign} ${q === "virgo" && styles.active}`} /></div>
                        <p>Virgo</p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=libra")} className={styles.zodiac}>
                        <div><GiLibra className={`${styles.zodiacSign} ${q === "libra" && styles.active}`} /></div>
                        <p>Libra</p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=scorpio")} className={styles.zodiac}>
                        <div><GiScorpio className={`${styles.zodiacSign} ${q === "scorpio" && styles.active}`} /></div>
                        <p>Scorpio</p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=sagittarius")} className={styles.zodiac}>
                        <div><GiSagittarius className={`${styles.zodiacSign} ${q === "sagittarius" && styles.active}`} /></div>
                        <p>Sagittarius</p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=capricorn")} className={styles.zodiac}>
                        <div><GiCapricorn className={`${styles.zodiacSign} ${q === "capricorn" && styles.active}`} /></div>
                        <p>Capricorn</p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=aquarius")} className={styles.zodiac}>
                        <div><GiAquarius className={`${styles.zodiacSign} ${q === "aquarius" && styles.active}`} /></div>
                        <p>Aquarius</p>
                    </div>
                    <div onClick={() => navigate("/horoscope?q=pisces")} className={styles.zodiac}>
                        <div><GiPisces className={`${styles.zodiacSign} ${q === "pisces" && styles.active}`} /></div>
                        <p>Pisces</p>
                    </div>



                </div>
                <hr />
                <h3 style={{ padding: "40px", textTransform: "capitalize" }}>{horoscope?.name} Monthly Horoscope</h3>
                <p style={{ paddingTop: "0px" }}> {horoscope?.general}</p>

                <p><strong>Love and Relationships : </strong> {horoscope?.love}</p>
                <p><strong>Health and Wellness : </strong> {horoscope?.health}</p>
                <p> <strong>Health and Wellness : </strong> {horoscope?.money}</p>
                <p> <strong>Career :</strong> {horoscope?.career}</p>
            </div>
            <Footer />
        </>
    )
}

export default Horoscope
