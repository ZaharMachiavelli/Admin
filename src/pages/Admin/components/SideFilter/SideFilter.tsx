import React, { useState } from 'react';
import styles from './SideFilter.scss';
import trashIcon from 'assets/images/admin/icon-of-trash.svg';
import SelectorFilter from 'pages/Admin/components/SideFilter/SelectorFilter/SelectorFilter';
import Button from 'pages/Admin/components/SideFilter/Button/Button';
import UIText from 'utils/UIText';

type Props = {
  onSubmit: Function;
  data: any;
  display: boolean;
};

const sideFilter = ({ onSubmit, data, display }: Props) => {
  function Rerender() {
    setRerender(rerender + 1);
  }

  const [rerender, setRerender] = useState(1);

  const clearAll = () => {
    Object.keys(data.current).forEach((key) => {
      //@ts-ignore
      data.current[key].actualValue = data.current[key].defaultValue;
    });

    Rerender();
  };



  return (
    <div id="Filter" className={`${styles.filter} ${display ? styles.displayFlex : styles.displayNone}`}>
      <div className={styles.filterHead}>
        <div className={styles.header}>
          <h1>{UIText.admin.sideFilter.filter}</h1>

          <button
              className={styles.buttonFilter}
              onClick={() => {
              clearAll();
            }}>
            <img src={trashIcon} alt="icon: trash" />
            <p>{UIText.admin.sideFilter.clean}</p>
          </button>
        </div>
        {
          <div className={styles.filterElem}>
            <h2>{UIText.admin.sideFilter.gameType}</h2>

            {Object.entries(data.current).map(([name, data]) => {
              //@ts-ignore
              if (data.type === 'buttons') {
                return (
                  <div className={styles.buttonsRow}>
                    {/*@ts-ignore*/}
                    {data.allValues.map((el, index) => {
                      // @ts-ignore
                      return <Button data={data} text={data.allValues[index]} key={index + 174} rerender={Rerender} />;
                    })}
                  </div>
                );
              }
              //@ts-ignore
              if (data.type === 'selector') {
                //@ts-ignore
                return <SelectorFilter data={data} key={Math.random() + Math.random()} />;
              }
            })}
          </div>
        }
      </div>
      <button
        className={styles.acceptBtn}
        onClick={() => {
          clearAll();
        }}
        id="accept">
        {UIText.admin.sideFilter.accept}
      </button>
    </div>
  );
};

export default sideFilter;
