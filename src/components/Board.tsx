import React from 'react';
import style from '../styles/Board.module.css'
import Booth from './Booth';
import { useNavigate } from 'react-router-dom';

interface BoothProps {
    booth: { 
        booth_id: string; 
        members: string[];  
        s3_path: string;
    };
}

const Board: React.FC<BoothProps> = ({ booth }) => {
    const navigate = useNavigate();
    // todo 함수이름 바꾸기
    const goB = (booth: string) => {
        // 부소소개 페이지 이동, 부스 이름 넘기기
        console.log(booth);
        navigate('/home', { state: booth }); 
    }
    return (
        <div className={style.body} onClick={() => goB(booth.booth_id)}>
            <img src='/images/board.svg' className={style.boardImg}/>
            <div className={style.BoothBox}>
                <Booth booth={booth} navi={{go: false}}/>
            </div>
        </div>
    )
}

export default Board;