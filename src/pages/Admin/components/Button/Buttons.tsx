import React from "react";
import styles from "./Buttons.scss";

type Props = {
  text: string;
  type: string;
  action: Function;
}


const Buttons = ({text,type,action}:Props) => {
  return (
    <div className={styles.topLineRightButton}>
      <button className={type==="green"?styles.green :type==="banned"?styles.ban:type==="delete"?styles.delete:styles.opacityGreen} onClick={()=>{action}}>
        <span className={styles.text}>{text}</span>
      </button>
      {/* <button className={styles.delete}>
        <span className={styles.text}>Удалить</span>
      </button> */}
    </div>
  );
};

export default Buttons;
