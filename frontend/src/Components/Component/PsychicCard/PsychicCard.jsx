import React from 'react'
import styles from './PsychicCard.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { ChatRequest } from '../../../socket';
import { useNavigate } from 'react-router-dom'

function PsychicCard({ astrologers }) {
  const { user } = useSelector((state) => state.userLog)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className={styles.offerContainer}>
      {
        astrologers.map((e, i) => (
          <div className={styles.psychicCard} onClick={() => navigate(`/astrologer/${e._id}`)}>
            <div className={styles.psychicBanner}>
            </div>
            <div className={styles.psychicImage}>
            </div>
            <div className={styles.psychicReview}>
              <p>175(4.5)</p>
            </div>
            <div className={styles.psychicDetails}>
              <p>{e.name}</p>
              <p>Astrology, Palmistry, Vastu</p>
              <p>Hindi, English, Tamil</p>
              <p>Exp: 3 Years</p>
            </div>
            <div className={styles.psychicCTA}>
              <p>₹ 1000</p>
              <button className={styles.chatButton} onClick={() => {
                dispatch(ChatRequest({ id: e._id, user }))
              }}>Chat</button>
            </div>

          </div>
        ))
      }
    </div>
  )
}

export default PsychicCard
