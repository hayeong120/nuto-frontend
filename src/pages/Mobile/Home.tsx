import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import style from "../../styles/Home.module.css";
import Post from "../../components/Post";
import axios from "axios";
import { Helmet } from "react-helmet";
import ModalPortal from "./ModalPortal";
import Comment from "../../components/Comment";

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
      const response = await axios.get(`https://nuto.mirim-it-show.site/post`);
      console.log(response);
      setPosts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className={style.body}>
      {selectPost && (
        <ModalPortal>
          <Comment postId={selectPost} setSelectPost={setSelectPost} />
        </ModalPortal>
      )}

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
