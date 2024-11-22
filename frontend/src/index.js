import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-multi-carousel/lib/styles.css';

import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Route, Routes, useParams } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux'

// store
import store from './store';
import { TokenLogin, UpdateUserPayload, } from './api/userLogInReducer';

// payment get way
import { PayPalScriptProvider, } from "@paypal/react-paypal-js";

// chat
import { EndChat, Initialize, SendMessage } from './socket';
import { FetchMessage, SessionReview, StopChat } from './api/chatReducer';

// icons
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";



// pages 
import Home from './Components/Pages/HomePage/Home';
import Auth from './Components/Pages/LoginForms/Auth';
import Model from './Components/Component/Model/Model';
import Landing from './Components/Pages/Landing/Landing';
import ProfileSideBar from './Components/Pages/Profile/ProfileSideBar';
import Psychic from './Components/Pages/Psychic/Psychic';
import Tarot from './Components/Pages/Tarot/Tarot';
import Privacy from './Components/Pages/Privacy/Privacy';
import TermAndCondition from './Components/Pages/Privacy/TermAndCondition';
import ContactUs from './Components/Pages/ContactUs/ContactUs';
import Horoscope from './Components/Pages/Horoscope/Horoscope';
import FreeCoin from './Components/Pages/FreeCoin/FreeCoin';
import Astrologer from './Components/Pages/Astrologer/Astrologer';
import Blogs from './Components/Pages/blogs/Blogs';
import Blog from './Components/Pages/blog/Blog';
import { AstroGift, GetGift } from './api/OtherReducer';
import ChatHistory from './Components/Pages/ChatHistory/ChatHistory';


const ClintRoutes = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.userLog)
  const { socketData } = useSelector((state) => state.Socket)
  useEffect(() => {
    const tokenHandler = async () => {
      const token = await localStorage.getItem("token")
      if (token) {
        dispatch(TokenLogin({ token }))
      }
    }
    tokenHandler()
  }, [dispatch, navigate])
  useEffect(() => {
    if (user?._id) {
      dispatch(Initialize({ id: user._id }))
      if (user?.chat?.chatId) {
        navigate(`/chat/${user.chat.chatId}?session=${user.chat.sessionId}`)
      }
    }
  }, [user, dispatch, navigate])
  useEffect(() => {
    if (user?._id) {
      socketData?.on("logout", () => {
        const removeToken = async () => {
          await localStorage.removeItem('token')
          alert("Your account login by  another device.")
          window.location.reload();
        }
        if (!token) {
          removeToken()
        }
      })
      socketData?.on("chatRejected", () => {
        alert("your request  rejected")
      })
      socketData?.on("chatStarts", (user) => {
        if (user._id) {
          dispatch(UpdateUserPayload(user))
        }
      })
    }
  })

  return (
    <>
      <PayPalScriptProvider options={{ "client-id": "AbYDW8hgWPODNKZ1JiwDd2kRzK2M509fQ9Lvmh38V4OCSkLClIZX2Z-WwleLXt0EuUM_qZWSuj6ybZnQ" }}>
        <Model />
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/psychic" element={<Psychic />} />
          <Route exact path="/tarot" element={<Tarot />} />
          <Route exact path="/privacy-policy" element={<Privacy />} />
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/term&condition" element={<TermAndCondition />} />
          <Route exact path="/chat/:id" element={<Chats />} />
          <Route exact path="/horoscope" element={<Horoscope />} />
          <Route exact path="/profile/:id/*" element={<ProfileSideBar />} />
          <Route exact path="/astrologer/:id" element={<Astrologer />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/blog/:id" element={<Blog />} />
          <Route exact path="/free-coin" element={<FreeCoin />} />
          <Route exact path="/chat-history/*" element={<ChatHistory />} />
          {/*
          <Route exact path="/mobile/payment" element={<Rechargeadd />} />
          <Route exact path='/offChats' element={<OffChats />} />
          <Route exact path="/horoscopy" element={<Blog />} />
          <Route exact path="/astrologer/:id" element={<AstrologerPage socketRef={socketRef} />} />
          */}
        </Routes>
      </PayPalScriptProvider>
    </>
  )
}





export const Chats = () => {
  // const [content, setContent] = useState("")
  // const { user } = useSelector((state) => state.userLog)
  // const { messages } = useSelector((state) => state.chat)
  // const [message, setMessage] = useState([...messages])
  // const { socketData } = useSelector((state) => state.Socket)
  // const dispatch = useDispatch()
  // const { gift } = useSelector((state) => state.other)

  // useEffect(() => {
  //   socketData?.on("messageReceive", (user) => {
  //     setMessage((prev) => [...prev, user])
  //   })
  //   return () => {
  //     socketData?.off("messageReceive")
  //   }
  // }, [socketData])


  // const { id: chatId } = useParams()
  // useEffect(() => {
  //   dispatch(FetchMessage({ id: chatId }))
  // }, [chatId, dispatch])
  // useEffect(() => {
  //   dispatch(GetGift())
  // }, [])
  // useEffect(() => {
  //   setMessage([...messages])
  // }, [messages])
  return (
    <>


      <div style={{ height: "100vh", backgroundColor: "#0c1317", zIndex: "100", position: "absolute", width: "100vw", display: "flex", flexDirection: "column" }}>
        {/* <div style={{ width: "95%", display: "flex", maxWidth: "1100px", margin: "auto", padding: "10px 20px", gap: "10px", backgroundColor: "#091216", textTransform: "capitalize" }}>
          <button onClick={() => {
            dispatch(EndChat({
              id: user.chat.astroId, callback: () => {
                dispatch(StopChat({ sessionId: user.chat.sessionId })).then((e) => {
                  if (e.payload.success) {
                    dispatch(UpdateUserPayload(e.payload.user))
                  }
                  else {
                    window.location.reload()
                  }
                  setModel(true)
                })
              }
            }))
          }} style={{ border: "none", outline: "none", backgroundColor: "var(--white-two)", padding: "6px 15px", borderRadius: "6px", cursor: "pointer" }}>End Chat</button>
          {
            !user?.chat?.chatId &&
            <button onClick={() => {
              setModel(true)
            }} style={{ border: "none", outline: "none", backgroundColor: "var(--white-two)", padding: "6px 15px", borderRadius: "6px", cursor: "pointer" }}>Give Review</button>
          }
        </div>
        <div style={{ maxWidth: "1100px", margin: "auto", width: "95%", background: "rgb(34 46 53)", borderRadius: "10px", flex: "1", display: "flex", flexDirection: "column", overflowY: "auto" }}>
          <div style={{ display: "flex", padding: "10px 10px", flexDirection: "column", justifyContent: "flex-end", gap: "5px", flex: "1", }}>
            {message?.map((e, i) => (<div style={{ display: "flex", flexDirection: "column" }} key={e._id}>
              {
                new Date(message[i - 1]?.createdAt).getDate() !== new Date(e.createdAt).getDate() &&
                <div style={{ borderRadius: "5px", background: "#959595", fontSize: "0.8rem", padding: "3px 10px", margin: "auto", position: "relative", }}>{new Date(e.createdAt).toLocaleDateString()}</div>
              }
              <div style={{ margin: "0px 10px", gap: "2px", display: "flex", flexDirection: "column", alignItems: user._id === e.sender ? "flex-end" : "flex-start", maxWidth: "85%", alignSelf: user._id === e.sender ? "flex-end" : "flex-start", }}>
                <p style={{ backgroundColor: user._id !== e.sender ? "#ffcaca" : "#cacaff", fontFamily: "Poppins", padding: "3px 15px", borderRadius: "6px", fontSize: "16px" }}>
                  {e.content}
                </p>
                <p style={{ color: "#bdbdbd", fontSize: "12px", padding: "0px 0px" }}>{new Date(e.createdAt).toLocaleTimeString([], { timeStyle: 'short' })}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: "1100px", margin: "auto", width: "95%", background: "none", borderRadius: "10px", height: "100px", display: "flex", flexDirection: "column", overflowY: "auto" }}>
          <div style={{ display: "flex", gap: "15px", flex: "1", height: "100%", padding: "10px", alignItems: "center" }}>
            {gift.map((e) => {
              return (
                <>
                  <div style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ height: "80%", aspectRatio: '1', }}>
                      <img src={e.img.url} alt="" style={{ aspectRatio: '1', height: "100%", objectiveFit: "cover" }} />
                    </div>
                    <p style={{ color: "white", fontSize: "0.8rem" }}>{e.price}</p>
                  </div>
                </>
              )
            })}
          </div>
        </div>
        <div style={{ maxWidth: "1100px", margin: "auto", width: "95%", display: "flex", padding: "10px 20px", gap: "10px", backgroundColor: "#091216", textTransform: "capitalize" }}>
          <input value={content}
            onKeyDown={(e) => {
              if (e.key === "Enter" && content) {
                const m = {
                  content,
                  sender: user._id,
                  createdAt: new Date(),
                  session: user.chat.sessionId,
                  chat: user.chat.chatId
                }
                setMessage([...message, m])
                dispatch(SendMessage({ message: m, id: user.chat.astroId }))
                setContent("")
              }
            }}
            onChange={(e) => {
              user?.chat?.chatId && setContent(e.target.value)
            }} type="text" style={{ border: "none", outline: "none", width: "100%", padding: "8px 10px", borderRadius: "6px" }} />
          <button onClick={(e) => {
            if (content) {
              const m = {
                content,
                sender: user._id,
                createdAt: new Date(),
                session: user.chat.sessionId,
                chat: user.chat.chatId
              }
              setMessage([...message, m])
              dispatch(SendMessage({ message: m, id: user.chat.astroId }))
              setContent("")
            }
          }} style={{ background: "red", border: "none", outline: "none", padding: "6px 15px", borderRadius: "6px", cursor: "pointer" }}>Send</button>
        </div> */}
        <ChatComp />
      </div >
    </>
  )
}
export const ChatComp = ({ astro }) => {
  const [content, setContent] = useState("")
  const { user } = useSelector((state) => state.userLog)
  const { messages } = useSelector((state) => state.chat)
  const [message, setMessage] = useState([...messages])
  const { socketData } = useSelector((state) => state.Socket)
  const dispatch = useDispatch()
  const { gift } = useSelector((state) => state.other)
  const [model, setModel] = useState(false)
  useEffect(() => {
    socketData?.on("messageReceive", (user) => {
      setMessage((prev) => [...prev, user])
    })
    return () => {
      socketData?.off("messageReceive")
    }
  }, [socketData])


  const { id: chatId } = useParams()
  useEffect(() => {
    dispatch(FetchMessage({ id: chatId }))
  }, [chatId, dispatch])
  useEffect(() => {
    dispatch(GetGift())
  }, [])
  useEffect(() => {
    setMessage([...messages])
  }, [messages])
  return (
    <>
      {
        model && <ReviewModel setModel={setModel} dispatch={dispatch} user={user} />

      }
      <div style={{ width: "95%", display: "flex", maxWidth: "1100px", margin: "auto", padding: "10px 20px", gap: "10px", backgroundColor: "#091216", textTransform: "capitalize" }}>
        <button onClick={() => {
          dispatch(EndChat({
            id: user.chat.astroId, callback: () => {
              dispatch(StopChat({ sessionId: user.chat.sessionId })).then((e) => {
                if (e.payload.success) {
                  dispatch(UpdateUserPayload(e.payload.user))
                }
                else {
                  window.location.reload()
                }
                setModel(true)
              })
            }
          }))
        }} style={{ border: "none", outline: "none", backgroundColor: "var(--white-two)", padding: "6px 15px", borderRadius: "6px", cursor: "pointer" }}>End Chat</button>
        {
          !user?.chat?.chatId &&
          <button onClick={() => {
            setModel(true)
          }} style={{ border: "none", outline: "none", backgroundColor: "var(--white-two)", padding: "6px 15px", borderRadius: "6px", cursor: "pointer" }}>Give Review</button>
        }
      </div>
      <div style={{ maxWidth: "1100px", margin: "auto", width: "95%", background: "rgb(34 46 53)", borderRadius: "10px", flex: "1", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ display: "flex", padding: "10px 10px", flexDirection: "column", justifyContent: "flex-end", gap: "5px", flex: "1", }}>
          {message?.map((e, i) => (<div style={{ display: "flex", flexDirection: "column" }} key={e._id}>
            {
              new Date(message[i - 1]?.createdAt).getDate() !== new Date(e.createdAt).getDate() &&
              <div style={{ borderRadius: "5px", background: "#959595", fontSize: "0.8rem", padding: "3px 10px", margin: "auto", position: "relative", }}>{new Date(e.createdAt).toLocaleDateString()}</div>
            }
            <div style={{ margin: "0px 10px", gap: "2px", display: "flex", flexDirection: "column", alignItems: user._id === e.sender ? "flex-end" : "flex-start", maxWidth: "85%", alignSelf: user._id === e.sender ? "flex-end" : "flex-start", }}>
              <p style={{ backgroundColor: user._id !== e.sender ? "#ffcaca" : "#cacaff", fontFamily: "Poppins", padding: "3px 15px", borderRadius: "6px", fontSize: "16px" }}>
                {e.content}
              </p>
              <p style={{ color: "#bdbdbd", fontSize: "12px", padding: "0px 0px" }}>{new Date(e.createdAt).toLocaleTimeString([], { timeStyle: 'short' })}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: "1100px", margin: "auto", width: "95%", background: "none", borderRadius: "10px", height: "100px", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ display: "flex", gap: "15px", flex: "1", height: "100%", padding: "10px", alignItems: "center" }}>
          {gift.map((e) => {
            return (
              <>
                <div onClick={() => dispatch(AstroGift({ user: user._id, astro: astro?._id, gift: e._id }))} style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ height: "80%", aspectRatio: '1', }}>
                    <img src={e.img.url} alt="" style={{ aspectRatio: '1', height: "100%", objectiveFit: "cover" }} />
                  </div>
                  <p style={{ color: "white", fontSize: "0.8rem" }}>{e.price}</p>
                </div>
              </>
            )
          })}
        </div>
      </div>
      <div style={{ maxWidth: "1100px", margin: "auto", width: "95%", display: "flex", padding: "10px 20px", gap: "10px", backgroundColor: "#091216", textTransform: "capitalize" }}>
        <input value={content}
          onKeyDown={(e) => {
            if (e.key === "Enter" && content) {
              const m = {
                content,
                sender: user._id,
                createdAt: new Date(),
                session: user.chat.sessionId,
                chat: user.chat.chatId
              }
              setMessage([...message, m])
              dispatch(SendMessage({ message: m, id: user.chat.astroId }))
              setContent("")
            }
          }}
          onChange={(e) => {
            user?.chat?.chatId && setContent(e.target.value)
          }} type="text" style={{ border: "none", outline: "none", width: "100%", padding: "8px 10px", borderRadius: "6px" }} />
        <button onClick={(e) => {
          if (content) {
            const m = {
              content,
              sender: user._id,
              createdAt: new Date(),
              session: user.chat.sessionId,
              chat: user.chat.chatId
            }
            setMessage([...message, m])
            dispatch(SendMessage({ message: m, id: user.chat.astroId }))
            setContent("")
          }
        }} style={{ background: "red", border: "none", outline: "none", padding: "6px 15px", borderRadius: "6px", cursor: "pointer" }}>Send</button>
      </div>
    </>
  )
}
const ReviewModel = ({ setModel, dispatch, user }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('session');
  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState("")
  return (
    <div style={{ height: "100vh", width: "100vw", position: "fixed", top: "0px", zIndex: "9999", backgroundColor: "rgba(0, 0,0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "white", height: "auto", gap: "15px", maxWidth: "440px", width: "90%", margin: "auto", borderRadius: "10px", padding: "15px 10px", display: "flex", flexDirection: "column", position: "relative" }}>
        <h2 style={{ fontSize: "22px" }}>Give Review</h2>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", gap: "10px" }}>
          <Star rating={rating} setRating={setRating} />
        </div>
        <IoMdClose style={{ position: "absolute", top: "10px", right: "10px", fontSize: "1.3rem" }} onClick={() => setModel(false)} />
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "10px" }}>
          <textarea rows="3" type="text" value={comment} onChange={(e) => {
            setComment(() => {
              return e.target.value
            })
          }} style={{ border: "2px solid black", outline: "none", borderRadius: "4px", padding: "5px 10px" }} />
        </div>
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => setModel(false)} style={{ padding: "6px 15px", cursor: "pointer", borderRadius: "6px", fontWeight: "500", backgroundColor: "gray", color: "white" }}>Cancel</div>
          <div onClick={() => {
            dispatch(SessionReview({ id, comment, rating, user: user._id })).then((e) => e.payload.success && setModel(false))
          }} style={{ padding: "6px 15px", cursor: "pointer", borderRadius: "6px", background: "red", fontWeight: "500", color: "white" }}>Submit</div>
        </div>
      </div>
    </div>
  )
}
export const Star = ({ rating, setRating }) => {
  return (
    <>
      {[...Array(5)].map((e, i) => {
        return (
          <>
            {(i + 1) > rating ? <FaRegStar onClick={() => setRating(i + 1)} color='red' size={30} style={{ cursor: "pointer" }} /> : <FaStar style={{ cursor: "pointer" }} color='red' size={30} onClick={() => setRating(i + 1)} />}
          </>
        )
      })}
    </>
  )
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/landing" element={<Landing />} />
        <Route path="/*" element={<ClintRoutes />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);