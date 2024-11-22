import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GetAstrologers, GetCategory, SearchAstro, offlineChat } from '../../api/userLogInReducer';
import { ClientChat } from '../../api/ChatRequestReducer';
import { NavBar } from '../Component/All';
import { Footer } from '../..';
import { FaXmark } from 'react-icons/fa6';

function SearchPage({ socketRef }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const { astrologers } = useSelector((state) => state.userLog)
  const { AstroRequest } = useSelector((state) => state.astroRequest)
  const [s, sets] = useState({})
  const [m, setM] = useState("")
  const { user } = useSelector((state) => state.userLog)
  useEffect(() => {
    !user?._id && navigate("/")
  }, [user])
  useEffect(() => {
    const a = setInterval(() => {
      dispatch(GetAstrologers())
    }, 15000);
    dispatch(GetAstrologers())
    return () => clearInterval(a)
  }, [dispatch])
  const [category, setCategory] = useState([])
  const [filterCategory, setFilterCategory] = useState([])
  const [e, setE] = useState(false)
  const filterObjectsByCategory = (arrayA, arrayB) => {
    if (arrayA.length <= 0) {
      return arrayB
    }
    else {
      return arrayB.filter(obj => obj.category.some(cat => arrayA.includes(cat)));
    }
  };
  const result = filterObjectsByCategory(filterCategory, astrologers);
  useEffect(() => {
    dispatch(GetCategory()).then((e) => setCategory(e.payload.categories))
  }, [])
  return (
    <>
      <NavBar socketRef={socketRef} />
      <div className='wapper' >
        <div className='container' style={{ display: "flex", flexWrap: "wrap", padding: "50px 50px 20px 50px", alignItems: "baseline", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "30px", color: "var(--dark-blue)" }}>Our Psychic Masters</h3>
          {/* <form style={{
            display: "flex", justifyContent: "center", width: "100%", maxWidth: "500px",
          }}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} name="search" id="search" style={{ border: "2px solid black", margin: "10px 0px", outline: "none", padding: "10px 20px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", borderRight: "0px", width: "100%", fontSize: "16px" }} />
            <button style={{ margin: "10px 0px", padding: "0px 10px", fontSize: "20px", cursor: "pointer", border: "2px solid black", borderTopRightRadius: "5px", borderBottomRightRadius: "5px", backgroundColor: "var(--yellow)", color: "var(--dark)" }} onClick={(e) => {
              e.preventDefault()
              navigate(`/search?q=${search}`)
            }}>Search</button>
          </form> */}
        </div>
        <div className='container'>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
            <label style={{ fontSize: "1.2rem", fontWeight: "500", textTransform: "uppercase" }}>
              categories
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", outline: "none", position: "relative", }}>
              {
                category?.map((e) => <><div
                  onClick={() => {
                    if (filterCategory.includes(e.category)) {
                      const a = [...filterCategory.filter((i) => i !== e.category)]
                      setFilterCategory(a)
                    } else {
                      setFilterCategory([...filterCategory, e.category])
                    }
                  }}
                  style={{ padding: "5px 15px", alignItems: "center", cursor: "pointer", display: "flex", gap: "8px", border: filterCategory.includes(e.category) ? "1px solid green" : "1px solid red", borderRadius: "10px", backgroundColor: filterCategory.includes(e.category) ? "#c6ffc5" : "#ffc5c5" }}>
                  {e.category}
                  {filterCategory.includes(e.category) && <FaXmark />}
                </div ></>)
              }
            </div>


          </div>
        </div>
        <div className='container' className="c" style={{ display: "flex", flexWrap: "wrap", padding: "0 50px 50px 50px" }}>
          {
            result.length > 0 ? <>
              <div className='d' style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", background: "var(--bg-white)", gap: "30px", margin: "10px", backgroundColor: "var(--white)", padding: "50px", boxShadow: "0px 0px 4px gray" }}>
                {
                  result.map((e) => (
                    <div key={e._id} className='card1' style={{ display: "flex", flexDirection: "column", borderRadius: "15px", overflow: "hidden", width: "30%", minWidth: "300px" }}>
                      <div style={{ backgroundColor: "var(--bg-yellow)", flex: "1", display: "flex", flexDirection: "column", padding: "20px 15px 15px 15px", gap: "8px", paddingBottom: "20px", position: "relative" }}>
                        <div style={{ position: "absolute", display: "flex", gap: "5px", alignItems: "center", padding: "5px 10px", border: "1px solid gray", borderRadius: "4px", bottom: "10px", right: "10px" }}>{
                          e.isOnline === "Online" ? <>
                            <div style={{ height: "10px", aspectRatio: "1", background: "green", borderRadius: "50%" }}></div>
                            <span>Online</span>
                          </> : e.isOnline === "Offline" ? <>
                            <div style={{ height: "10px", aspectRatio: "1", background: "gray", borderRadius: "50%" }}></div>
                            <span>Offline</span>
                          </> : <>
                            <div style={{ height: "10px", aspectRatio: "1", background: "red", borderRadius: "50%" }}></div>
                            <span>Busy</span>
                          </>
                        }</div>
                        <div style={{ display: "flex", gap: "5%", alignItems: "flex-start" }}>
                          <div style={{ height: "100px", minWidth: "100px", position: "relative", maxWidth: "100px", backgroundColor: "red", borderRadius: "50%", overflow: 'hidden', }}>
                            <img src={e?.avatar?.url} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <Link to={`/astrologer/${e._id}`} style={{ fontSize: "20px", fontWeight: "700", textTransform: "uppercase" }}>{e.name}</Link>
                            <p>{`(${e.reviews.filter((i) => i.rating).length})`}     {` `}{
                              parseFloat(
                                (
                                  e.reviews
                                    .filter((i) => i.rating)
                                    .reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0) /
                                  e.reviews.filter((i) => i.rating).length
                                ).toFixed(1)
                              ) || 0
                            } </p>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "8px", margin: "10px 0px", flexWrap: "wrap" }}>
                          {
                            e?.category?.length > 0 ? <>
                              {
                                e?.category?.slice(0, 5).map((e) => <>
                                  <p style={{ background: "var(--yellow)", boxShadow: "0px 0px 10px var(--gray)", padding: "5px 15px", borderRadius: "20px " }}>{e}</p>
                                </>)
                              }

                            </> : <>

                              <p style={{ background: "var(--yellow)", boxShadow: "0px 0px 10px var(--gray)", padding: "5px 15px", borderRadius: "20px " }}>Astrologer</p>
                            </>
                          }
                          <p onClick={() => navigate(`/astrologer/${e._id}`)} style={{ background: "gray", boxShadow: "0px 0px 10px var(--gray)", padding: "5px 15px", borderRadius: "20px ", color: "white" }}>More...</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                          <p>{e.experience} years <span>Experience</span></p>
                          <p>{e.consultation} <span style={{ fontWeight: "400" }}>consultations done</span></p>
                        </div>

                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "var(--yellow)", padding: "10px 20px", alignItems: "center" }}>
                        <div style={{ fontSize: "1rem", fontWeight: "600", color: "var(--dark)" }}>
                          {
                            e.isOnline === "Online" ? `$${e?.chargePrise}Per Min` : "$7 Per Question"
                          }

                        </div>
                        <div style={{ background: "var(--dark)", color: "var(--white)", padding: "5px 20px", borderRadius: "3px", cursor: "pointer", textTransform: "uppercase" }} onClick={() => {
                          if (user?.balance >= 3 * 2.51) {
                            if (e.isOnline === "Online") {
                              const x = AstroRequest.find((i) => i._id === e._id)
                              if (!x) {
                                socketRef.current.emit("sendRequest", { astrologerId: e._id, user })
                                dispatch(ClientChat(e))
                              }
                            }
                            else {
                              sets(e)
                            }
                          }
                          else {
                            alert("Your Balance is low please recharge")
                            navigate(`/profile/${user._id}/wallet?p=addmoney`)
                          }


                        }}>
                          {
                            e.isOnline === "Online" ? "chat" : "ask"
                          }

                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </> :
              <>
                <div style={{ width: "100%", margin: "10px", backgroundColor: "var(--white)", padding: "100px", boxShadow: "0px 0px 4px gray" }}>
                  <h3 style={{ fontSize: "40px", color: "var(--dark-blue)", textAlign: "center" }}>Loading astrologer profiles</h3>
                </div>
              </>
          }
        </div>
      </div >
      {
        s._id && <>
          <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", position: "fixed", top: "0px", background: "rgba(0, 0, 0, 0.5)", zIndex: "8" }}>
            <div style={{ maxWidth: "460px", width: "96%", background: "var(--yellow)", borderRadius: "10px", padding: "20px" }}>
              <div style={{ textAlign: "center", fontWeight: "500", fontSize: "20px", }}>Offline Message </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "600", fontWeight: "18px" }}>{s.name}</span>
                <span style={{ fontWeight: "600", fontWeight: "18px" }}>$7/Message</span>
              </div>
              <div style={{ background: "white", marginTop: "5px", padding: "8px 14px", borderRadius: "6px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <label htmlFor="m" style={{}}>message</label>
                <textarea rows={10} type="text" id="m" style={{ border: "1px solid gray", outline: "none", height: "auto", padding: "3px 10px", borderRadius: "6px", fontWeight: "500" }} value={m} onChange={(e) => setM(e.target.value)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <div style={{ border: "2px solid var(--dark)", borderRadius: "6px", padding: "6px 20px", cursor: "pointer" }} onClick={() => sets({})}>Cancel</div>
                <div style={{ background: "var(--dark)", color: "var(--white)", textAlign: "center", borderRadius: "6px", padding: "6px 20px", cursor: "pointer" }} onClick={() => {
                  if (user.balance > 7) {
                    dispatch(offlineChat({ astroId: s._id, myId: user._id, content: m })).then((e) => {
                      if (e.payload.success) {
                        sets({})
                        alert("Your message send successfully")
                      }
                    })
                    setM("")
                  }
                  else {
                    navigate(`/profile/${user._id}/wallet?p=addmoney`)
                  }
                }}>Send</div>
              </div>
            </div>
          </div>
        </>
      }
      < Footer />

    </>
  )
}
export const searchAstrologers = () => {

}
export default SearchPage