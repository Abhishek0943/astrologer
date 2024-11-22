import React, { useEffect, useState } from 'react'
import TarotComp from '../../TarotHeadCom/TerotComp';
import styles from "./Terot.module.css"
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { useDispatch, useSelector } from "react-redux"
import { GetTarot } from '../../../api/OtherReducer';
import { UpdateUserPayload } from '../../../api/userLogInReducer';
function Tarot() {
  const dispatch = useDispatch();
  const [troat, setTroat] = useState({})
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  const { user } = useSelector((state) => state.userLog)
  return (
    <>
      <Navbar />
      <hr />
      <TarotComp onClick={() => {
        dispatch(GetTarot({ id: user._id })).then((e) => {
          if (e.payload.success) {
            dispatch(UpdateUserPayload(e.payload.user))
            setTroat(e.payload.tarot)
            console.log(e.payload.tarot)
          }
        })
      }} />
      {
        troat._id && <>
          <hr />
          <div className={styles.warper}>
            <div className={styles.whatWeOffer}>
              <h3>{troat.name}</h3>
              <div className={styles.tarotHead}>
                <div className={styles.tarotImage}><img src="/tarotTest.jpeg" alt="" /></div>
                <div className={styles.tarotInfo}>
                  <h4>{troat.direction} Meaning Guide</h4>
                  <h5>{troat.name} {troat.direction} Tarot Card Key Meanings</h5>
                  <p>{troat.keyMeaning} </p>
                </div>

              </div>
              <h5>General Meaning {troat.direction} </h5>
              <p>{troat.general}</p>
              <h5>Love and Relationships</h5>
              <p>{troat.love}</p>
              <h5>Career</h5>
              <p>{troat.career}</p>
              <h5>Health</h5>
              <p>{troat.health}</p>
            </div>
          </div>
        </>
      }
      <Footer />
    </>
  )
}

export default Tarot
