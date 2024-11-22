import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar';
import PsychicCard from '../../Component/PsychicCard/PsychicCard';
import styles from './Psychic.module.css';
import Footer from '../../Footer/Footer';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetAstrologers } from '../../../api/userLogInReducer';
import { FaWallet } from "react-icons/fa";
function Psychic() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { astrologers, user } = useSelector((state) => state.userLog)
    const [search, setSearch] = useState("")
    const [filterArray, setFilterArray] = useState([])
    useEffect(() => {
        dispatch(GetAstrologers())
    }, [dispatch])
    useEffect(() => {
        let a = []
        astrologers.map((e) => {
            if (e.name.toLowerCase().includes(search.toLowerCase())) {
                a.push(e)
            }
        })
        setFilterArray(a)
    }, [search, astrologers])
    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);
    return (
        <>
            <Navbar />
            <div style={{ maxWidth: "none !important", background: "#0B0B0B", maxWidth: "100vw", paddingTop: "30px", }}>
                <div
                    style={{ width: "95%", margin: "auto", maxWidth: "1400px", display: "flex", gap: "20px", justifyContent: 'space-between', }}>
                    <div style={{ border: "2px solid white", display: "flex", borderRadius: "5px" }}>
                        <div style={{ color: "white", padding: "5px 15px", background: "red", fontSize: "1.2rem", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid white" }}>
                            Wallet
                        </div>

                        <div style={{ color: "white", padding: "5px 15px", fontSize: "1.2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img src="/dollar.png" style={{height:"15px", marginRight:"10px"}} alt="" />
                            {user?.balance || 0}
                        </div>
                    </div>
                    <input placeholder="name" onChange={(e) => setSearch(e.target.value)} type="text" style={{ borderRadius: "5px ", color: "white", maxWidth: "400px", width: "100%", border: "2px solid white", outline: "none", background: "none", padding: "5px 15px", }} />
                </div>
            </div>
            <div className={styles.warper} style={{ height: "auto" }}>
                <div className={styles.whatWeOffer} style={{}}>
                    <PsychicCard astrologers={filterArray} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Psychic
