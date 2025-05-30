import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "../styles/Nuto.module.css"

const position = [
    {left: '635px', top: '138px'},
    {left: '878px', top: '170px'},
    {left: '562px', top: '411px'},
    {left: '788px', top: '372px'},
    {left: '1042px', top: '383px'},
    {left: '776px', top: '588px'},
]
const nutoImg = [
    "/images/nutoTomatoR.png",
    "/images/nutoTomatoO.png",
    "/images/nutoTomatoY.png"
]

interface Post {
    _id: string;
    name: string;
    polariodImage: string;
    nutoImage: string;
}

function Nuto({nuto, idx}) {
    const navigate = useNavigate();
    const imgUrl = nutoImg[Math.floor(Math.random() * 3)]

    const nutoClick = () => {
        navigate('/nuto-post', {state: {postId: nuto._id}})
    }

    return (
        <div 
            className={style.nuto} 
            style={position[idx%6]}
            onClick={nutoClick}
        >
            <img src={imgUrl} alt="토마토" className={style.image}/>
            <p className={style.name}>from.{nuto.name}</p>
        </div>
    )
}

export default Nuto