import axios from "axios";
import styles from "../styles/Comment.module.css";
import { useEffect, useState } from "react";
import { format, toZonedTime } from "date-fns-tz";
import { usePostInfo } from "../context/PostInfoContext";
import ChatBox from "./ChatBox";

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

const timeZone = "Asia/Seoul";

function Comment({
  postId,
  setSelectPost,
}: {
  postId: string;
  setSelectPost: (string) => void;
}) {
  const [otherComment, setOtherComment] = useState([]);
  const [comment, setComment] = useState("");
  const { name } = usePostInfo();

  const close = (e) => {
    if (e.target === e.currentTarget) {
      setSelectPost(null);
    }
  };

  const sendComment = async () => {
    await axios.post("https://nuto.mirim-it-show.site/post/comment", {
      name,
      comment,
      postId,
    });
    setComment("");
    fetch();
  };

  const fetch = async () => {
    // const response = await axios.get(
    //   `https://nuto.mirim-it-show.site/post/comment/${postId}`
    // );
    // setOtherComment(response.data.comments);
    setOtherComment(chatjson)
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.handle}>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.commentContainer}>
        <div onClick={() => setSelectPost(null)}>

        {otherComment &&
          otherComment.map((comment, i) => {
            const zonedDate = toZonedTime(comment.createdAt, timeZone);
            const formatted = format(zonedDate, "MM-dd HH:mm", {
              timeZone,
            });
            return (
              <div className={styles.commentBox}>
                <p>{comment.name}</p>
                <ChatBox
                  type="check"
                  time={formatted}
                  comment={comment.comment}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.messageContainer}>
          <div className={styles.inputContainer}>
            <input
              placeholder="텍스트 입력"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.input}
            />
          </div>
          <img
            src="/images/sendButton.png"
            alt="sendButton"
            onClick={sendComment}
            className={styles.sendBtn}
          />
        </div>
      </div>
    </div>
  );
}

export default Comment;
