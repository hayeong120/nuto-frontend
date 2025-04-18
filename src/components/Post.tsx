import { Link } from "react-router-dom";
import style from '../styles/Post.module.css';
interface Comment {
    _id: string;
    name: string;
    message: string;
    createdAt: string;
}
interface PostProps {
    _id: string;
    name: string;
    polariodImage: string;
    nutoImage: string;
    location: string;
    password: string;
    comments: Comment[];
}

function Post( {post}: {post: PostProps} ){
    return(
        <div className={style.post} key={post._id}>
            {/* </Link> */}
            <div className={style.profile}>
                <div className={style.profileImgContainer} style={{backgroundImage: 'url(/images/nutoProfileImg.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    {/* <img src='/images/nutoProfileImg.png' className={style.profileImg}/> */}
                </div>
                <p className={style.profileName}>뉴토</p>
            </div>
            <div className={style.postContainer} style={{width: '100%', boxSizing: 'content-box'}}>
                <img src={post.polariodImage} className={style.postImg} />
                <img src={post.nutoImage} className={style.postImg} />
            </div>
            <div className={style.postInfo}>
                <div className={style.infoContainer}>
                    <img src='/images/commentImg.png' className={style.commentImg} />
                    <div className={style.commentCnt}>{post.comments.length}</div>
                </div>
                <div className={style.infoContainer}>
                    <span className={style.writerText}>작성자 |</span>
                    <span className={style.writer}>{post.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;