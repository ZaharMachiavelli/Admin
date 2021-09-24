import React from "react";
import styles from "./Page404.module.scss";
import { Link } from "react-router-dom";
import Button from "@/components/Button/Button";

const Page404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h3 className={styles.subtitle}>Здесь никого нет</h3>
      <Link to={'/home'}>
        <Button text={'Меню'} className={styles.btn} />
      </Link>
    </div>
  );
};

export default Page404;
