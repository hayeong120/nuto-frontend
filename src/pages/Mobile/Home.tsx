import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Board from "../../components/Board";
import style from "../../styles/Home.module.css";
import Post from "../../components/Post";
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

function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/post`
        );
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getPosts();
  }, []);

  return (
    <div className={style.body}>
      <img src="/images/logo.svg" className={style.logo} />
      {posts.length === 0 ? (
        <p>게시물이 없습니다.</p>
      ) : (
        posts.map((post) => <Post post={post} />)
      )}
      <Footer />
    </div>
  );
}

export default Home;
