import React from 'react';
import Footer from '../components/Footer';
import Booth from '../components/Booth';
import style from '../styles/Search.module.css'

function Search() {
    return (
        <div className={style.body}>
            <p className={style.text}>어느부스에 토마토를 남길까요?</p>
            <div className={style.searchContainer}>
                <input type="text" className={style.searchInput} />
                <img src='/images/searchIcon.png' className={style.searchIcon} />
                <img src='/images/searchUnderbar.png' className={style.searchUnderbar} />
            </div>
            <div className={style.boothContainer}>
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
                <Booth booth={{ booth: "My Booth", member: ["김", "이", "박"] }} />
            </div>
            <Footer />
        </div>
    )
}

export default Search;