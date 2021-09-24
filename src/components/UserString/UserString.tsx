import React from "react";
import styles from "./UserString.scss";
import classNames from "classnames";
import Badge from "@/components/Badge/Badge";

interface achTypes {
  type: string;
  num: number;
}

type Props = {
  place: number;
  name: string;
  gender: string;
  gamesWon?: Array<achTypes>;
  className?: any;
  statusType?: string;
  totalOfVoting?: number;
};

const UserString = ({ place, name, gamesWon, gender, className, statusType, totalOfVoting }: Props) => {
  if (gender === "man") {
    gender = "/src/assets/images/icons/man.svg";
  } else {
    gender = "/src/assets/images/icons/woman.svg";
  }
  const turle = "/src/assets/images/icons/svg/redTurtle.svg";
  const lattice = "/src/assets/images/icons/svg/lattice.svg";

  return (
    <div className={styles.userStringLowContainer}>
      {gamesWon ? (
        <div className={(className ? styles.userPageItemShadow + " " : "") + styles.userPageItem}>
          <div className={styles.userPlace}>{place}</div>
          <div className={styles.userPictureContainer}>
            <img src={gender} alt={"Player"} className={styles.userPicture} />
          </div>
          <div className={styles.userName}>{name}</div>
          <div className={styles.userScore}>
            {gamesWon?.map((ach, i) => {
              return <Badge key={"userRowKey" + i} type={ach.type} className={styles.userAch} count={ach.num} />;
            })}
          </div>
        </div>
      ) : (
        <div
          className={classNames(
            statusType && styles.userPageItemShadow,
            styles.userPageItem,
            className && styles.totalOfVotingStringShadow
          )}
        >
          <div className={classNames(styles.userPlace, totalOfVoting && styles.bigStringPlace)}>{place}</div>

          <div className={classNames(styles.userPictureContainer, totalOfVoting && styles.bigString)}>
            <img src={gender} alt={"Player"} className={styles.userPicture} />
          </div>

          <div className={classNames(styles.userName, totalOfVoting && styles.bigStringName)}>{name}</div>

          {statusType != undefined ? (
            <img
              src={statusType == "turtle" ? turle : lattice}
              alt="status"
              className={statusType == "turtle" ? styles.resultConTurtle : styles.resultConLattice}
            />
          ) : (
            <div className={styles.totalOfVotingBorder}>
              <div className={styles.totalOfVoting}>
                <p>{totalOfVoting}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default UserString;
