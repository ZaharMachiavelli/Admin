import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames';

type Props = {
  text: string;
  id?: string;
  gray?: boolean;
  yandex?: boolean;
  admin?: boolean;
  onClick?: any;
  className?: string;
  disabled?: boolean;
};

const Button = ({ text, onClick, id, gray, className, admin, disabled }: Props) => {
  let style = styles.redBtn;
  if (gray) {
    style = styles.grayBtn;
  } else if (admin) {
    style = styles.adminBtn;
  }

  return (
    <button id={id} onClick={onClick} disabled={disabled} className={classNames(style, className)}>
      {text.toUpperCase()}
    </button>
  );
};

export default Button;
