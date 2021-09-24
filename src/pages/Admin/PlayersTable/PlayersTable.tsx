import React, { useEffect, useState, useRef } from 'react';
import NavBarAdmin from 'pages/Admin/components/NavBarAdmin/NavBarAdmin';
import PlayerCard from './PlayerCard';
import styles from './PlayersTable.scss';
import { store, useSelector } from 'store';
import { adminActions } from 'store/admin/reducer';
import SearchString from 'pages/Admin/components/SearchString/SearchString';
import SideFilter from 'pages/Admin/components/SideFilter/SideFilter';
import * as api from 'pages/Admin/api';
import UIText from 'utils/UIText';

function createPages(pagesCount: number, currentPage: number) {
  const pages = [];
  if (pagesCount > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        pages.push(i);
        if (i == pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
        if (i == pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }

  if (pages.length == 0) pages.push(1, 2, 3);
  return pages;
}

const getPlayers = async (page: number, size: number) => {
  const resp = await api.getPlayers(page - 1, size).catch(() => null);
  console.log('api.getPlayers', resp?.data);
  if (resp) {
    const pageData = resp.data;
    store.dispatch(adminActions.setPlayersLength(pageData.total_users_count));
    store.dispatch(adminActions.setPlayers(pageData.users));
  }
};

function setPerPage() {
  //@ts-ignore
  const height = Math.floor(document.getElementsByClassName(`${styles.playerArea}`)[0].offsetHeight / 60);

  let width;

  if (window.innerWidth < 1440) {
    if (window.innerWidth < 960) {
      width = 1;
    } else {
      width = 3;
    }
  } else {
    width = 5;
  }

  store.dispatch(adminActions.setPerPagePlayers(height * width));
}

function deleteElem(index: number) {
  store.dispatch(adminActions.removePlayers(index));
}

const initState = {
  fieldDate: {
    title: UIText.admin.playerTables.title,
    isDisabled: false,
    actualValue: UIText.admin.playerTables.actualValue,
    defaultValue: UIText.admin.playerTables.actualValue,
    allValues: UIText.admin.playerTables.allValues,
    type: 'selector',
  },
  fieldPlayerFiltration: {
    title: UIText.admin.playerTables.sortTitle,
    isDisabled: false,
    actualValue: UIText.admin.playerTables.sortActualValue,
    defaultValue: UIText.admin.playerTables.sortAllValues,
    allValues: UIText.admin.playerTables.sortAllValues,
    type: 'selector',
  },
};

const GameTables = () => {
  const players = useSelector((state) => state.admin.players);
  const totalPages = useSelector((state) => state.admin.playersPaginator.totalPlayers);
  const perPage = useSelector((state) => state.admin.playersPaginator.perPage);
  const currentPage = useSelector((state) => state.admin.playersPaginator.currentPage);
  const [playersCount, setPlayersCount] = useState(players?.length);
  const [pagesCount, setPagesCount] = useState(Math.ceil(totalPages / perPage));
  const [selectedMainFilter, setSelectedMainFilter] = useState('all' as 'all' | 'active' | 'banned');
  const [hideFilters, setHideFilters] = useState(true);
  const [display, setDisplay] = useState(false);
  let state = useRef(initState);
  const [filterStatus, setFilterStatus] = useState(false);

  const pages = createPages(pagesCount, currentPage);

  useEffect(() => {
    setPerPage();
    window.onresize = () => {
      setPerPage();
    };
    return () => {
      window.onresize = () => {};
    };
  }, []);

  useEffect(() => {
    setPagesCount(Math.ceil(totalPages / perPage));
  }, [totalPages]);

  useEffect(() => {
    getPlayers(currentPage, perPage);
    const t = setInterval(() => {
      getPlayers(currentPage, perPage);
    }, 5000);

    return () => {
      t && clearInterval(t);
    };
  }, [currentPage, perPage]);

  useEffect(() => {
    setPlayersCount(players?.length);
  }, [players?.length]);

  const updateFilters = (data: any) => {
    state = data;
  };


  return (

    //@ts-ignore
    <div className={styles.container} onClick={(e:Event)=>display?e.target.closest("#Filter")?{}:setDisplay(false):{}}>
      <NavBarAdmin curPage="playercard" />

      <div className={styles.content}>
        <div className={styles.topLine}>
          <div className={`${styles.topLineLeft}`}>
            <div className={styles.head}>
              <h1>{UIText.admin.playerTables.players}</h1>
              <div className={styles.playersCount}>
                <p>{playersCount}</p>
              </div>
            </div>
            {window.innerWidth < 961 ? (
              <button
                className={!hideFilters ? styles.filterBtnShow : styles.filterBtnHide}
                onClick={() => {
                  ()=>setDisplay(display => !display)
                }}
              />
            ) : (
              <div style={{ display: 'none' }} />
            )}
          </div>
          {__DEV__ && <div className={styles.topLineRight}>
            <button className={styles.buttonFilters} onClick={() => setFilterStatus(!filterStatus)}>
              Фильтры {filterStatus ? '∨' : '>'}
            </button>
            <ul
              className={styles.filterList}
              style={{ display: `${window.innerWidth >= 500 ? 'flex' : filterStatus ? 'block' : 'none'}` }}>
              <li>
                <button
                  onClick={() => setSelectedMainFilter('all')}
                  className={selectedMainFilter === 'all' ? styles.topLineRightItem : ''}>
                  <p>{UIText.admin.gameTables.all}</p>
                </button>
              </li>

              <li>
                {__DEV__ && <button
                  onClick={() => setSelectedMainFilter('active')}
                  className={selectedMainFilter === 'active' ? styles.topLineRightItem : ''}>
                  <p>{UIText.admin.gameTables.active}</p>
                </button>}
              </li>

              <li>
                {__DEV__ && <button
                  onClick={() => setSelectedMainFilter('banned')}
                  className={selectedMainFilter === 'banned' ? styles.topLineRightItem : ''}>
                  <p>{UIText.admin.gameTables.arhive}</p>
                </button>}
              </li>
              <li>
                {window.innerWidth > 960 ? (
                  <button
                    className={!hideFilters ? styles.filterBtnShow : styles.filterBtnHide}
                    onClick={()=>setDisplay(display => !display)}
                  />
                ) : (
                  <div style={{ display: 'none' }}></div>
                )}
              </li>
            </ul>
          </div>}
        </div>
        <div className={styles.playerArea}>
          {/* {Array.from(new Set(players?.map((u) => u.room_name)))?.map((room) => {
            const poolType = players.find((p) => p.room_name === room)!.pool_type;
            return (
             //ОТОРВУ РУКИ ТОМУ, КТО ЕЩЕ ЗДЕСЬ ВТИХУШКУ РЕШИТ ЧТО-ТО ПОМЕНЯТЬ!!!
             
             <div key={room} className={styles.roomRow}>
                <h1>
                  Комната: {room} [{poolType}]
                </h1>
                <div style={{ marginBottom: 10 }}>
                  <a href={`${window.location.origin}/lobby/${room}`} target={'_blank'} rel="noreferrer">
                    войти
                  </a>
                </div>
                <div className={styles.playersContainer}>
                  {players
                    .filter((u) => u.room_name === room)
                    .map((u) => (
                      <PlayerCard player={u} deleteElem={deleteElem} key={u.id} />
                    ))}
                </div>
              </div>
            );
          })} */}
          {players.map((el)=>{
            return (
              <PlayerCard key={el.id} player={el} deleteElem={deleteElem}/>
            )
          })}
          <SideFilter onSubmit={updateFilters} display={display} data={state} />
        </div>

        <div className={styles.paginator} />
      </div>
    </div>
  );
};

export default GameTables;
