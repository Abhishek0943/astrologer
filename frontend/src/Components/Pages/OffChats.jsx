import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userGetAllOffChat, userOffChat } from '../../api/userLogInReducer'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { NavBar } from '../Component/All'

function OffChats() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userLog)
    const [chats, setChats] = useState([])
    const [userProfile, setUserProfile] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        user._id && dispatch(userGetAllOffChat({ userId: user._id })).then((e) => {
            e.payload?.success && setChats(e.payload.chat)
        })
    }, [user])
    const [isChat, setIsChat] = useState({})
    const scrollableDivRef = useRef(null);

    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [chats]);

    return (
        <>
            <NavBar />

            <div style={{ top: "0px ", left: "0px", padding: "50px", height: "100vh", width: "100vw", background: "var(--bg-white)", display: "flex", justifyContent: "center", overflow: "hidden", borderRadius: "10px", backgroundColor: "white" }}>

                <div style={{ paddingBottom: "20px", width: "350px", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "scroll", gap: "10px", border: "1px solid gray", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px", borderRight: "none" }} >
                    <div style={{ paddingTop: "10px", display: "flex", flexDirection: "column", width: "100%", alignItems: "center", gap: "10px", overflow: "visible" }}>
                        <div onClick={() => navigate(-1)} style={{ cursor: "pointer", alignItems: "center", minHeight: "60px", cursor: "pointer", display: "flex", gap: "10px", backgroundColor: "var(--yellow)", borderRadius: "6px", padding: "6px 15px", width: "90%", alignItems: "center" }}>
                            <FaArrowLeft size={30} />
                            <div style={{ fontWeight: "700", fontSize: "22px" }}>Back</div>
                        </div>
                        {
                            chats?.map((e) => (
                                <div key={e._id} onClick={() => {
                                    // setUser(e._id)
                                    setIsChat(e)
                                }} style={{ cursor: "pointer", alignItems: "center", minHeight: "60px", cursor: "pointer", display: "flex", gap: "10px", backgroundColor: "var(--bg-white)", borderRadius: "6px", padding: "6px 15px", width: "90%" }}>
                                    <div style={{ height: "50px", aspectRatio: "1", borderRadius: "50%", backgroundColor: "red", overflow: "hidden" }}>
                                        <img src={e.astro?.avatar?.url} style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />
                                    </div>
                                    <div>
                                        <p>{e.astro.name}</p>
                                        <p>
                                            <span>{new Date(e.createdAt).getDate()}</span>-
                                            <span>{new Date(e.createdAt).getMonth() + 1}</span>-
                                            <span>{new Date(e.createdAt).getFullYear()}</span>,  <span>{new Date(e.createdAt).getHours()}</span>:
                                            <span>{new Date(e.createdAt).getMinutes()}</span>

                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                </div>
                {isChat._id ?
                    <div style={{ borderLeft: "1px solid gray", height: "100%", width: "100%", border: "1px solid gray", borderLeft: "none", borderTopRightRadius: "10px", overflow: "hidden", borderBottomRightRadius: "10px" }}>
                        <div style={{ width: "100%", height: "70px", display: "flex", position: "sticky", top: "0px", justifyContent: "space-between", padding: "0px 20px", backgroundColor: "var(--cta-white)", textTransform: "capitalize" }}>
                            <div onClick={() => setUserProfile("profile")} style={{ cursor: "pointer", color: "black", display: "flex", alignItems: "center", gap: "20px" }}>
                                <div style={{ height: "50px", aspectRatio: "1", borderRadius: "50%", background: "red", overflow: "hidden" }}>
                                    <img src={isChat?.astro?.avatar?.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: "700" }}>{isChat.astro.name}</p>
                                </div>
                            </div>
                        </div>
                        <div ref={scrollableDivRef} style={{ height: "calc(100% - 70px)", width: "100%", overflowY: "scroll", }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", minHeight: "100%" }}>
                                {isChat.messages?.map((e) => (
                                    <div style={{ margin: "0px 10px", gap: "2px", display: "flex", flexDirection: "column", alignItems: user._id === e.sender ? "flex-end" : "flex-start", maxWidth: "85%", alignSelf: user._id === e.sender ? "flex-end" : "flex-start", }}
                                    >
                                        <p style={{ backgroundColor: user._id !== e.sender ? "#ffcaca" : "#cacaff", padding: "6px 15px", borderRadius: "6px", fontSize: "16px" }}>
                                            {e.content}
                                        </p>
                                        <p style={{ color: "black", fontSize: "12px" }}>{e.createdAt.split("T").slice(0, 1)}  {new Date(e.createdAt).getHours()}:{new Date(e.createdAt).getMinutes()}:{new Date(e.createdAt).getSeconds()}</p>
                                    </div>

                                ))}
                                <div style={{ width: "100%", display: "flex", padding: "10px 20px", gap: "10px", backgroundColor: "var(--bg-white)", textTransform: "capitalize" }}>
                                    <input value={content}
                                        placeholder='$7/message'
                                        onKeyDown={(e) => {
                                            if (content) {
                                                if (e.key === "Enter") {
                                                    if (user.balance > 7) {
                                                        dispatch(userOffChat({ astroId: isChat.astro._id, userId: user._id, offChatId: isChat._id, content })).then((e) => {
                                                            if (e.payload?.success) {
                                                                setIsChat(e.payload.chat)
                                                                alert("your message send successfully")

                                                            }
                                                            setContent("")
                                                        })
                                                    }
                                                    else {
                                                        navigate(`/profile/${user._id}/wallet?p=addmoney`)
                                                    }
                                                }
                                            }
                                        }}
                                        onChange={(e) => setContent(e.target.value)} type="text" style={{ border: "none", outline: "none", width: "100%", padding: "8px 10px", borderRadius: "6px" }} />
                                    <button onClick={(e) => {
                                        if (content) {
                                            if (user.balance > 7) {
                                                dispatch(userOffChat({ astroId: isChat.astro._id, userId: user._id, offChatId: isChat._id, content })).then((e) => {
                                                    if (e.payload?.success) {
                                                        setIsChat(e.payload.chat)
                                                        alert("your message send successfully")
                                                    }
                                                })
                                                setContent("")
                                            }
                                            else {
                                                navigate(`/profile/${user._id}/wallet?p=addmoney`)
                                            }

                                        }
                                    }} style={{ border: "none", outline: "none", backgroundColor: "var(--yellow)", padding: "6px 15px", borderRadius: "6px", cursor: "pointer" }}>Send</button>
                                </div>
                            </div>



                        </div>

                    </div>
                    : <>
                        <div style={{ border: "1px solid gray", borderLeft: "none", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", flex: "1", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h1 style={{ fontSize: "25px", fontWeight: "700", maxWidth: "440px", width: "95%", textAlign: "center", color: "black" }}>No Chat selected if you want to see chat history then you need to select chat</h1>
                        </div>
                    </>
                }
                {/* {
                    userProfile === "profile" &&
                    <div style={{ padding: "10px", width: "350px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", overflow: "scroll", gap: "10px" }} >
                        <div style={{ width: "90%", margin: "0px auto", aspectRatio: "1", background: "red", borderRadius: "50%", overflow: "hidden" }}>
                            <img src={chats.find((e) => e._id == isChat)?.user?.avatar?.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ width: "98%", backgroundColor: "var(--cta-white)", borderRadius: "6px", padding: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div><strong>Name: </strong>{chats.find((e) => e._id == isChat)?.user?.name}</div>
                            <div><strong>DOB: </strong>{chats.find((e) => e._id == isChat)?.user?.dob}</div>
                            <div><strong>Gender: </strong>{chats.find((e) => e._id == isChat)?.user?.gender}</div>
                            <div><strong>Zodiac: </strong>{chats.find((e) => e._id == isChat)?.user?.zodiac}</div>
                            <div><strong>Birth Place: </strong>{chats.find((e) => e._id == isChat)?.user?.bp}</div>
                            <div><strong>Birth Time: </strong>{chats.find((e) => e._id == isChat)?.user?.bt}</div>
                            <div><strong>Country: </strong>{chats.find((e) => e._id == isChat)?.user?.country}</div>
                        </div>
                    </div>
                }  */}


            </div>
        </>
    )
}

export default OffChats
