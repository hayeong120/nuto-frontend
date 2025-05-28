import style from "../styles/Post.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import bcrypt, { hash } from "bcryptjs";
import axios from "axios";

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

function Post({ post }: { post: PostProps }) {
  // console.log(process.env.REACT_APP_SALT_VALUE);
  const hashing = async (password: string) => {
    const salt = process.env.REACT_APP_SALT_VALUE;
    return await bcrypt.hash(password, salt);
  };

  const handleClick = async (postId: string) => {
    const password = prompt("포스트 비밀번호를 입력해주세요");
    const hashedPassword = await hashing(password);

    // console.log(postId, hashedPassword);

    try {
      const response = await axios.delete(
        "https://nuto.mirim-it-show.site/post",
        {
          data: {
            id: postId,
            pw: hashedPassword,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
    
  return (
    <div className={style.post} key={post._id}>
      {/* </Link> */}
      <div className={style.profile}>
        <div
          className={style.profileImgContainer}
          style={{
            backgroundImage: `url(/images/profiles/${post.location}.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <img src='/images/nutoProfileImg.png' className={style.profileImg}/> */}
        </div>
        <p className={style.profileName}>{post.location}</p>
        <div onClick={() => handleClick(post._id)}>
          <BsThreeDotsVertical />
        </div>
      </div>
      <div
        className={style.postContainer}
        style={{ width: "100%", boxSizing: "content-box" }}
      >
        <img
          alt="polariodImage"
          src={post.polariodImage}
          className={style.postImg}
        />
        <img alt="nutoImg" src={post.nutoImage} className={style.postImg} />
      </div>
      <div className={style.postInfo}>
        <span onClick={() => setSelectPost(post._id)}>댓글</span>
        <div className={style.infoContainer}>
          <span className={style.writerText}>작성자 |</span>
          <span className={style.writer}>{post.name}</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
