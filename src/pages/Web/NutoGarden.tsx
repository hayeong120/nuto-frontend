import { useState, useEffect } from "react";
import style from '../../styles/NutoGarden.module.css'
import axios from "axios";
import classNames from "classnames";
import Nuto from "../../components/Nuto";
import DotIndicator from "../../components/DotIndicator";
import NutoPost from "./NutoPost";

export interface FullPost {
  _id: string;
  name: string;
  polariodImage: string;
  nutoImage: string;
  location: string;
  password: string;
  createdAt: string; 
  updatedAt: string;
  __v: number;
}

function NutoGarden() {
    const [nutos, setNutos] = useState<FullPost[][]>([])
    const [index, setIndex] = useState(0)
    const [selectPost, setSelectPost] = useState(null)

    const chunkPost = (posts:FullPost[]) => {
        const result:FullPost[][] = [];
        for(let i=0; i<posts.length; i+=6){
            result.push(posts.slice(i, i+6))
        }
        return result
    }

    useEffect(() => {
        const newNutos = async() => {
            try {
                const response = await axios.get(`https://nuto.mirim-it-show.site/post`)
                setNutos(chunkPost(response.data))
            } catch (error) {
                console.error(error);
            }
        }
        newNutos();
    }, []);

    return (
        <div className={style.gardenContainer}>
            <header className={style.gardenHeader}>
                <img src="/images/logo.svg" alt="로고" width={203} height={44} style={{marginTop: '5px'}} />
                <span>
                    <span className={style.goTomato}>응원 토마토 남기기</span>
                    <span className={style.goBooth}>부스별 텃밭 보러가기</span>
                </span>
            </header>
            <div className={style.nutoContainer}>
                <img src="/images/nutoGardenBackImg.png" alt="토마토 줄기" className={style.backImg}/>
                {nutos.length>0?(  
                    nutos[index].map((nuto, idx) => (
                        <Nuto nuto={nuto} idx={idx} selectPost={selectPost} setSelectPost={setSelectPost} key={nuto._id} />
                    ))
                ):<></>}
            </div>
            {index > 0 
                ? <img 
                    src="/images/preGardenBtn.png" 
                    alt="이전 텃밭" 
                    className={style.preBtn}
                    onClick={() => setIndex((pre) => pre-1)} 
                /> : <></>
            }
            {index < nutos.length-1 
                ? <img 
                    src="/images/nextGardenBtn.png" 
                    alt="다음 텃밭" 
                    className={style.nextBtn}
                    onClick={() => setIndex((pre) => pre+1)} 
                /> : <></>
            }
            <DotIndicator len={nutos.length} index={index} setIndex={setIndex} />
            {selectPost?<NutoPost postId={selectPost} selectPost={selectPost} setSelectPost={setSelectPost} />:<></>}
        </div>
    )
}

export default NutoGarden