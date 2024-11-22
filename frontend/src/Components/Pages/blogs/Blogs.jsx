import React, { useEffect, useState } from 'react'
import styles from "./Blogs.module.css"
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux'
import { GetBlog } from '../../../api/BlogReducer';
import { useNavigate } from 'react-router-dom'
import { GetCategory } from '../../../api/userLogInReducer'
function Blogs() {
    const dispatch = useDispatch()
    const { blogs } = useSelector((state) => state.blog)
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState("")
    useEffect(() => {
        dispatch(GetBlog())
        dispatch(GetCategory()).then((e) => e.payload.success && setCategories(e.payload.categories))
    }, [dispatch])
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
                <div className={styles.whatWeOffer}>
                    <h3>Welcome to Our blogs</h3>
                    <p>Stay update with the latest xxxxxx, xxxxxx, xxxxx, xxxxx and insight shared by Ko-sychic Team</p>
                </div>

            </div>
            <div className={styles.warper} style={{ backgroundColor: "#e7e7e7", minHeight: "unset", }}>
                <div className={styles.nav}>
                    {
                        categories.map((e) => (
                            <p onClick={() => setFilter(e.category)}>{e.category}</p>
                        ))
                    }
                </div>
            </div>
            <div className={styles.warper} style={{ alignItems: 'flex-start', padding: "30px 0px", flexDirection: "row" }} >
                <div className={styles.blog}>
                    <div className={styles.left}>
                        <div className={styles.list}>
                            <h4>Recent post</h4>
                            {
                                blogs.map((e, i) => (
                                    <>
                                        <div className={styles.listItem}>
                                            <div className={styles.listImage}>
                                                <img src={e.banner.url} style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />
                                            </div>
                                            <div className={styles.listDetails}>
                                                <h5>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque voluptates officiis ratione ullam vitae ab labore totam nam fuga autem esse qui hic iusto id temporibus illo, ipsum nobis. Nobis. adipisicing elit.</h5>
                                                <p>Learn More </p>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                            {/* {
                                [...Array(3)].map((_, i) => (
                                    <>
                                        <div className={styles.listItem}>
                                            <div className={styles.listImage}></div>
                                            <div className={styles.listDetails}>
                                                <h5>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque voluptates officiis ratione ullam vitae ab labore totam nam fuga autem esse qui hic iusto id temporibus illo, ipsum nobis. Nobis. adipisicing elit.</h5>
                                                <p>Learn More </p>
                                            </div>
                                        </div>
                                    </>
                                ))
                            } */}
                        </div>
                        <div className={styles.list}>
                            <h4>News </h4>
                            {
                                [...Array(3)].map((_, i) => (
                                    <>
                                        <div className={styles.listItem}>
                                            <div className={styles.listImage}></div>
                                            <div className={styles.listDetails}>
                                                <h5>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque voluptates officiis ratione ullam vitae ab labore totam nam fuga autem esse qui hic iusto id temporibus illo, ipsum nobis. Nobis. adipisicing elit.</h5>
                                                <p>Learn More </p>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.right}>
                        {
                            blogs.filter((e) => filter ? e.category.includes(filter) : true).map((e, i) => {
                                return (
                                    <div className={styles.item}>
                                        <div className={styles.cardImage}>
                                            <img src={e.banner.url} alt="" />
                                        </div>
                                        <div className={styles.cardDetails}>
                                            <div className={styles.tagList}>
                                                {e.category.map((j) => <div className={styles.tag}>{j}</div>)}
                                            </div>
                                            <h3>{e.title}</h3>
                                            <div>{new Date(e.createdAt).toLocaleDateString()}</div>
                                            <button onClick={() => navigate(`/blog/${e._id}`)}>Read More</button>
                                        </div>
                                    </div>

                                )
                            })
                        }
                        {/* {
                            [...Array(3)].map((_, i) => (
                                <>
                                    <div className={styles.item}>
                                        <div className={styles.cardImage}>
                                            <img src="/top10.png" alt="" />
                                        </div>
                                        <div className={styles.cardDetails}>
                                            <div className={styles.tagList}>
                                                <div className={styles.tag}>numrology</div>
                                                <div className={styles.tag}>numrology</div>
                                                <div className={styles.tag}>numrology</div>
                                                <div className={styles.tag}>numrology</div>
                                                <div className={styles.tag}>numrology</div>
                                                <div className={styles.tag}>numrology</div>
                                            </div>
                                            <h3>top 1 most successful zodiac signs </h3>
                                            <div>10/2/2034</div>
                                            <button>Read More</button>
                                        </div>
                                    </div>
                                </>
                            ))
                        } */}
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default Blogs
