import React from 'react';
import style from '../styles/Booth.module.css'

interface BoothProps {
    booth: { 
      booth: string;  // 부스 이름
      member: string[];  // 부스 멤버
    };
}
  
const Booth: React.FC<BoothProps> = ({ booth }) => {
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

    return(
        <div className={style.boothContainer}>
            <img src='/images/boothImg.png' className={style.boothImg} />
            <div className={style.gradient}/>
            <div className={style.boothInfo}>
                <img src='/images/boothName.svg' className={style.boothName} />
                <p className={style.memberName}>{memberName(booth.member)}</p>
            </div>
        </div>
    )

}

export default Booth;