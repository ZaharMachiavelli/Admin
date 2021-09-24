import React, { useEffect, useState } from "react";
import styles from "./Button.scss";

type Props = {
    data:any;
    text: string;
    rerender: Function
}

const Button = ({data,text, rerender}:Props) => {
    
    



    return (
        <button 
    className={`${styles.button} ${data.actualValue==text?styles.chosed:{}}`}
    onClick ={()=>{data.actualValue=text; rerender()}}
    >
    {text}
    </button>
    )

    

}

export default Button