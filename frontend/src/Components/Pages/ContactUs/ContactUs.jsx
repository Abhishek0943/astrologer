import React, { useEffect } from 'react'
import styles from "./Contact.module.css"
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { IoMdMail } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
function ContactUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);
    return (
        <>
            <Navbar />
            <hr />
            <div className={styles.warper}>
                <div className={styles.contact}>
                    <h3>Contact Us</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione deserunt recusandae itaque iste voluptatibus sint quia cum facilis unde officiis voluptas aliquid doloribus veniam, doloremque architecto, dolorum sequi illum magnam.</p>

                </div>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <IoChatbox />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, ea cum. Quo perspiciatis est deserunt.</p>
                        <button>Contact Support</button>
                    </div>
                    <div className={styles.card}>
                        <IoMdMail />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, ea cum. Quo perspiciatis est deserunt.</p>
                        <a href="">example@xyz.com</a>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs
