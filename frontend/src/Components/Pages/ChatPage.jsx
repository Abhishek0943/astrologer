import React, { useEffect, useRef, useState } from 'react'
import { FetchMessage, SendMessage, StopChat } from '../../api/chatReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { AiOutlineSend } from 'react-icons/ai'
import { IoHome } from "react-icons/io5";
import { TokenLogin } from '../../api/userLogInReducer'
function ChatPage({ socketRef, astro, setAstro }) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { allMessages } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.userLog)
    const [content, setContent] = useState("")
    const [rating, setRating] = useState(0)
    useEffect(() => {
        dispatch(FetchMessage({ id }))
    }, [id, dispatch])
    const [time, setTime] = useState(0)
    const [stop, setStop] = useState(astro?._id ? false : true)
    const [model, setModel] = useState(false)
    const [t, setT] = useState(0)
    const scrollableDivRef = useRef(null);
    useEffect(() => {
        if (scrollableDivRef.current) { scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight }
    }, [allMessages]);
    useEffect(() => {
        let interval = null;
        console.log("user " + user.balance)
        console.log("astro " + astro.chargePrise)
        const a = Math.floor(user.balance / astro.chargePrise)
        console.log(a)
        if (!stop && astro?._id) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    console.log(a)
                    if (a * 60 < prevTime) {
                        setStop(true)
                        setModel(true)
                        clearInterval(interval);
                        return prevTime;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        }
        else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [stop, astro, user]);
    useEffect(() => {

        if (user?._id && astro?._id) {
            socketRef.current.on("stoppedChat", () => {
                setStop(true)
                alert("Chat has been ended from astrologer side ")
            })
        }
    }, [astro])
    const navigate = useNavigate()
    const [comment, setComment] = useState("")
    const [c, setc] = useState(0)
    const [send, setSend] = useState(true)
    const stopChatFun = () => {
        if (c === 0) {
            setc(1)
            dispatch(StopChat({ comment, rating, astroId: astro?._id, userId: user._id, time: time - 5, price: astro.chargePrise })).then((e) => {
                e.payload.success && setAstro({})
            })
            socketRef.current.emit("stopChat", { id: astro?._id })
        }
        setTime(0)
    }
    useEffect(() => {
        model && setInterval(() => {
            setT((prevTime) => {
                return prevTime + 1;
            });
        }, 1000);
    }, [model])
    useEffect(() => {
        if (t > 10) {
            setModel(false)
            if (c === 0) {
                setc(1)
                dispatch(StopChat({ astroId: astro?._id, userId: user._id, time: time - 5, price: astro.chargePrise })).then((e) => {
                    e.payload.success && setAstro({})
                })
                socketRef.current.emit("stopChat", { id: astro?._id })
            }
            setTime(0)
        }
    }, [t])
    return (<>
        {
            model && <>
                <div style={{ position: "absolute", zIndex: "20", top: "0px ", left: "0px", height: "100vh", width: "100vw", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ height: "auto", display: "flex", flexDirection: "column", gap: "10px", color: "white", maxWidth: "500px", width: "90%", backgroundColor: "var(--white)", padding: "20px", borderRadius: "10px" }}>
                        <p style={{ color: "var(--dark)", fontSize: "22px", fontWeight: "600" }}>Do you want to submit Feedback? </p>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "10px" }}>
                            <Star rating={rating} setRating={setRating} />
                        </div>
                        <input type="text" value={comment} onChange={(e) => {
                            setComment(() => {
                                setT(0)
                                return e.target.value
                            })
                        }} style={{ border: "2px solid black", outline: "none", borderRadius: "4px", padding: "5px 10px" }} />
                        <div style={{ width: "100%", display: "flex", gap: "20px", justifyContent: "flex-end" }}>
                            <div onClick={() => {
                                setModel(false)
                                stopChatFun()
                            }} style={{ border: "2px solid var(--dark)", backgroundColor: "var(--dark)", alignSelf: "center", padding: "6px 15px", cursor: "pointer", fontSize: "20px", textTransform: "capitalize", borderRadius: "6px" }}>
                                submit
                            </div>
                            <div onClick={() => {
                                setModel(false)
                                if (c === 0) {
                                    setc(1)
                                    dispatch(StopChat({ astroId: astro?._id, userId: user._id, time, price: astro.chargePrise })).then((e) => {
                                        e.payload.success && setAstro({})
                                        navigate(-1)
                                    })
                                    socketRef.current.emit("stopChat", { id: astro?._id })
                                }
                                setTime(0)
                            }} style={{ border: "2px solid var(--dark)", color: "var(--dark)", alignSelf: "center", padding: "6px 15px", cursor: "pointer", fontSize: "20px", textTransform: "capitalize", borderRadius: "6px" }}>
                                Close
                            </div>
                        </div>

                    </div>
                </div>

            </>
        }
        <div style={{ position: "absolute", top: "0px ", left: "0px", padding: "50px", height: "100vh", width: "100vw", background: "var(--bg-white)", display: "flex", justifyContent: "center" }}>
            <div className='' style={{ flex: "1", display: "flex", flexDirection: "column", height: "100%", maxWidth: "1200px", width: "100%" }}>
                <div style={{ display: "flex", backgroundColor: "#eeeeee", padding: "5px 20px ", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ height: "50px", width: "50px", background: "red", borderRadius: "50%", cursor: "pointer", overflow: "hidden", }}>
                            <img src={astro?.avatar?.url} style={{ width: "100%" }} />
                        </div>
                        <div>
                            <div style={{ fontSize: "20px" }} >{astro.name}</div>
                            <div style={{ fontSize: "14px", color: "gray" }}>{astro.isOnline && "Online"}</div>
                        </div>
                    </div>
                    <div style={{ height: "50px", display: "flex", alignItems: "center", gap: "10px" }}>
                        {
                            !stop ?
                                <div onClick={() => {
                                    setStop(true)
                                    setModel(true)
                                    socketRef.current.emit("stopTime", { id: astro?._id })

                                }} style={{ backgroundColor: "var(--yellow)", borderRadius: "6px", cursor: "pointer", padding: "6px 10px" }}>
                                    stop
                                </div> : <div onClick={() => {
                                    navigate("/search")
                                    const tokenHandler = async () => {
                                        const token = await localStorage.getItem("token")
                                        if (token) {
                                            dispatch(TokenLogin({ token }))
                                        }
                                    }
                                    tokenHandler()
                                }} style={{ background: "var(--yellow)", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "15px" }}><span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Back To Home</span> <IoHome size={25} style={{ color: "var(--dark)" }} /></div>
                        }

                        <div style={{ backgroundColor: "var(--bg-white)", borderRadius: "6px", cursor: "pointer", padding: "6px 10px" }}>
                            <span className="digits">
                                {("0" + Math.floor((time / 60) % 60)).slice(-2)}:
                            </span>
                            <span className="digits">
                                {("0" + Math.floor((time) % 60)).slice(-2)}
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%", height: "100%", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "end", padding: "10px", paddingTop: "0px", gap: "3px", background: "white" }}>
                    <div ref={scrollableDivRef} style={{ overflowY: "scroll", display: "flex", flexDirection: "column", gap: "10px" }}>
                        {allMessages?.map((e) => (<div style={{ margin: "0px 10px", gap: "2px", display: "flex", flexDirection: "column", alignItems: user._id === e.sender ? "flex-end" : "flex-start", maxWidth: "85%", alignSelf: user._id === e.sender ? "flex-end" : "flex-start", }}
                        >
                            <p style={{ backgroundColor: user._id !== e.sender ? "#ffcaca" : "#cacaff", padding: "6px 15px", borderRadius: "6px", fontSize: "16px" }}>
                                {e.content}
                            </p>
                            <p style={{ color: "black", fontSize: "12px" }}>{e.createdAt.split("T").slice(0, 1)}  {new Date(e.createdAt).getHours()}:{new Date(e.createdAt).getMinutes()}</p>
                        </div>
                        ))}
                    </div>

                </div>
                {
                    !stop && astro._id &&
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "2px 0px ", borderRadius: "3px", overflow: "hidden" }}>

                        <div style={{ display: "flex", alignItems: "center", width: "100%", padding: "8px 10px ", gap: "10px", borderRadius: "3px", backgroundColor: "white" }} >
                            <input
                                onKeyDown={(e) => {
                                    if (content) {
                                        if (e.key === "Enter" && astro._id && send) {
                                            setSend(false)
                                            dispatch(SendMessage({ content, myId: user._id, userId: astro._id, chatId: id })).then((e) => {
                                                setSend(true)
                                                if (e.payload.success) {
                                                    setContent("")
                                                    socketRef.current.emit("new message", e.payload.message)
                                                }
                                            })
                                        }
                                    }
                                }}
                                type="text" value={content} onChange={(e) => setContent(e.target.value)} style={{ backgroundColor: "#white", border: "none", outline: "none", flex: "1", paddingLeft: "5px", fontSize: "20px" }} placeholder='text' />

                        </div>
                        <div style={{ height: "100%", width: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", background: "var(--yellow)", cursor: "pointer" }} onClick={(e) => {
                            if (content && send) {
                                setSend(false)
                                dispatch(SendMessage({ content, myId: user._id, userId: astro._id, chatId: id })).then((e) => {
                                    setSend(true)
                                    if (e.payload.success) {
                                        setContent("")
                                        socketRef.current.emit("new message", e.payload.message)
                                    }
                                })
                            }

                        }}>
                            <AiOutlineSend size={30} color='var(--dark)' />
                        </div>
                    </div>
                }
            </div>
        </div >


    </>

    )
}
export const Star = ({ rating, setRating }) => {

    return (
        <>
            {[...Array(5)].map((e, i) => {
                return (
                    <>
                        {(i + 1) > rating ? <FaRegStar onClick={() => setRating(i + 1)} color='black' size={30} /> : <FaStar color='var(--yellow)' size={30} onClick={() => setRating(i + 1)} />}
                    </>
                )
            })}
        </>
    )
}
export default ChatPage
