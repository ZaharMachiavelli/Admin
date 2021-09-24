import React, { useState } from "react";
import styles from "./SelectorFilter.scss";



type Props = {

    data: {
        title: string;
        isDisabled: boolean;
        actualValue: string;
        allValues: string[]
    },
};


const SelectorFilter = ({ data}:Props) => {
    
    const styleWhite = { color: "white" };
    const [activeList, setActiveList] = useState(false);
    


    let {title, isDisabled, actualValue, allValues} = data;

   
    return (
        <div className={`${styles.FilterVariant} ${isDisabled?styles.disabledFilter:""}`}>
        <h2>{title}</h2>
        <div className={styles.lowerFilterContainer}>
          <button
            disabled = {isDisabled} 
            className={styles.choosedLineLower}
            onClick={() => (setActiveList(!activeList))
           }
          >
            <div>
              <p>{data.actualValue}</p>
              <span>
                &#708;
                <br />
                &#709;
              </span>
            </div>
          </button>
          <div
            className={styles.dropedListLower}
            onClick={()=>{setActiveList(false)}}
            style = {activeList?{}:{display:"none"}}
            // onClick={() => {setHideElementsOfFilter("");}}
            // style={iWidth > 880 ? (hideElementsOfFilter != "date" ? { display: "none" } : {}) : { display: "none" }}
          >
             {data.allValues.map((el:string, index: any)=>{
                //@ts-ignore
                return (
                <button key={index} className={styles.listItem} value={el} 
                  onClick={() => {data.actualValue = el;}}>
                    {/*@ts-ignore */}
                    <p style={data.actualValue===el? styleWhite:{}}>{el}</p>
                </button>)
            })} 
          </div>
        
        </div>
      </div>
    )
}

export default SelectorFilter;