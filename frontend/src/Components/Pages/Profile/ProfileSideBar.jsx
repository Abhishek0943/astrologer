import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar';
import styles from './profile.module.css';
import { IoCloseOutline } from "react-icons/io5";
import { Route, Routes, useLocation } from 'react-router-dom';
import { GetRecharge, GetRechargeOffer } from '../../../api/OtherReducer';
import PaymentModel from '../../PaymentModel/PaymentModel';
import GetDate from '../../GetDate/GetDate';
import { ChangePassword, GeneralUpdate, GetCategory } from '../../../api/userLogInReducer';
import { FaArrowLeftLong } from "react-icons/fa6";
function ProfileSideBar({ children }) {
  const { user } = useSelector((state) => state.userLog)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const route = pathname.split("/")[pathname.split("/").length - 1]
  const validRoutes = ["wallet", "recharge", "general", "security"];
  if (!user._id) {
    return (
      <Navigate to={`/auth?login=true`} />
    )
  }
  return (
    <>
      <Navbar />
      <div style={{ borderTop: "1px solid#272727" }} className={styles.wrapper}>
        <div className={`${styles.container} ${styles.mob}`}>
          {
           validRoutes.includes(route) &&
            <div onClick={() => navigate(-1)}>
              <FaArrowLeftLong />
            </div>
          }
          <h2 className={styles.h1}>
            {validRoutes.includes(route) ? route : "general"}
          </h2>
        </div>
      </div>
      <div style={{ borderTop: "1px solid#272727", minHeight: "calc(100vh - 185px)" }} className={styles.wrapper}>
        <div className={`${styles.container} ${styles.main}`}>
          <div className={` ${styles.sideBar} ${!validRoutes.includes(route) && styles.route}`}>
            <ul>
              <li className={`${(route === "general" || !validRoutes.includes(route)) && styles.active} `} onClick={() => navigate(`/profile/${user._id}/general`)}>General</li>
              <li className={`${route === "security" && styles.active} `} onClick={() => navigate(`/profile/${user._id}/security`)}>Security</li>
              <li className={`${route === "wallet" && styles.active} `} onClick={() => navigate(`/profile/${user._id}/wallet`)}>Wallet</li>
              <li className={`${route === "recharge" && styles.active} `} onClick={() => navigate(`/profile/${user._id}/recharge`)}>Recharge</li>
              <li onClick={() => navigate(`/chat-history`)}>Chat History</li>
              <li onClick={() => navigate(`/profile/${user._id}/`)}>Logout</li>
            </ul>
          </div>
          <div className={` ${styles.content} ${!validRoutes.includes(route) && styles.route}`}>
            <Routes>
              <Route exact path='/' element={<General user={user} />} />
              <Route exact path='/general' element={<General user={user} />} />
              <Route exact path='/security' element={<Authentication />} />
              <Route exact path='/wallet' element={<Wallet />} />
              <Route exact path='/recharge' element={<Recharge />} />
            </Routes>
          </div>
        </div>
      </div>

    </>
  )
}
const General = ({ user }) => {
  const [copyUser, setCopyUser] = useState(user)
  const [zodiac, setZodiac] = useState("")
  const [userPreference, setUserPreference] = useState([])
  const handleFormInputs = (e) => {
    setCopyUser({ ...copyUser, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    setUserPreference([...user.preference])
    setCopyUser({ ...user })
  }, [user])
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  useEffect(() => {
    dispatch(GetCategory()).then((e) => e.payload.success && setCategories(e.payload.categories))
  }, [dispatch])
  return (
    <>
      <div className={` ${styles.box}`} style={{ border: "1px solid #272727", }}>
        <div className={` ${styles.boxBottom}`}>
          <p>User Info</p>
          <button onClick={() => dispatch(GeneralUpdate({ id: user._id, name: copyUser.name, dob: copyUser.dob, bt: copyUser.bt, bp: copyUser.bp, zodiac: zodiac ? zodiac : copyUser.zodiac })).then((e) => e.payload.success && alert("your profile updated successfully"))}>Save</button>
        </div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleFormInputs} value={copyUser.name} />
        <label>Date Of Birth</label>
        <div className={` ${styles.date}`}>
          <GetDate setZodiac={setZodiac} setUser={setCopyUser} user={copyUser} />
        </div>
        <label htmlFor="bt">Birth Time</label>
        <input type="time" name="bt" id="bt" onChange={handleFormInputs} value={copyUser.bt} />
        <label htmlFor="bp">Birth place</label>
        <input type="text" name="bp" id="bt" onChange={handleFormInputs} value={copyUser.bp} />
      </div>
      <div className={` ${styles.box}`} style={{ border: "1px solid #272727", }}>
        <div className={` ${styles.boxBottom}`}>
          <p>User Preference</p>
          <button onClick={() => dispatch(GeneralUpdate({ id: user._id, preference: userPreference })).then((e) => e.payload.success && alert("your profile updated successfully"))}>Save</button>
        </div>
        <div className={` ${styles.preferenceBox}`}>
          {
            categories.map((e, i) => (
              <p key={e._id} onClick={() => {
                if (userPreference?.includes(e._id)) {
                  setUserPreference([...userPreference.filter((i) => i != e._id)])
                }
                else {
                  setUserPreference([...userPreference, e._id])
                }
              }} className={` ${styles.myPreference}`} style={{ backgroundColor: userPreference?.includes(e._id) && "green" }}>
                {e.category}
                {
                  userPreference?.includes(e._id) &&
                  <IoCloseOutline />
                }
              </p>
            ))
          }
        </div>
      </div>
    </>
  )
}
const Authentication = () => {
  const [password, setPassword] = useState("")
  const [retype, setRetype] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { id } = useParams()
  return (
    <>
      {/* <div className={` ${styles.box}`} style={{ border: "1px solid#272727", gap: "15px", padding: "0px", }}>
        <label style={{ marginTop: "20px" }}>Email</label>
        <p>Enter your email  </p>
        <input type="text" />
        <div className={` ${styles.boxBottom}`} style={{ borderTop: "1px solid #272727", borderBottom: "none" }}>
          <p>You can use only Gmail, outlook</p>
          <button>Save</button>
        </div>
      </div> */}
      {/* <div className={` ${styles.box}`} style={{ border: "1px solid#272727", gap: "15px", padding: "0px", }}>
        <label style={{ marginTop: "20px" }}>Number</label>
        <p>Enter your email  </p>
        <input type="text" />
        <div className={` ${styles.boxBottom}`} style={{ borderTop: "1px solid #272727", borderBottom: "none" }}>
          <p>You can use only Gmail, outlook</p>
          <button>Save</button>
        </div>
      </div> */}
      <div className={` ${styles.box}`} style={{ border: "1px solid #272727", gap: "15px", padding: "0px", }}>
        <label style={{ marginTop: "20px" }}>Change password</label>
        <p>Enter your new password  </p>
        <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <input type="text" placeholder="Re-type Password" onChange={(e) => setRetype(e.target.value)} value={retype} />
        <p style={{ color: "red", fontWeight: "400" }}>{error}</p>
        <div className={`${styles.boxBottom}`} style={{ borderTop: "1px solid #272727", borderBottom: "none" }}>
          <p></p>
          <button onClick={() => {
            if (password === retype) {
              setError("")
              dispatch(ChangePassword({ id, password })).then((e) => {
                if (e.payload.success) {
                  alert("your password updated successfully")
                  setPassword("")
                  setRetype("")
                }
              })
            }
            else {
              setError("Your password and Confirm password dose not match")
            }
          }}>Save</button>
        </div>
      </div>

    </>
  )
}
const Wallet = () => {
  const [Fa, setFa] = useState(true)
  const { user } = useSelector((state) => state.userLog)
  const dispatch = useDispatch()
  const { recharge } = useSelector((state) => state.other)
  useEffect(() => {
    dispatch(GetRecharge({ id: user._id }))
  }, [dispatch, user._id])
  const options = {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return (
    <>
      <div className={` ${styles.box}`} style={{ border: "1px solid#272727", gap: "15px", padding: "20px", flexDirection: "row", justifyContent: "space-between" }}>
        <label htmlFor="" style={{ margin: "0px" }}>Available coin</label>
        <div style={{ display: "flex", alignItem: 'center', gap: "10px" }}><img height="20px" src="/dollar.png" alt="" /><span >{user.balance}</span></div>
      </div>
      <div className={` ${styles.option}`}>
        <div><input style={{ marginRight: "10px" }} id="wallet" type="radio" checked={!Fa ? false : true} onChange={() => setFa(true)} /><label style={{ cursor: "pointer" }} htmlFor="wallet">Wallet History</label></div>
        <div><input style={{ marginRight: "10px" }} id="recharge" type="radio" checked={Fa ? false : true} onChange={() => setFa(false)} /><label style={{ cursor: "pointer" }} htmlFor="recharge">Recharge History</label></div>
      </div>
      <div className={` ${styles.box}`} style={{ border: "1px solid#272727", gap: "0px", padding: "0px", }}>
        {
          Fa ? <>
            {
              recharge.map((e, i) => (
                <div className={` ${styles.tr}`}>
                  <div>
                    <h4>{e.from}</h4>
                    <p>{new Date(e.createdAt).toLocaleString('en-US', options).replace(',', '')}</p>
                  </div>
                  <p>{e.add ? "+" : "-"}{e.amount} Coin</p>
                </div>
              ))
            }
          </> : <>
            {
              recharge.filter((e) => e.from === "Recharge").map((e, i) => (
                <div className={` ${styles.tr}`}>
                  <div>
                    <h4>{e.from}</h4>
                    <p>{new Date().toLocaleString('en-US', options).replace(',', '')}</p>
                  </div>
                  <p>{e.add ? "+" : "-"}{e.amount} Coin</p>
                </div>
              ))
            }
          </>
        }

      </div>


    </>
  )
}
const Recharge = () => {
  const { user } = useSelector((state) => state.userLog)

  const dispatch = useDispatch()
  const { rechargeOffer } = useSelector((state) => state.other)
  const [show, setShow] = useState(false)
  const [price, setPrice] = useState("")
  useEffect(() => {
    dispatch(GetRechargeOffer())
  }, [dispatch])
  return (
    <>
      <h3 className={` ${styles.h2}`} >Recharge</h3>
      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae temporibus quo possimus esse libero fugit assumenda beatae, alias, rem ipsa reiciendis officia. Expedita dolorum quisquam voluptate aperiam nisi illum totam!</p> */}
      <div className={` ${styles.box}`} style={{ border: "1px solid#272727", gap: "15px", padding: "20px", flexDirection: "row", justifyContent: "space-between" }}>
        <label htmlFor="" style={{ margin: "0px" }}>Available coin</label>
        <div style={{ display: "flex", alignItem: 'center', gap: "10px" }}><img height="20px" src="/dollar.png" alt="" /><span>{user.balance}</span></div>
      </div>
      <div className={` ${styles.offerBox}`}>
        {
          rechargeOffer?.map((e, i) => {
            const discountAmount = e.display - e.price;
            const percentageDiscount = (discountAmount / e.display) * 100;
            return (
              <div key={e._id} className={` ${styles.offer}`} onClick={() => {
                setShow(true)
                setPrice(e.price)
              }}>
                <div className={` ${styles.coin}`}>
                  <img src="/dollar.png" alt="" />
                  <p style={{ fontSize: "1.5rem" }}>{e?.coin}</p>
                </div>
                <div className={` ${styles.priceCon}`}>
                  <h3 className={`${styles.price}`}><span style={{ textDecoration: "line-through", color: "red", fontSize: "1rem" }}>${e?.display}</span> <span>${e?.price}</span></h3>
                  <p className={`${styles.discount}`}>{percentageDiscount}% Off</p>
                </div>
              </div>
            )
          })
        }
      </div>
      {
        show && <PaymentModel setShow={setShow} prise={price} />
      }
    </>
  )
}
export default ProfileSideBar