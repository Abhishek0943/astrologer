import React, { useState } from 'react'
import styles from "./Navbar.module.css"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoMdLogIn } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
function Navbar() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.userLog)
    const [isSidebar, setIsSidebar] = useState(false)
    return (
        <div className={styles.warper}>
            <div className={styles.nav}>
                <div className={styles.logo} onClick={() => setIsSidebar(false)}>
                    <img className={styles.logoImage} src="/logo.png" alt="logo" />
                </div>
                <div className={`${styles.center}`}>
                    <ul className={styles.navList}>
                        <li>
                            Astrologers
                        </li>
                        <li>
                            Blogs
                        </li>
                        <li>
                            Rewards
                        </li>
                        <li>
                            About Us
                        </li>
                        <li className={`${styles.btn} ${styles.btnOutline}`} onClick={() => {
                                    setIsSidebar(false)
                                    navigate("/auth?sing-up=true")
                                }}>Sign-In </li>
                        <li className={`${styles.btn} ${styles.btnFill}`} onClick={() => {
                            navigate("/auth?login=true")
                        }}>Sign-Up </li>
                    </ul>
                    {/* <ul className={styles.navList}>
                        <li onClick={() => {
                        }}>Psychic Reader</li>
                        <li onClick={() => {
                            setIsSidebar(false)
                            navigate("/blogs")
                        }}>Blogs</li>
                        <li onClick={() => {
                            setIsSidebar(false)
                            navigate(user._id ? "/free-coin" : "/auth")
                        }}>Free Coins</li>
                        {
                            user._id ? <>

                                <li onClick={() => {
                                    setIsSidebar(false)
                                    navigate(`/profile/${user._id}`)
                                }} className={`${styles.btn} ${styles.btnFill}`}>Profile</li>
                            </> : <>
                                <li onClick={() => {
                                    setIsSidebar(false)
                                    navigate("/auth?sing-up=true")
                                }} className={`${styles.btn} ${styles.btnOutline}`}>Sign Up</li>
                                <li onClick={() => {
                                    setIsSidebar(false)
                                    navigate("/auth?login=true")
                                }} className={`${styles.btn} ${styles.btnFill}`}>Login</li>
                            </>
                        }
                    </ul> */}
                </div>
                {/* <div className={styles.right}>
                    <button className={`${styles.btnMob}`} onClick={() => setIsSidebar(!isSidebar)} style={{ backgroundColor: "black", }}>
                        <BiSolidCategory color="white" />
                    </button>
                </div> */}

            </div>

        </div>
    )
}

export default Navbar
