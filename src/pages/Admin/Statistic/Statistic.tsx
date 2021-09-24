import React, { useRef, useEffect } from 'react';
import styles from './Statistic.scss';
import NavBarAdmin from 'pages/Admin/components/NavBarAdmin/NavBarAdmin';
import TablesInfo from 'pages/Admin/Statistic/components/TablesInfo/TablesInfo';
import ScrollCard from './components/ScrollCard/ScrollCard';
import UIText from 'utils/UIText';
import SelectorFilter from "../components/SideFilter/SelectorFilter/SelectorFilter"

interface Card {
  typeAch: string;
  valueAch: string;
}


const cards = [
  {
    typeAch: UIText.admin.statistic.numPlayers,
    valueAch: '9278',
  },
  {
    typeAch: UIText.admin.statistic.playedGames,
    valueAch: '9278',
  },
  {
    typeAch: UIText.admin.statistic.middleGames,
    valueAch: '9278',
  },
  {
    typeAch: UIText.admin.statistic.middleGamesTable,
    valueAch: '9278',
  },
  {
    typeAch: UIText.admin.statistic.middleTime,
    valueAch: '9278',
  },
  {
    typeAch: UIText.admin.statistic.retentionRate,
    valueAch: '9278',
  },
];

const Statistic = () => {
  const initState = {
    fieldDate: {
      title: '',
      isDisabled: false,
      actualValue: UIText.admin.statistic.actualValue,
      defaultValue: UIText.admin.statistic.actualValue,
      allValues: UIText.admin.statistic.allValues,
      type: 'selector',
    },
  };

  useEffect(() => {}, []);

  const state = useRef(initState);

  return (
    <div className={styles.container}>
      <NavBarAdmin curPage="statistic" />
      

      <div className={styles.content}>
      <div className={styles.topLine}>
       <h1>{UIText.admin.statistic.header}</h1>
       <div className={styles.filterContainer}>
         <SelectorFilter data={state.current.fieldDate} />
       </div>
      </div>
        <div className={styles.statistic}>
          <TablesInfo random={1} lobby={1} />
        </div>

        <div className={styles.cardsContainer}>
          {cards.map((e, i) => (
            <ScrollCard typeAch={e.typeAch} valueAch={e.valueAch} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistic;
