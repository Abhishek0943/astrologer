import React, { useState } from 'react'
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { LandingEmail, LandingForm } from '../../../api/userLogInReducer';
function Landing() { 
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: "", email: "", dateOfBirth: "", message: "", otp: "" })
    const [step, setStep] = useState(0)
    const handleForm = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const dispatch = useDispatch()
    const returnElement = () => {
        switch (step) {
            case 0:
                return (<>
                    <div style={{
                        justifyContent: "center", display: "flex", flexDirection: "column", border: "1px solid  #5A5959", padding: "20px 30px", borderRadius: "10px", gap: "20px", background: "rgba(0, 0, 0,0.4)",
                    }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                            <label htmlFor="name" style={{ fontSize: "1.2rem", fontWeight: "500" }}>Name</label>
                            <input style={{ border: "1px solid gray", outline: "none", backgroundColor: "#ecfaff", borderRadius: "3px", padding: "5px 10px" }} type="text" id='name' name='name' value={form.name} onChange={handleForm} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                            <label htmlFor="email" style={{ fontSize: "1.2rem", fontWeight: "500" }}>Email</label>
                            <input style={{ border: "1px solid gray", outline: "none", backgroundColor: "#ecfaff", borderRadius: "3px", padding: "5px 10px" }} type="text" id='email' name='email' value={form.email} onChange={handleForm} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "7px", position: "relative" }}>
                            <label htmlFor="date" style={{ fontSize: "1.2rem", fontWeight: "500" }}>Date Of Birth</label>
                            <input style={{ border: "1px solid gray", outline: "none", backgroundColor: "#ecfaff", borderRadius: "3px", padding: "5px 10px" }} type="date" id='date' name='dateOfBirth' value={form.dateOfBirth} style={{ width: "100%" }} onChange={handleForm} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                            <label htmlFor="message" style={{ fontSize: "1.2rem", fontWeight: "500" }}>Your Questions</label>
                            <textarea style={{ border: "1px solid gray", outline: "none", backgroundColor: "#ecfaff", borderRadius: "3px", padding: "5px 10px", width: "100%" }} rows="4" id='message' name='message' value={form.message} onChange={handleForm} />
                        </div>
                        <div style={{ cursor: "pointer", width: "150px", textAlign: "center", padding: "5px 10px", borderRadius: "5px", background: "var(--main-one)", color: "white" }} onClick={() => {
                            const regex = /^[^@]+@[a-zA-Z]{2}[^@]*\.[a-zA-Z]{2}/;
                            if (regex.test(form.email)) {
                                dispatch(LandingEmail({ ...form })).then((e) => {
                                    e?.payload?.success && setStep(1)
                                })
                            }
                            else {
                                alert("invalid email")
                            }
                        }}>
                            Submit
                        </div>
                    </div>
                </>)
                break;
            case 1:
                return (<>
                    <div style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1px solid  #5A5959", margin: "auto", height: "auto", padding: "20px 30px", borderRadius: "10px", gap: "20px",
                    }}>
                        <p style={{ width: "80vw", textAlign: "center" }}>please chak your email {form.email} for the otp</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "7px", maxWidth: "" }}>
                            <label htmlFor="otp" style={{ fontSize: "1.2rem", fontWeight: "500", textAlign: "center" }}>Enter your OTP</label>
                            <input type="text" id='otp' name='otp' value={form.otp} onChange={handleForm} style={{ border: "1px solid gray", outline: "none", backgroundColor: "#ecfaff", borderRadius: "3px", padding: "3px 10px" }} />
                        </div>

                        <div style={{ cursor: "pointer", width: "150px", textAlign: "center", padding: "5px 10px", borderRadius: "5px", background: "var(--main-one)", color: "white" }} onClick={() => dispatch(LandingForm({ ...form })).then((e) => e?.payload?.success && setStep(2))}>
                            Submit
                        </div>
                        <div style={{ cursor: "pointer", width: "150px", textAlign: "center", padding: "5px 10px", borderRadius: "5px", color: "white" }} onClick={() => setStep(0)}>
                            Change Email
                        </div>
                    </div>
                </>)
                break;
            case 2:
                return (<>
                    <div style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1px solid  #5A5959", width: "80%", margin: "auto", height: "70%", padding: "20px 30px", borderRadius: "10px", gap: "20px", background: "rgba(0, 0, 0,0.4)", minWidth: "440px"
                    }}>

                        <p style={{ textAlign: "center", width: "80%", background: "#d0d0d0", padding: "30px 40px", borderRadius: "10px", color: "black" }}>Hey! Your question has been submitted successfully; we will now be matching the best psychic reader for you. The answer will be attached with remedies as well just
                            for you!
                            you will soon get your readings on your
                            email id- contact@abhishek.com
                            within the span of 48 hours.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px", borderRadius: "5px", alignItems: "center", background: "red", }}>
                            <p style={{ textAlign: "center" }}>Don’t want to wait? you can chat with our expert psychic readers asap!
                                <br />
                                Enjoy live sessions with zero waiting time </p>
                            <div style={{ marginTop: "20px", cursor: "pointer", width: "150px", textAlign: "center", padding: "5px 10px", borderRadius: "5px", background: "white", color: "black" }} onClick={() => navigate("/auth?sign-up=true")}>
                                Register now
                            </div>
                        </div>

                    </div >

                </>)
                break;


        }
    }
    return (
        <>
            <nav className={styles.nav}>
                <div onClick={() => navigate("/")}>
                    <img src="/fullLogo.png" alt="" />
                </div>
            </nav>
            <div className={styles.wrapper} >
                <div className={styles.main}>
                    <div className={styles.left}>
                        <h3 style={{ textAlign: "left" }}>FREE CONSULTATION</h3>
                        <p style={{ fontSize: "1.2rem", color: "white" }}>Enroll yourself and get a free consultation.
                            Drop your question in the question box and get connected with the best psychic within the span of 48 hours.</p>
                    </div>
                    <div className={styles.right}>
                        {
                            returnElement()
                        }
                    </div>
                </div>
            </div>
            <nav className={styles.nav} style={{ height: "auto", padding: "20px 0px" }}>
                <div className={styles.text}>
                    <span >Product by <a href="" target='_blank'>Abhshek</a> </span> |
                    <span onClick={() => navigate("/Privacy-policy")}>Privacy Policy</span> |
                    <span onClick={() => navigate("/term&condition")}>Term & Condition</span> |
                    <span onClick={() => navigate("/contact-us")}>Contact us</span>
                </div>
            </nav>
        </>

    )
}

export default Landing
