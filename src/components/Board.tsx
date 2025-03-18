import React from 'react';
import style from '../styles/Board.module.css'
import Booth from './Booth';

interface BoothProps {
  booth: string;
  member: string[];
}
interface BoardProps {
  booth: BoothProps[] | null; 
}

const Board: React.FC<BoardProps> = ({ booth = [] }) => {
    if (typeof booth === null) {
      return <div>부스가 없습니다.</div>;
    }
    const memberName = (names: string[]): string => {
        let nameString = "";
        names.forEach((name, i) => {
            if(i === names.length-1){
                nameString += name;
            }
            else {
                nameString += `${name}, `;
            }
        })
        return nameString;
    }

    return (
        <div>
            {/* {booth?.map((b, index) => (
                <div key={index}>
                    <h2>부스 이름: {b.booth}</h2>
                    <h3>멤버:</h3>
                    <ul>
                      {b.member.map((name, idx) => (
                        <li key={idx}>{name}</li>
                      ))}
                    </ul>
                </div>
            ))} */}
            {booth?.map((b, index) => (
                <div key={index}>
                    <img src='/images/board.svg' className={style.boardImg}/>
                    {/* <div />
                    <img src='/images/boothImg.png' className={style.boothNameImg} />
                    <div>{booth.booth}</div>
                    <div>{memberName(booth.member)}</div> */}
                    {/* <Booth booth={b.booth} member={b.member} /> */}
                    <Booth booth={b} />
                </div>
            ))}
            
        </div>
    )
}

export default Board;