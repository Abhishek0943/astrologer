import React from 'react'
import styles from './Footer.module.css'
import { Link } from "react-router-dom"
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa"
export const Footer = () => {
    return (
        <>
            <footer style={{ backgroundColor: "#181818", color: "white" }}>
                <div className='container footer' style={{ display: "flex", gap: "20px", justifyContent: "space-evenly", padding: "50px 10px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: "0px", flexDirection: "column", alignItems: "center", alignSelf: "center" }}>
                        <div style={{ height: "80px", }}>
                            <img src="/fullLogo.png" style={{ height: "100%", width: "100%" }} alt="" />
                        </div>
                        {/* <Link to="/"> <img style={{ height: "80px" }} src="/GooglePlay.png" alt="" /></Link> */}
                        <div style={{ display: "flex", gap: "10px" }}><a rel="noopener noreferrer" target='_blank'><FaInstagram size={30} /></a><a rel="noopener noreferrer" target='_blank'><FaFacebook size={30} /></a><a rel="noopener noreferrer" target='_blank'><FaLinkedin size={30} /></a></div>
                    </div>
                    <div style={{ display: "flex", gap: "0px", flexDirection: "column", alignItems: "flex-start" }}>
                        <p style={{ fontSize: "1.7rem", fontWeight: "400", marginBottom: "15px" }}>Usefull Links</p>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/Privacy-policy">Privacy policy</Link>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/term&condition">Terms & Conditions</Link>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/contact-us">Contact Us</Link>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/astro-form">Work with Astrologers</Link>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/">About Us</Link>
                    </div> <div style={{ display: "flex", gap: "0px", flexDirection: "column", alignItems: "flex-start" }}>
                        <p style={{ fontSize: "1.7rem", fontWeight: "400", marginBottom: "15px" }}>Online Advice </p>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/">Chat with Astrologers</Link>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/">Astrologers</Link>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/">Tarot readers</Link>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/">Numerologists</Link>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/">Vastu expets </Link>
                        <Link style={{ color: "white", fontSize: "1.2rem", marginBottom: "8px", color: "#bfbfbf" }} to="/">Fengshui experts </Link>
                    </div>

                </div>
                <div style={{ height: "70px", background: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: "white", }}>Product by <a href="" rel="noopener noreferrer" target='_blank' style={{ color: "#ff4949" }}>abhishek</a></p>
                </div>
            </footer>
        </>
    )
}

export default Footer
