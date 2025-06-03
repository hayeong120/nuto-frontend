import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import style from "../../styles/Home.module.css";
import Post from "../../components/Post";
import axios from "axios";
import { Helmet } from "react-helmet";
import ModalPortal from "./ModalPortal";
import Comment from "../../components/Comment";
import { AnimatePresence, motion } from 'framer-motion';

const chatjson = [
  {
    _id: "123",
    message: "잘 되네료~",
    name: "지은!",
    createdAt: "2025-05-30T05:52:39.720Z"
  },
  {
    _id: "124",
    message: "잘 되네료~",
    name: "지은!",
    createdAt: "2025-05-30T05:52:39.720Z"
  },
  {
    _id: "123",
    message: "잘 되네료~",
    name: "지은!",
    createdAt: "2025-05-30T05:52:39.720Z"
  },
  {
    _id: "124",
    message: "잘 되네료~",
    name: "지은!",
    createdAt: "2025-05-30T05:52:39.720Z"
  },
  {
    _id: "123",
    message: "잘 되네료~",
    name: "지은!",
    createdAt: "2025-05-30T05:52:39.720Z"
  },
  {
    _id: "124",
    message: "잘 되네료~",
    name: "지은!",
    createdAt: "2025-05-30T05:52:39.720Z"
  },
];

const json: PostType[] = [
  {
    _id: "683947833fafdc87e4534e99",
    name: "지은",
    polariodImage:
      "https://it-show-nuto.s3.ap-northeast-2.amazonaws.com/image/polariod/1748584323024-polariod.png",
    nutoImage:
      "https://it-show-nuto.s3.ap-northeast-2.amazonaws.com/image/nuto/1748584323024-nuto.png",
    location: "nuto",
    password:
      "$2b$10$abcdefghijklmnopqrstuu03XQq4uczTxEDPe3ML4iARROHzHJ0n6",
    comments: chatjson
  },
  {
    _id: "683947833fafdc87e4534e99",
    name: "지은",
    polariodImage:
      "https://it-show-nuto.s3.ap-northeast-2.amazonaws.com/image/polariod/1748584323024-polariod.png",
    nutoImage:
      "https://it-show-nuto.s3.ap-northeast-2.amazonaws.com/image/nuto/1748584323024-nuto.png",
    location: "nuto",
    password:
      "$2b$10$abcdefghijklmnopqrstuu03XQq4uczTxEDPe3ML4iARROHzHJ0n6",
    comments: chatjson
  },
  {
    _id: "683947833fafdc87e4534e99",
    name: "지은",
    polariodImage:
      "https://it-show-nuto.s3.ap-northeast-2.amazonaws.com/image/polariod/1748584323024-polariod.png",
    nutoImage:
      "https://it-show-nuto.s3.ap-northeast-2.amazonaws.com/image/nuto/1748584323024-nuto.png",
    location: "nuto",
    password:
      "$2b$10$abcdefghijklmnopqrstuu03XQq4uczTxEDPe3ML4iARROHzHJ0n6",
    comments: chatjson
  },
  {
    _id: "683947833fafdc87e4534e99",
    name: "지은",
    polariodImage:
      "https://it-show-nuto.s3.ap-northeast-2.amazonaws.com/image/polariod/1748584323024-polariod.png",
    nutoImage:
      "https://it-show-nuto.s3.ap-northeast-2.amazonaws.com/image/nuto/1748584323024-nuto.png",
    location: "nuto",
    password:
      "$2b$10$abcdefghijklmnopqrstuu03XQq4uczTxEDPe3ML4iARROHzHJ0n6",
    comments: chatjson
  },
  {
    _id: "683947833fafdc87e4534e99",
    name: "지은",
    polariodImage:
      "https://it-show-nuto.s3.ap-northeast-2.amazonaws.com/image/polariod/1748584323024-polariod.png",
    nutoImage:
      "https://it-show-nuto.s3.ap-northeast-2.amazonaws.com/image/nuto/1748584323024-nuto.png",
    location: "nuto",
    password:
      "$2b$10$abcdefghijklmnopqrstuu03XQq4uczTxEDPe3ML4iARROHzHJ0n6",
    comments: chatjson
  },
];

interface Comment {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}
type PostType = {
  _id: string;
  name: string;
  polariodImage: string;
  nutoImage: string;
  location: string;
  password: string;
  comments: Comment[];
};

function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [selectPost, setSelectPost] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      // const response = await axios.get(`https://nuto.mirim-it-show.site/post`);
      // console.log(response);
      // setPosts(response.data);
      setPosts(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className={style.body}>
      <AnimatePresence
        onExitComplete={() => {
          setSelectPost(null);
        }}
      >
        {selectPost && (
          <ModalPortal>
            <motion.div
              className={style.backgroundModal}
              initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
              animate={{ backgroundColor: 'rgba(54, 54, 54, 0.7)' }}
              exit={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectPost(null)}
            >
            </motion.div>
            <motion.div
              className={style.commentModal}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(event, info) => {
                setSelectPost(null);
              }}
              initial={{bottom: '-100%'}}
              animate={{bottom: '0%'}}
              exit={{bottom: '-100%'}}
              transition={{duration: 0.5}}
              onClick={(e) => e.stopPropagation()}
            >
              <Comment postId={selectPost} setSelectPost={setSelectPost} />
            </motion.div>
          </ModalPortal>
        )}
      </AnimatePresence>

      <Helmet>
        <title>nuto home</title>
      </Helmet>

      <img alt="logo" src="/images/logo.svg" className={style.logo} />
      {posts.length === 0 ? (
        <p>게시물이 없습니다.</p>
      ) : (
        posts &&
        posts.map((post) => (
          <Post
            post={post}
            refetchPost={fetchPost}
            setSelectPost={setSelectPost}
          />
        ))
      )}
      <Footer />
    </div>
  );
}

export default Home;
