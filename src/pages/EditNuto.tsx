import def from "../styles/Default.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import style from "../styles/EditNuto.module.css";

function EditNuto({}) {
  const tomatos = [
    { src: "/images/redTomato.png", comment: "최고였다는 극찬" },
    { src: "/images/orangeTomato.png", comment: "신선한 아이디어" },
    { src: "/images/greenTomato.png", comment: "따뜻한 응원" },
  ];

  return (
    <div className={def.Body}>
      <Header prevSrc="-1" nextSrc="/" />
      <div className={style.NutoContainer}>
        <p>토마토를 선택해 주세요.</p>
        <div className={style.ChooseTomatoContainer}>
          {tomatos.map((tomato, idx: number) => {
            return (
              <div>
                <img
                  src={tomato.src}
                  alt={tomato.comment}
                  style={{ width: 98, height: 76 }}
                />
                <p>{tomato.comment}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditNuto;
