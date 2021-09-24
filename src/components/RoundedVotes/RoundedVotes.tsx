import styles from './RoundedVotes.module.scss';
import React from 'react';
import classNames from 'classnames';
type PropsType = {
  count: number | string;
};
const RoundedVotes = ({ count }: PropsType) => {
  return (
    <span className={classNames(styles.roundedVotesContainer, { [styles.roundedVotesContainerRed]: count > 0 })}>
      <span className={classNames(styles.roundedVotes, { [styles.roundedVotesRed]: count > 0 })}>{count}</span>
    </span>
  );
};

export default RoundedVotes;
