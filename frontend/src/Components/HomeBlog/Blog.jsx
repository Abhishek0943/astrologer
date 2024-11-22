import React from 'react'
import styles from "./Blog.module.css"
import Carousel from 'react-multi-carousel';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 750 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 750, min: 0 },
        items: 1
    }
};
function Blog() {
    return (
        <>
            <Carousel
                swipeable={false}
                draggable={false}
                // autoPlay={true}
                autoPlaySpeed={5000}
                keyBoardControl={true}
                customTransition="all 1s "
                responsive={responsive}
                className={styles.card}>
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
                        <h3>top 2 most successful zodiac signs </h3>
                        <div>10/2/2034</div>
                        <button>Read More</button>
                    </div>
                </div>
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
                        <h3>top 3 most successful zodiac signs </h3>
                        <div>10/2/2034</div>
                        <button>Read More</button>
                    </div>
                </div>
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
                        <h3>top 4 most successful zodiac signs </h3>
                        <div>10/2/2034</div>
                        <button>Read More</button>
                    </div>
                </div>
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
                        <h3>top 5 most successful zodiac signs </h3>
                        <div>10/2/2034</div>
                        <button>Read More</button>
                    </div>
                </div>

            </Carousel>
            {/* <div className={styles.card}></div>
            <div className={styles.card}></div>
            <div className={styles.card}></div>
        */}
        </>
    )
}

export default Blog
