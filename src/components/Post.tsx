import { Link } from "react-router-dom";
import style from '../styles/Post.module.css';

function Post(){
    return(
        <div className={style.post}>
            {/* </Link> */}
            <div className={style.profile}>
                <div className={style.profileImgContainer} style={{backgroundImage: 'url(/images/nutoProfileImg.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    {/* <img src='/images/nutoProfileImg.png' className={style.profileImg}/> */}
                </div>
                <p className={style.profileName}>뉴토</p>
            </div>
            <div className={style.postContainer} style={{width: '100%', boxSizing: 'content-box'}}>
                {/* <img src={polariodImage} className={style.postImg} /> */}
                {/* <img src={nutoImage} className={style.postImg} /> */}
                <img src='/images/postImg1.png' className={style.postImg} />
                <img src='/images/postImg1.png' className={style.postImg} />
            </div>
            <div className={style.postInfo}>
                <div className={style.infoContainer}>
                    <img src='/images/commentImg.png' className={style.commentImg} />
                    {/* <div className={style.commentCnt}>{comments.length}</div> */}
                    <div className={style.commentCnt}>{1}</div>
                </div>
                <div className={style.infoContainer}>
                    <span className={style.writerText}>작성자 |</span>
                    {/* <span className={style.writer}>{comments.name}</span> */}
                    <span className={style.writer}>{"정해인"}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;