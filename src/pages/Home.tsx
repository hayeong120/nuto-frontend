import React from 'react';
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import Board from '../components/Board';
import style from '../styles/Home.module.css';

function Home(){
    return(
        <div className={style.body}>
            {/* <Link to='/post'> */}
            <img src='/images/logo.svg' className={style.logo} />
            {/* </Link> */}
            <div className={style.profile}>
                <div className={style.profileImgContainer} style={{backgroundImage: 'url(/images/nutoProfileImg.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    {/* <img src='/images/nutoProfileImg.png' className={style.profileImg}/> */}
                </div>
                <p className={style.profileName}>뉴토</p>
            </div>
            <div className={style.postContainer}>
                <img src='/images/postImg1.png' className={style.postImg} />
            </div>
            <div className={style.postInfo}>
                <div className={style.infoContainer}>
                    <img src='/images/commentImg.png' className={style.commentImg} />
                    <div className={style.commentCnt}>{1}</div>
                </div>
                <div className={style.infoContainer}>
                    <span className={style.writerText}>작성자 |</span>
                    <span className={style.writer}>{"정해인"}</span>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;