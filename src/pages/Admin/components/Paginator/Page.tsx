import React, { MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Page.scss';
import { store } from 'store';
import classNames from 'classnames';
import { adminActions } from 'store/admin/reducer';

type PageProps = {
  number: number;
  active: boolean;
  id: number;
  update: (currentPage: number) => void;
  type: string;
  data: MutableRefObject<paginatorState>;
};

type paginatorState = {
  currentPage: number;
  totalPages: number;
  perPage: number;
};

const Page: React.FC<PageProps> = ({ number, active, id, update, type, data }) => {
  const dispatch = useDispatch();

  function doUpdate(type: string) {
    if (type) {
      dispatch(adminActions.setCurrentPage(number));
      data.current.currentPage = number;
      update(data.current.currentPage);
    }

    if (type === 'players1') {
      dispatch(adminActions.setCurrentPagePlayers(number));
      update(store.getState().admin.playersPaginator.currentPage);
    }
  }

  const onClick = () => {
    doUpdate(type);
  };

  return (
    <span className={classNames(styles.page, active && styles.activePage)} onClick={onClick}>
      {number}
    </span>
  );
};

export default Page;
