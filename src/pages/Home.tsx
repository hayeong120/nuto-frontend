import React from 'react';
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import Board from '../components/Board';
import style from '../styles/Home.module.css';
import Post from '../components/Post';

function Home(){
    return(
        <div className={style.body}>
            <img src='/images/logo.svg' className={style.logo} />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Footer />
        </div>
    )
}

export default Home;