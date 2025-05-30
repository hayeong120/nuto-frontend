import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import style from "../../styles/NutoPost.module.css"

function NutoPost(){
    const navigate = useNavigate();
    const location = useLocation();
    const { postId } = location.state || "";
    const [post, setPost] = useState(null)
    try {
        const post = async() => {
            const nutoPost = await axios.get(`https://nuto.mirim-it-show.site/post/${postId}`)
            setPost(nutoPost.data)
        }
        post()
    } catch (error) {
        console.error(error);
    }

    return(
        <div className={style.nutoPostPage}>
            <img src="/images/nutoPostBackImg.png" alt="배경이미지" className={style.backImg} />
            <img src="/images/logo.svg" alt="로고" width={203} height={44} className={style.logo} />
            <img src="/images/postClose.png" alt="닫기" width={48} height={48} className={style.closeBtn} onClick={() => navigate(-1)}/>
            <div className={style.imageContainer}>
                {post?<img src={post.polariodImage} alt="사진1" className={style.polariodImage} />:<></>}
                {post?<img src={post.nutoImage} alt="사진2" className={style.nutoImage} />:<></>}
            </div>
        </div>
    )
}

export default NutoPost