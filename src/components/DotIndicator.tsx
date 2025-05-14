import style from "../styles/DotIndicator.module.css"

function Dot({i, index, setIndex}){
    return(
        <div
            className={style.dot}
            style={{backgroundColor: (i===index?'#91A402':'rgba(249, 242, 229, 60%)')}}
            onClick={() => setIndex(i)}>

        </div>
    )
}

function DotIndicator({len, index, setIndex}){
    const elements = [];
    for (let i = 0; i < len; i++) {
      elements.push(<Dot i={i} index={index} setIndex={setIndex} />);
    }

    return (
        <div className={style.dotIndicator}>
            <div className={style.dotContainer}>
                {elements}
            </div>
        </div>
    )
}

export default DotIndicator