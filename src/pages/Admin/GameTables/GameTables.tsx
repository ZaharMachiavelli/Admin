import React, { useEffect, useRef, useState } from 'react';
import NavBarAdmin from 'pages/Admin/components/NavBarAdmin/NavBarAdmin';
import GameTable from './components/GameTable/GameTable';
import styles from './GameTables.scss';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { store, useSelector } from 'store';
import Page from 'pages/Admin/components/Paginator/Page';
import SideFilter from 'pages/Admin/components/SideFilter/SideFilter';
import { adminActions } from 'store/admin/reducer';
import * as api from 'pages/Admin/api';
import UIText from 'utils/UIText';

interface PlayersStatus {
  inGame?: number;
  observers?: number;
  kicked?: number;
}

interface GameTableType {
  id: number;
  dateCreated: number;
  dateEnded?: string;
  progress: number;
  name?: string;
  gender?: string;
  playersStatus: PlayersStatus;
}

type GameTablesProps = {
  gameTables: GameTableType[];
};

type FilterType = 'all' | 'active' | 'archival';

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

function setPerPageCof() {
  if (window.innerWidth > 1100) return 0.11;
  if (window.innerWidth < 1100 && window.innerWidth > 960) return 0.15;
  if (window.innerWidth < 960 && window.innerWidth > 880) return 0.19;
  if (window.innerWidth < 880) return 0.35;
  return 1;
}

const initState = {
  fieldButton: {
    title: UIText.admin.gameTables.buttonTitle,
    actualValue: '',
    defaultValue: '',
    allValues: UIText.admin.gameTables.buttonAllValues,
    type: 'buttons',
  },

  fieldDate: {
    title: UIText.admin.gameTables.dateTitle,
    isDisabled: false,
    actualValue: UIText.admin.gameTables.dateActualValue,
    defaultValue: UIText.admin.gameTables.dateActualValue,
    allValues: UIText.admin.gameTables.dateAllVAlues,
    type: 'selector',
  },
  fieldPlayerFiltration: {
    title: UIText.admin.gameTables.filterTitle,
    isDisabled: false,
    actualValue: UIText.admin.gameTables.filterActualValue,
    defaultValue: UIText.admin.gameTables.filterActualValue,
    allValues: UIText.admin.gameTables.filterAllValues,
    type: 'selector',
  },
};

const pageInfo = {
  totalPages: 0,
  perPage: 0,
  currentPage: 1,
};

const GameTables: React.FC = () => {
  const getRooms = async (page: number, size: number) => {
    const resp = await api.getRooms(page - 1, size).catch(() => null);
    if (resp) {
      const pageData = resp.data;
      store.dispatch(adminActions.setLengthRooms(pageData.total_rooms_count));
      store.dispatch(adminActions.setRooms(pageData.rooms));
      pageState.current.totalPages = pageData.total_rooms_count;
    }
  };

  const playRooms = useSelector((state) => state.admin.playRooms);
  const dispatch = useDispatch();

  const totalPages = useSelector((state) => state.admin.playRoomsPaginator.totalTables);
  const perPage = useSelector((state) => state.admin.playRoomsPaginator.perPage);
  const currentPage = useSelector((state) => state.admin.playRoomsPaginator.currentPage);

  const [pagesCount, setPagesCount] = useState(Math.ceil(totalPages / perPage));
  const [numbLobby, setNumbLobby] = useState(0);
  const pages = createPages(pagesCount, currentPage);
  const [selectedMainFilter, setSelectedMainFilter] = useState<FilterType>('all');

  const [detailStatus, setDetailStatus] = useState(false);

  const [hideFilters, setHideFilters] = useState(true);
  const [fName, setFName] = useState();
  const [display, setDisplay] = useState(false);

  const [filterStatus, setFilterStatus] = useState(false);

  function setPerPage() {
    //@ts-ignore
    const cof = setPerPageCof();
    const el = document.getElementsByClassName(`${styles.containerTables}`)[0];
    //@ts-ignore
    const height = Math.floor(el.offsetHeight / (window.innerWidth * cof));

    let width = 0;

    if (window.innerWidth > 1100) width = 4;
    if (window.innerWidth < 1101 && window.innerWidth > 960) width = 3;
    if (window.innerWidth < 961 && window.innerWidth > 880) width = 2;
    if (window.innerWidth < 881) width = 1;

    dispatch(adminActions.setPerPagePlayrooms(height * width));
    pageState.current.perPage = height * width;
  }

  let state = useRef(initState);
  const pageState = useRef(pageInfo);

  function updateFilters(data: any) {
    state = data;
  }

  //FIXME wtf?
  const bodyClickLestener = (e: any) => {
    if (e.target.closest('#Filter') === null || e.target.id === 'accept') {
      setDisplay(false);
      // setL(true);
      setHideFilters(true);

      document.body.removeEventListener('click', bodyClickLestener);
    }
  };

  const filterClickHandler = () => {
    document.body.addEventListener('click', bodyClickLestener);
  };

  useEffect(() => {
    setPagesCount(Math.ceil(totalPages / pageState.current.perPage));
  }, [totalPages]);

  useEffect(() => {
    setNumbLobby(playRooms.length);
  }, [playRooms.length]);

  //@ts-ignore
  useEffect(() => {
    setPerPage();
    window.onresize = () => {
      setPerPage();
      setPagesCount(Math.ceil(totalPages / perPage));
    };

    return () => {
      window.onresize = () => {};
    };
  }, []);

  useEffect(() => {
    getRooms(pageState.current.currentPage, pageState.current.perPage);
    const t = setInterval(() => {
      getRooms(pageState.current.currentPage, pageState.current.perPage);
    }, 5000);

    return () => {
      t && clearInterval(t);
    };
  }, [pageState.current.currentPage, pageState.current.perPage]);

  const deleteLobby = () => {};
  useEffect(() => {
    setHideFilters(!hideFilters);
  }, [display]);

  const onAllClick = () => {
    setSelectedMainFilter('all');
    setNumbLobby(playRooms.filter((el) => el.progress >= 0).length);
  };
  const onActiveClick = () => {
    setSelectedMainFilter('active');
    setNumbLobby(playRooms.filter((el) => el.progress < 100).length);
  };
  const onArchivedClick = () => {
    setSelectedMainFilter('archival');
    setNumbLobby(playRooms.filter((el) => el.progress === 100).length);
  };

  const onClick = (e: MouseEvent) => {
    // @ts-ignore
    if (display && !e.target!.closest('#Filter')) {
      setDisplay(false);
    }
  };

  return (
    //@ts-ignore
    <div className={styles.container} onClick={onClick}>
      <NavBarAdmin curPage="tables" />

      <div className={styles.content}>
        <div
          className={classNames(styles.topLine)}>
          <div className={styles.topLineLeft}>
            <div className={styles.head}>
              <h1
                onClick={() => {
                  console.log(pageState);
                  setPagesCount(pagesCount + 1);
                }}>
                {UIText.admin.gameTables.gameTables}
              </h1>
              <div className={styles.numlobby}>
                <p
                  onClick={() => {
                    console.log(playRooms[0]);
                  }}>
                  {numbLobby}
                </p>
              </div>
            </div>
            {window.innerWidth < 961 ? (
              <button
                className={!hideFilters ? styles.filterBtnShow : styles.filterBtnHide}
                onClick={() => setDisplay((display) => !display)}
              />
            ) : (
              <div style={{ display: 'none' }}></div>
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
                <button onClick={onAllClick} className={selectedMainFilter === 'all' ? styles.topLineRightItem : ''}>
                  <p>{UIText.admin.gameTables.all}</p>
                </button>
              </li>
              <li>
                {__DEV__ && <button
                  onClick={onActiveClick}
                  className={selectedMainFilter === 'active' ? styles.topLineRightItem : ''}>
                  <p>{UIText.admin.gameTables.active}</p>
                </button>}
              </li>
              <li>
                {__DEV__ && <button
                  onClick={onArchivedClick}
                  className={selectedMainFilter === 'archival' ? styles.topLineRightItem : ''}>
                  <p>{UIText.admin.gameTables.arhive}</p>
                </button>}
              </li>
              <li>
                <button
                  onClick={() => {
                    setDetailStatus(!detailStatus);
                  }}
                  className={detailStatus ? styles.topLineRightItem : ''}>
                  <p>{UIText.admin.gameTables.detail}</p>
                </button>
              </li>
              <li>
                {window.innerWidth > 960 ? (
                  <button
                    className={!hideFilters ? styles.filterBtnShow : styles.filterBtnHide}
                    onClick={() => setDisplay((display) => !display)}
                  />
                ) : (
                  <div style={{ display: 'none' }}></div>
                )}
              </li>
            </ul>
          </div>}
        </div>
        <div className={classNames(styles.containerTables)}>
          {playRooms.map((room) => {
            if (
              (selectedMainFilter === 'active' && room.progress < 100) ||
              (selectedMainFilter === 'archival' && room.progress === 100) ||
              selectedMainFilter === 'all'
            )
              return (
                <GameTable
                  key={room.id}
                  id={room.id}
                  dateCreated={room.dateCreated}
                  progress={room.progress}
                  ownerName={room.ownerName}
                  ownerGender={room.ownerGender}
                  players={room.playersInRoom}
                  detailStatus={detailStatus}
                  playersStatus={room.players}
                  setCounterLobby={deleteLobby}
                  gameType = {room.gameType}
                />
              );
          })}
          <SideFilter data={state} onSubmit={updateFilters} display={display} />
        </div>
        <div className={styles.paginator}>
          {pages.map((page, index) => {
            if (pagesCount > 1) {
              return (
                <Page
                  key={index + '1'}
                  id={index}
                  active={pageState.current.currentPage === page}
                  number={page}
                  update={(currentPage) => getRooms(currentPage, pageState.current.perPage - 1)}
                  type="tables"
                  data={pageState}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default GameTables;
