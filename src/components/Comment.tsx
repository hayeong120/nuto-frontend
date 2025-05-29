
import axios from "axios"
import styles from "../styles/Comment.module.css"
import { useEffect, useState } from "react"
import { format, toZonedTime } from "date-fns-tz";
import ChatBox from "./ChatBox"

const timeZone = "Asia/Seoul";

function Comment({postId, setSelectPost}:{postId:string, setSelectPost: (string) => void}) {
    const [otherComment, setOtherComment] = useState([])
    const [comment, setComment] = useState("")

    const close = (e) => {
        if (e.target === e.currentTarget) {
            setSelectPost(null)
        }
    }

    const sendMessage = async () => {
        await axios.post('https://nuto.mirim-it-show.site/post/comment', {
            comment,
            postId
        })
        setComment("")
        fetch();
    }

    const fetch = async () => {
        const response = await axios.get(`https://nuto.mirim-it-show.site/post/comment/${postId}`)
        setOtherComment(response.data.comments)
    }

    useEffect(() => {
        fetch();
    }, [])
    useEffect(() => {
        console.log(postId);
    }, [postId])

    return (
        <div className={styles.container} >
            <div className={styles.commentContainer}>
                {otherComment && (
                    otherComment.map((comment, i) => {
                        const zonedDate = toZonedTime(comment.createdAt, timeZone);
                        const formatted = format(zonedDate, "yyyy-MM-dd HH:mm", { timeZone });
                        return(
                            <div>
                                <p className={styles.date}>{formatted}</p>
                                <ChatBox type="check" comment={comment.comment} key={i}/>
                            </div>
                        )
                    })
                )}
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
                    onClick={sendMessage}
                    className={styles.sendBtn}
                />
            </div>
        </div>
    )
}

export default Comment