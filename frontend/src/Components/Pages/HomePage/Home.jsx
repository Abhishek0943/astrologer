import React, { useEffect, useState } from 'react'
import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom'
import { GetAstrologers } from '../../../api/userLogInReducer';
import { useDispatch, useSelector } from 'react-redux';
import Horoscope from '../../Component/Horoscope/Horoscope';
import { ChatRequest } from '../../../socket';
import { GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo, GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces } from "react-icons/gi";
import Testimonial from '../../Testimonial/Testimonial';
import Blog from '../../HomeBlog/Blog';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import TarotComp from '../../TarotHeadCom/TerotComp';
import PsychicCard from '../../Component/PsychicCard/PsychicCard';
function Home({ socketRef }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { astrologers, user } = useSelector((state) => state.userLog)
  useEffect(() => {
    dispatch(GetAstrologers())
  }, [dispatch])
  return (
    <>
      <Navbar />
      <div className={`${styles.warper}`} style={{ position: "relative", overflow: "hidden", padding: "0px" }}>
        <img src="/starBg.jpeg" alt="" className={`${styles.bannerImage}`} />
        <div className={`${styles.gratian}`}>
        </div>
        <div className={styles.container} style={{ position: "relative", zIndex: "2", }}>
          <h2 style={{  fontSize: "2.5rem" }}>
            Connect with Expert  <span style={{ fontSize: "2.5rem",  color: "red", fontWeight: "700" }}>Astrologers</span><br /> Find Your Path Today </h2>
            <p style={{fontSize:"1.2rem", textAlign:"center", maxWidth:"800px", width:"95%", fontWeight:"400"}}>Whether you're seeking answers about love, career, or life's big decisions, our experienced astrologers are here to guide you. Chat privately, explore your unique horoscope, and unlock the insights you need to navigate your journey with confidence. Discover clarity and peace of mind today.</p>
          <button  className={`${styles.btn} ${styles.btnOutline}`}>Discover More</button>
        </div>
      </div>
      <div className={styles.warper} style={{ height: "auto" }}>
        <div className={styles.whatWeDo} id="secondHomeSection" style={{ padding: "40px 0px" }}>
          <div className={styles.left}>
            <img src="/circle.png" alt="zodiac" />
          </div>
          <div className={styles.right}>
            <h3 style={{ textAlign: "start" }}>What We Do</h3>
            <p>We provide individualized online psychic readings to better understand yourself. Let us help you uncover your individuality in everything from love and relationships to career and health. Our gifted psychics offer insights tailored to your unique situation, guiding you through life's challenges and opportunities. Whether you're seeking clarity, peace of mind, or a deeper connection to your true self, our readings offer the wisdom and support you need.</p>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.warper} style={{ height: "auto" }}>
        <div className={styles.whatWeOffer} style={{}}>
          <h3>Psychic Reader</h3>
          <p style={{ textAlign: "center", width: "80%", margin: "auto", fontSize: "1.2rem", fontWeight: "400", marginTop: "10px" }}>Our skilled astrologers are here to guide you with personalized insights tailored to your life's journey. Whether it's love, career, or personal growth, trust our experts to help you find clarity and direction.</p>
          <PsychicCard astrologers={astrologers.slice(0, 7)} />
          <button onClick={() => navigate(user._id ? `/psychic` : "/auth")} className={styles.ctaButton} style={{ marginTop: "50px", alignSelf: "center" }}>View More</button>
        </div>
      </div>
      <div className={styles.warper} style={{ height: "auto" }}>
        <div className={styles.whatWeOffer} style={{}}>
          <h3>What We offer</h3>
          
          <p style={{ textAlign: "center", width: "80%", margin: "auto", fontSize: "1.2rem", fontWeight: "400", marginTop: "10px" }}>We provide a variety of personalized services designed to meet your unique needs. Discover our most important offerings below and find the guidance that’s right for you.</p>
          <div className={styles.offerContainer}>
            <div className={styles.item}>
              <h4>Horoscope</h4>

              <p>Get accurate information related to your Love Life, Personal Life and Financial Targets on a monthly basis. </p>
            </div><div className={styles.item}>
              <h4>One To One Chat</h4>
              <p>Ask Questions to our psychic readers on one-to-one chat to get more clarity in your life goals</p>
            </div><div className={styles.item}>
              <h4>Free Tarot</h4>
              <p>Explore a fresh outlook on your life, learn about your career, relationships, health, and single status.</p>
            </div><div className={styles.item}>
              <h4>Free Coin</h4>
              <p>Get free coins everyday in your Ko-sychic wallet and get a chance to uncover your true self. </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.warper} style={{ height: "auto" }} >
        <div className={styles.whatWeOffer} style={{}}>
          <h3>Zodiac Sign</h3>
          <p style={{ textAlign: "center", width: "80%", margin: "auto", fontSize: "1.2rem", fontWeight: "400", marginTop: "10px" }}>Choose your zodiac sign based on your birth date to unlock personalized insights and results tailored to your astrological profile. Discover how the stars influence your life and gain valuable guidance specific to your sign.</p>

          <div className={styles.zodiacContainer} >
            <div onClick={() => navigate("/horoscope?q=aries")} className={styles.zodiac}>
              <div><GiAries className={styles.zodiacSign} /></div>
              <p>Aries</p>
            </div>
            <div onClick={() => navigate("/horoscope?q=taurus")} className={styles.zodiac}>
              <div><GiTaurus className={styles.zodiacSign} /></div>
              <p>Taurus</p>
            </div>
            <div onClick={() => navigate("/horoscope?q=gemini")} className={styles.zodiac}>
              <div><GiGemini className={styles.zodiacSign} /></div>
              <p>Gemini</p>
            </div>
            <div onClick={() => navigate("/horoscope?q=cancer")} className={styles.zodiac}>
              <div><GiCancer className={styles.zodiacSign} /></div>
              <p>Cancer</p>
            </div>
            <div onClick={() => navigate("/horoscope?q=leo")} className={styles.zodiac}>
              <div><GiLeo className={styles.zodiacSign} /></div>
              <p>Leo </p>
            </div>
            <div onClick={() => navigate("/horoscope?q=virgo")} className={styles.zodiac}>
              <div><GiVirgo className={styles.zodiacSign} /></div>
              <p>Virgo</p>
            </div>
            <div onClick={() => navigate("/horoscope?q=libra")} className={styles.zodiac}>
              <div><GiLibra className={styles.zodiacSign} /></div>
              <p>Libra</p>
            </div>
            <div onClick={() => navigate("/horoscope?q=scorpio")} className={styles.zodiac}>
              <div><GiScorpio className={styles.zodiacSign} /></div>
              <p>Scorpio</p>
            </div>
            <div onClick={() => navigate("/horoscope?q=sagittarius")} className={styles.zodiac}>
              <div><GiSagittarius className={styles.zodiacSign} /></div>
              <p>Sagittarius</p>
            </div>
            <div onClick={() => navigate("/horoscope?q=capricorn")} className={styles.zodiac}>
              <div><GiCapricorn className={styles.zodiacSign} /></div>
              <p>Capricorn</p>
            </div>
            <div onClick={() => navigate("/horoscope?q=aquarius")} className={styles.zodiac}>
              <div><GiAquarius className={styles.zodiacSign} /></div>
              <p>Aquarius</p>
            </div>
            <div onClick={() => navigate("/horoscope?q=pisces")} className={styles.zodiac}>
              <div><GiPisces className={styles.zodiacSign} /></div>
              <p>Pisces</p>
            </div>



          </div>
        </div>
      </div>
      <div className={styles.warper} style={{ height: "auto", }}>
        <div className={styles.whatWeOffer} style={{}}>
          <h3>Daily Blogs</h3>
          <p style={{ textAlign: "center", width: "80%", margin: "auto", fontSize: "1.2rem", fontWeight: "400", marginTop: "10px" }}>Dive into our latest blog posts for valuable insights and tips on astrology, personal growth, and more. Stay updated with expert advice and explore how to apply astrological wisdom to your everyday life.</p>
          <div className={styles.zodiacContainer}  >
            <Blog />
          </div>
          <button onClick={() => navigate(user._id ? `/blogs` : "/auth")} className={styles.ctaButton} style={{ marginTop: "50px", alignSelf: "center" }}>View More</button>

        </div>
      </div>
      <TarotComp onClick={() => navigate(user._id ? `/tarot` : "/auth")} />
      <div className={styles.warper} style={{ height: "auto", }}>
        <div className={styles.whatWeOffer} style={{}}>
          <h3>Testimonial</h3>
          <p style={{ textAlign: "center", width: "80%", margin: "auto", fontSize: "1.2rem", fontWeight: "400", marginTop: "10px" }}>Hear from our satisfied clients who have experienced transformative insights and guidance through our services. Read their stories and discover how our astrology and psychic readings have made a positive impact on their lives.</p>

          <div className={styles.zodiacContainer} style={{ gap: "30px" }} >
            <Testimonial />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}


export default Home
