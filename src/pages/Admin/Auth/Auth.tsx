import React from "react";
import styles from "./Auth.scss";
import Button from "@/components/Button/Button";
import { setCookie } from "@/utils/cookieApi";

const Auth = () => {
  const onSubmit = () => {
    setCookie("mafia_user_key", "key");
    window.location.reload();
  };
  return (
    <div className={styles.container}>
      <div className={styles.auth}>
        <img
          className={styles.logo}
          src="/src/assets/images/logo.svg"
          alt="logo"
        />
        <form action="" onSubmit={onSubmit}>
          <input placeholder={"Логин"} className={styles.input} />
          <input placeholder={"Пароль"} className={styles.input} />
          <Button text={"Войти"} admin={true} className={styles.btn} />
        </form>
      </div>
    </div>
  );
};

export default Auth;
