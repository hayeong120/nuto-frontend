import React from 'react';
import style from '../styles/Booth.module.css'
import { useNavigate } from 'react-router-dom';

interface BoothProps {
    booth: { 
        booth_id: string; 
        members: string[];  
        s3_path: string;
    };
    navi: {
        go: boolean;
        path?: string;
    };
}
  
const Booth: React.FC<BoothProps> = ({ booth, navi }) => {
    const navigate = useNavigate();
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
    const goPost = (booth: string) => {
        if(navi.go){
            navigate(`/${navi.path}`, { state: booth });
        }
    }

    return(
        <div className={style.boothContainer} onClick={() => goPost(booth.booth_id)}>
            <img src='/images/boothImg.png' className={style.boothImg} />
            <div className={style.gradient}/>
            <div className={style.boothInfo}>
                <img src='/images/boothName.svg' className={style.boothName} height={20} />
                <p className={style.memberName}>{memberName(booth.members)}</p>
            </div>
        </div>
    )

}

export default Booth;