import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
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
          `https://nuto.mirim-it-show.site/post`
        );
        console.log(response);
        setPosts(response.data.statusCode === 500 ? [] : response.data.posts);
      } catch (err) {
        console.error(err);
      }
    };

    getPosts();
  }, []);

  return (
    <div className={style.body}>
      <img alt="logo" src="/images/logo.svg" className={style.logo} />
      {posts.length === 0 ? (
        <p>게시물이 없습니다.</p>
      ) : (
        posts && posts.map((post) => <Post post={post} />)
      )}
      <Footer />
    </div>
  );
}

export default Home;
