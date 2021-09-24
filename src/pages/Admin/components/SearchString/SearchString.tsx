import classNames from "classnames";
import React, { useState } from "react";
import styles from "./SearchString.scss"
import search from "@/assets/images/admin/search.svg";


type Props = {
    clBack: any;
}

const SearchString = ({clBack} : Props) => {
    const [show, setShow] = useState(Boolean);
    let checkTime: any;

    const typeEv = (inpValue: string) => {
        const getTime = new Date().getTime();
        if ( checkTime) {clearTimeout(checkTime);}
        checkTime = setTimeout(() =>  {
            const currDate = new Date().getTime();
            if (currDate - getTime > 2000) {
                clBack(inpValue);
            }
        }, 2001)
    }
    return(
        <div className={styles.container}>
            <button className={styles.buttonShowFilter} onClick={() => setShow(!show)} >
                <img src={search} alt="filterImg" />
            </button> 
            <div className={classNames(styles.inpContainer, show ? styles.show : styles.hide)}>
                <input className={styles.inp}
                       id="inp"
                       type="text"
                       maxLength={12}
                       onChange={(ev) => {typeEv(ev.target.value)}}
                       />
            </div>
        </div>
    )
}

export default SearchString;