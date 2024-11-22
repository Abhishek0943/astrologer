import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaArrowLeft, FaBars, FaSearch } from 'react-icons/fa'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CreateChat, FetchChat, FetchMessage } from '../../../api/chatReducer'
import { NavBar } from '../../Component/All'


function ChatSideBar({ children }) {
    const scrollableDivRef = useRef(null);

    const [chats, setChats] = useState([])
    const { allMessages } = useSelector((state) => state.chat)
    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [allMessages]);

    const { user } = useSelector((state) => state.userLog)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isChat, setIsChat] = useState({})
    useEffect(() => {
        isChat._id && dispatch(FetchMessage({ id: isChat._id }))
    }, [isChat])
    useEffect(() => {
        !user._id && navigate("/auth?login=true")
        user?._id && dispatch(FetchChat({ _id: user._id })).then((e) => {
            const a = [...e.payload.chats]
            setChats(a.sort((a, b) => {
                if (a?.latestMessage?.createdAt && b?.latestMessage?.createdAt) {
                    return new Date(b?.latestMessage?.createdAt) - new Date(a?.latestMessage?.createdAt);
                }
                else {
                    return new Date(b?.createdAt) - new Date(a?.createdAt);
                }
            }))
        })
    }, [user])
    useEffect(() => {
        setIsChat({})
    }, [])
    return (
        <>
            <NavBar />
            <div style={{ top: "0px ", left: "0px", padding: "50px", height: "100vh", width: "100vw", background: "var(--bg-white)", display: "flex", justifyContent: "center", overflow: "hidden", borderRadius: "10px", backgroundColor: "white" }}>
                <div style={{ paddingBottom: "20px", width: "350px", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "scroll", gap: "10px", border: "1px solid gray", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px", borderRight: "none" }}>
                    <div style={{ paddingTop: "10px", display: "flex", flexDirection: "column", width: "100%", alignItems: "center", gap: "10px", overflow: "visible" }}>
                        <div onClick={() => navigate(-1)} style={{ cursor: "pointer", alignItems: "center", minHeight: "60px", cursor: "pointer", display: "flex", gap: "10px", backgroundColor: "var(--yellow)", borderRadius: "6px", padding: "6px 15px", width: "90%", alignItems: "center" }}>
                            <FaArrowLeft size={22} />
                            <div style={{ fontWeight: "500", fontSize: "22px" }}>Back </div>
                        </div>
                        {
                            chats?.map((e) => (
                                <div key={e._id} onClick={() => {
                                    setIsChat(e)
                                }} style={{ cursor: "pointer", alignItems: "center", minHeight: "60px", cursor: "pointer", display: "flex", gap: "10px", backgroundColor: "var(--bg-white)", borderRadius: "6px", padding: "6px 15px", width: "90%" }}>
                                    <div style={{ height: "50px", aspectRatio: "1", borderRadius: "50%", backgroundColor: "red", overflow: "hidden" }}>
                                        <img src={e.astro?.avatar?.url} style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />
                                    </div>
                                    <div style={{ flex: "1", overflow: "hidden", }}>
                                        <p>{e?.astro?.name}</p>
                                        <p style={{ whiteSpace: "nowrap", width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}>
                                            {e.latestMessage.content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* <div className="container" style={{ marginTop: "2px", padding: "0px", display: "flex", height: "calc(100vh - 70px)" }}>
                    <motion.div animate={{
                        width: isOpen ? "350px" : "75px", transition: {
                            duration: 0.5,
                            type: "spring",
                            damping: 15
                        }
                    }} style={{ backgroundColor: "var(--white)", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", }}>
                        <div style={{ display: "flex", marginBottom: "10px", backgroundColor: "var(--bg-white)", padding: "5px 20px ", alignItems: "center", justifyContent: "space-between" }}>
                            {
                                isOpen &&
                                <div className='b' style={{ height: "50px", width: "50px", background: "red", borderRadius: "50%", overflow: "hidden", cursor: "pointer" }}>
                                    <img src={user?.avatar?.url} style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />
                                </div>
                            }
                            <div onClick={() => {
                                setIsOpen(!isOpen)
                            }} style={{ height: "50px", display: "flex", alignItems: "center", cursor: "pointer" }}>
                                <FaBars size={30} color='var(--dark)' />
                            </div>

                        </div>
                        <section style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%", overflowY: "scroll", scrollbarWidth: "5px" }}>
                            {chats?.map((rotes) => (
                                <div onClick={() => {
                                    navigate(`/chat/${rotes._id}`)
                                    setId(rotes._id)
                                }} key={rotes._id} style={{ display: "flex", gap: "10px", background: "var(--cta-white)", borderRadius: "4px", cursor: "pointer", padding: "4px 10px", alignItems: "center" }}>
                                    <div className="icon" style={{ color: "white", height: "50px", width: "50px", backgroundColor: "black", borderRadius: "25px", overflow: "hidden" }}> <img src={`${rotes.astro.avatar?.url}`} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} /></div>
                                    <AnimatePresence>
                                        {isOpen && <motion.div variants={showLinkAnimation} initial="hidden" animate="show" exit="hidden" style={{ display: "flex", justifyContent: "space-between", flex: "1", paddingRight: "8px", alignItems: "center" }}>
                                            <div>
                                                <div style={{ fontSize: "20px", color: "var(--bg-dark)", lineHeight: "22px" }} >{rotes.astro.name}</div>
                                                {
                                                    rotes.latestMessage && <div style={{ opacity: "0.8", color: "gray", fontSize: "14px", color: "var(--bg-dark)" }} ><span style={{ fontWeight: "300" }}>{rotes.latestMessage.content}</span></div>
                                                }
                                            </div>
                                        </motion.div>}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </section>
                    </motion.div>
                    {children}
                </div> */}
                </div>
                {isChat._id ?
                    <div style={{ borderLeft: "1px solid gray", height: "100%", width: "100%", border: "1px solid gray", borderLeft: "none", borderTopRightRadius: "10px", overflow: "hidden", borderBottomRightRadius: "10px" }}>
                        <div style={{ width: "100%", height: "70px", display: "flex", position: "sticky", top: "0px", justifyContent: "space-between", padding: "0px 20px", backgroundColor: "var(--cta-white)", textTransform: "capitalize" }}>
                            <div style={{ cursor: "pointer", color: "black", display: "flex", alignItems: "center", gap: "20px" }}>
                                <div style={{ height: "50px", aspectRatio: "1", borderRadius: "50%", background: "red", overflow: "hidden" }}>
                                    <img src={isChat?.astro?.avatar?.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: "700" }}>{isChat?.astro?.name}</p>
                                    {/* <p >{parseFloat(totalEarning.toFixed(2))}</p> */}
                                </div>
                            </div>
                            {/* <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                                {
                                    isChat.astro.isOnline && <div style={{ background: "var(--yellow)", padding: "10px 20px", cursor: "pointer" }}>
                                        Live Chat
                                    </div>
                                }

                            </div> */}
                        </div>
                        <div ref={scrollableDivRef} style={{ height: "calc(100% - 70px)", width: "100%", overflowY: "scroll", }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", minHeight: "100%" }}>
                                {allMessages?.map((e) => (
                                    <div style={{ margin: "0px 10px", gap: "2px", display: "flex", flexDirection: "column", alignItems: user._id === e.sender ? "flex-end" : "flex-start", maxWidth: "85%", alignSelf: user._id === e.sender ? "flex-end" : "flex-start", }}
                                    >
                                        <p style={{ backgroundColor: user._id !== e.sender ? "#ffcaca" : "#cacaff", padding: "6px 15px", borderRadius: "6px", fontSize: "16px" }}>
                                            {e.content}
                                        </p>
                                        <p style={{ color: "black", fontSize: "12px" }}>{e.createdAt.split("T").slice(0, 1)}  {new Date(e.createdAt).getHours()}:{new Date(e.createdAt).getMinutes()}:{new Date(e.createdAt).getSeconds()}</p>
                                    </div>
                                ))}
                            </div>



                        </div>

                    </div>
                    : <>
                        <div style={{ border: "1px solid gray", borderLeft: "none", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", flex: "1", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h1 style={{ fontSize: "25px", fontWeight: "700", maxWidth: "440px", width: "95%", textAlign: "center", color: "black" }}>No Chat selected if you want to see chat history then you need to select chat</h1>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default ChatSideBar
