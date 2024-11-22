import React, { useEffect } from 'react'
import styles from "./Blog.module.css"
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { FaRegUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { GetBlogById } from '../../../api/BlogReducer';
import {  useParams } from 'react-router-dom'
function Blog() {
    const dispatch = useDispatch()
    const { blog } = useSelector((state) => state.blog)
    const { id } = useParams()
    useEffect(() => {
        dispatch(GetBlogById({ id }))
    }, [dispatch, id])
    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);
    return (
        <>
            <Navbar />
            <div className={styles.warper} style={{ height: "auto" }}>
                <div className={styles.top}>
                    <div className={styles.image}>

                        <img src={blog?.banner?.url} className={styles.img} alt="Privacy" />
                    </div>
                    <h3>{blog?.title}</h3>
                    <div className={styles.blogInfo}>
                        <div>
                            <FaRegUserCircle /><span>{blog?.createdBy?.name || "Admin"}</span>
                        </div>
                        <hr />
                        <div>
                            <FaRegCalendarAlt /><span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className={styles.blog} dangerouslySetInnerHTML={{ __html: blog?.blog }}>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Blog
