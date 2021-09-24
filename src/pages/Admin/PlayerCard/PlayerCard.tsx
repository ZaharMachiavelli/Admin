import React, { useEffect, useState } from "react";
import styles from "./PlayerCard.scss";
import NavBarAdmin from "@/pages/Admin/components/NavBarAdmin/NavBarAdmin";
import Buttons from "@/pages/Admin/components/Button/Buttons";
import BannedPlayer from "@/pages/Admin/PlayerCard/components/BannedPlayer";
import { useHistory } from "react-router-dom";
import { store, useSelector } from "@/store";
import arrow from "@/assets/images/admin/arrow.svg";
import man from "@/assets/images/admin/man.png";
import playedGames from "@/assets/images/admin/PlayedGames.png";
import wins from "@/assets/images/admin/Wins.png"
import achievs from "@/assets/images/admin/achievments.png";
import playnow from "@/assets/images/admin/playnow.svg";
import cards from "@/assets/images/admin/cards.svg";
import clocks from "@/assets/images/admin/Clocks.svg";
import banAvatar from "@/assets/images/admin/banAvatar.svg"
import banSymbol from "@/assets/images/admin/banSymbol.svg"
import UIText from "utils/UIText";

function ParseInt(string:string) {
  var a = string.split('/');
  var num = parseInt(a[a.length-1].replace(/\D+/g,""));
  return num-1;

}
const PlayerCard = () => {
  const [player, setPlayer] = useState(null as any) 
  const [index, setIndex] = useState(0);

  useEffect(()=> {
    const ind =  ParseInt(window.location.href)
    const pl = store.getState().admin.players![ind];
    setPlayer(pl)
  }, [])

  // const players = useSelector(state => state.admin.players)
  
  const history = useHistory();
  
  if (player === null) return <p>loading....</p> 
  return (
    <div className={styles.container}>
      <div className={styles.startcontainer}>
        <NavBarAdmin curPage="playercard" />
        <div className={styles.topLine}>
          <div className={styles.topLineLeft}>
            <button onClick={() => history.goBack()}>
            <img
              src={arrow}
              alt="icon:arrow"
              className={styles.back_button}
            />
            </button>
            <div className={styles.profavatar}>
            <img
              alt="icon:profile"
              src={man}
            />
            </div>
            
            <h1>{player.name}</h1>
          </div>
          {/* <Buttons /> */}
        </div>
        <hr className={styles.hr} />
        <div className={styles.statistic}>
          <div className={styles.achievs}>
            <div>
              <img src={playedGames} alt="Сыгранные игры" />
              <span className={styles.caption}>
                {UIText.admin.playerCard.playedGames}
              </span>
            </div>
            <div>
              <img src={wins} alt="Выигранных игр" />
              <span className={styles.caption}>
                {UIText.admin.playerCard.winnedGames}
              </span>
            </div>
            <div>
              <img src={achievs} alt="Достижения" />
              <span className={styles.caption}>
                {UIText.admin.playerCard.achievs}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.panels}>
          <div className={styles.panel}>
            <div>
              <img src={playnow} alt="icon:timePlaying" />{" "}
              <span className={styles.graytext}>{UIText.admin.playerCard.nowPlaying}</span>
            </div>{" "}
            <button>{UIText.admin.playerCard.watch}</button>
          </div>

          <div className={styles.panel}>
            <div>
              <img src={cards} alt="icon:timePlaying" />{" "}
              <span className={styles.graytext}>{UIText.admin.playerCard.createdTables}</span>
            </div>{" "}
            <span>{player.createdDesk}</span>
          </div>

          <div className={styles.panel}>
            <div>
              <img src={clocks} alt="icon:timePlaying" />{" "}
              <span className={styles.graytext}>{UIText.admin.playerCard.playedTime}</span>
            </div>{" "}
            <span>{player.playedTime} {UIText.admin.playerCard.hours}</span>
          </div>
        </div>
        <hr />
        <h2>{UIText.admin.playerCard.banHistory}</h2>
      </div>
      <div className={styles.ban_history}>
        <table className={styles.ban_players_list}>
          <BannedPlayer
            idprofile={5}
            playerava={banAvatar}
            name="Александр"
            bansymbol={banSymbol}
            bancount={3}
            date={new Date(2021, 2, 29)}
          />
          <BannedPlayer
            idprofile={2}
            playerava={banAvatar}
            name="Александр"
            bansymbol={banSymbol}
            bancount={4}
            date={new Date(2021, 2, 26)}
          />
          <BannedPlayer
            idprofile={9}
            playerava={banAvatar}
            name="Александр"
            bansymbol={banSymbol}
            bancount={2}
            date={new Date(2021, 2, 25)}
          />
          <BannedPlayer
            idprofile={4}
            playerava={banAvatar}
            name="Александр"
            bansymbol={banSymbol}
            bancount={5}
            date={new Date(2021, 2, 21)}
          />
        </table>
      </div>
      {/* <Buttons /> */}
    </div>
  );
};

export default PlayerCard;
