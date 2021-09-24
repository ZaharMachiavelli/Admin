import React from 'react';
import classnames from 'classnames';
import styles from './Title.scss';

type props = {
  text: string;
  classname?: string;
  withArrows?: boolean;
};

const Title = ({ text, classname, withArrows }: props) => {
  return (
    <h1 id={'pageTitle'} className={classnames(styles.title, { [styles.arrows]: withArrows }, classname)}>
      {text}
    </h1>
  );
};

export default Title;
