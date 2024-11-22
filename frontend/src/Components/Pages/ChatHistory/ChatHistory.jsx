import React, { useEffect, useState } from 'react'
import styles from "./ChatHistory.module.css"
import Navbar from '../../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom'
import { FetchChat } from '../../../api/chatReducer';
import { FaArrowLeft } from "react-icons/fa6";
import { ChatComp, Chats } from '../../..';
function ChatHistory() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userLog)
    if (!user._id) {
        <Navigate to="/auth?login=true" />
    }
    const { chats } = useSelector((state) => state.chat)
    const navigate = useNavigate()
    useEffect(() => {
        user._id && dispatch(FetchChat({ _id: user._id }))
    }, [user])
    const options = {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    const [active, setActive] = useState({})
    return (
        <><Navbar />
            <hr />
            <div className={styles.warper} >
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.top}>
                            <div className={styles.logo}>Chats</div>
                            <FaArrowLeft />
                        </div>
                        {
                            chats.map((e, i) => (
                                <div className={styles.chat} key={e._id} onClick={() => {
                                    navigate(`/chat-history/${e._id}`)
                                    setActive(e)
                                }}>
                                    <div className={styles.imgCon}>

                                    </div>
                                    <div>
                                        <h4>{e.astro.name}</h4>
                                        <p>{new Date().toLocaleString('en-US', options).replace(',', '')}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.right} style={{ backgroundColor: "#0c1317", display: "flex", flexDirection: "column" }}>
                        <Routes>
                            <Route exact path='/' element={<General />} />
                            <Route exact path='/:id' element={<ChatComp astro={active} />} />

                        </Routes>

                    </div>
                </div>
            </div>
        </>
    )
}
const General = () => {
    return (
        <>

        </>
    )
}
export default ChatHistory
