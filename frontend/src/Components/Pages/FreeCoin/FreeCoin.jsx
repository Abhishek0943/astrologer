import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import styles from "./FreeCoin.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { DailyReward } from '../../../api/OtherReducer';
import { UpdateUserPayload } from '../../../api/userLogInReducer';
function FreeCoin() {
  const { user } = useSelector((state) => state.userLog)
  const dispatch = useDispatch()
  const [time, setTime] = useState(0)
  useEffect(() => {
    if (user._id && user?.collectDate) {
      const a = new Date(user?.collectDate)
      a.setDate(a.getDate() + 1)
      const userDate = a
      setInterval(() => {
        const date = new Date()
        const timeRemaining = userDate - date;
        setTime(timeRemaining)
      }, 1000);
    }
  }, [user])
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  const renderElem = () => {
    const a = new Date(user?.collectDate)
    a.setDate(a.getDate() + 1)
    const userDate = a
    const date = new Date()
    if (date < userDate && user?.collectDate) {
      return (
        <>
          <div>
            <p style={{ textAlign: "center", padding: "0px 0px 10px 0px" }}>Get your next reward after hours</p>
            <div className={styles.collect}>
              <span className="digits">
                {("0" + Math.floor(time / (1000 * 60 * 60))).slice(-2)}:
              </span>
              <span className="digits">
                {("0" + Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).slice(-2)}:
              </span>
              <span className="digits">
                {("0" + Math.floor((time % (1000 * 60)) / 1000)).slice(-2)}
              </span>
            </div>
          </div>

        </>

      )
    }
    else {
      return (
        <div className={styles.collect} onClick={() => dispatch(DailyReward({ id: user._id, strick: !user?.collectDate ? 1 : new Date() - new Date(user.collectDate) < 24 * 60 * 60 * 1000 * 2 ? user.strick + 1 : 1 })).then((e) => {
          if (e.payload.success) {
            dispatch(UpdateUserPayload(e.payload.user))
          }
        })}>
          Collect
        </div>
      )
    }
  }
  return (
    <>
      <Navbar />
      <div className={styles.warper}>
        <div className={styles.contact}>
          <h3>Daily Reward</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione deserunt recusandae itaque iste voluptatibus sint quia cum facilis unde officiis voluptas aliquid doloribus veniam, doloremque architecto, dolorum sequi illum magnam.</p>
        </div>
        <div className={styles.container}>
          {
            [...Array(7)].map((_, i) =>
              <div className={styles.card}>
                <p>Day {i + 1}</p>
                <div className={styles.coinImage}>
                  <img src="/dollar.png" alt="" />
                </div>
                {
                  user?.strick >= i + 1 && new Date() - new Date(user.collectDate) < 24 * 60 * 60 * 1000 * 2 ?
                    <div className={styles.result} >
                      Collected
                    </div> :
                    <div className={styles.result} style={{ backgroundColor: "red" }}>
                      {i === 6 ? "2 Coins " : "1 Coins "}
                    </div>
                }

              </div>
            )
          }
        </div>
        {
          renderElem()
        }
      </div>
      <Footer />
    </>
  )
}

export default FreeCoin
