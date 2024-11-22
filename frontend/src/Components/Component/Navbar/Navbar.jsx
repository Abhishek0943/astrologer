import React, { useState } from 'react'
import styles from './Navbar.module.css';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
    const [active, setActive] = useState(false)
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.userLog)

    return (
        <>
            <nav className={styles.nav}>
                <div>
                    <div className={styles.logo}><img src="" alt="" /></div>
                    <ul>
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate(user?._id ? "/search" : "/auth?login=true")}>Psychic Masters</li>
                        <li onClick={() => navigate(user?._id ? "/horoscopy" : "/auth?login=true")}>Horoscopy</li>
                        <li onClick={() => navigate("#faq")}>FAQ</li>
                        <li onClick={() => navigate("/auth?login=true")}>Login</li>
                    </ul>
                    <div className={styles.option}>
                        <div onClick={() => navigate("/auth?login=true")}>Login</div>
                        <FaBars onClick={() => setActive(true)} />
                    </div>

                </div>


            </nav>
            <div className={`${styles.mobileMenu} ${active && styles.active}`}>
                <div>
                    <div style={{}}>
                        <div className={styles.mobileLogo}><img src="/logo.png" alt="" /></div>
                        <FaXmark onClick={() => setActive(false)} />
                    </div>
                    <ul>
                        <li onClick={() => {
                            navigate("/")
                            setActive(false)
                        }}>Home</li>
                        <li onClick={() => {
                            navigate(user?._id ? "/search" : "/auth?login=true")
                            setActive(false)
                        }}>Psychic Masters</li>
                        <li onClick={() => {
                            navigate(user?._id ? "/horoscopy" : "/auth?login=true")
                            setActive(false)
                        }}>Horoscopy</li>
                        <li onClick={() => {
                            navigate("#faq")
                            setActive(false)
                        }}>FAQ</li>
                        <li onClick={() => {
                            navigate("/auth?login=true")
                            setActive(false)
                        }}>Login</li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Navbar
