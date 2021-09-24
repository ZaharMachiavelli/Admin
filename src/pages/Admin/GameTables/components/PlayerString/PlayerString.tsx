import classNames from "classnames";
import React, { useState } from "react";
import styles from "./PlayerString.scss"
import male from "@/assets/images/icons/man.svg";
import female from "@/assets/images/icons/woman.svg";
import microoff from "@/assets/images/admin/microoff.png";
import cameraerror from "@/assets/images/admin/camerawtf.png";
import inGame from "@/assets/images/admin/inGame-ico.svg";
import observer from "@/assets/images/admin/observers-ico.svg";
import banned from "@/assets/images/admin/kicked-ico.svg";
import Buttons from "@/pages/Admin/components/Button/Buttons";
import UIText from 'utils/UIText';

type Props = {
    id: number;
    gender: string; 
    name: string;
    status: string;
    deviceStatus?: string; 
    kickedNumber?: number;
}


const PlayerString = ({id, gender, name, status, deviceStatus, kickedNumber} : Props) => {
   
    let srcDevice: string = "";
    let even: boolean = false;
    let btnStateStyle = kickedNumber ? styles.btnUnban : styles.btnBan;


    

    if (deviceStatus === "micro") {
        srcDevice = "/src/assets/images/admin/microoff.png";
    }
    else if (deviceStatus === "camera") {
        srcDevice = "/src/assets/images/admin/camerawtf.png";
    }
    if (id % 2) {
        even = true;
    }
    
    return (
    <div className={classNames(styles.container, even && styles.bgLight)}>
        <div className={styles.leftItem}>
            <p className={styles.id}>{id}</p>
            <div className={styles.playerIco}>
                <img src={gender="MALE"?male:female} alt="playerIco" />
            </div>
            {deviceStatus && 
                    <div className={styles.deviceContainer}>
                        <img src={srcDevice}/>
                    </div>
                }
            <p className={classNames(styles.name, srcDevice != "" && styles.devName)}>{name}</p>
        </div>
        <div className={styles.rightItem}>
            <div className={styles.statusIcoContainer}>
                <img src={status==="kicked"?banned:status==="inGame"?inGame:observer} alt="playerStatus" />
                {kickedNumber && <p>{kickedNumber}</p>}
            </div>
            <Buttons text={status==="kicked"?UIText.admin.gameTables.playerUnban:UIText.admin.gameTables.playerBan} type={status==="kicked"?"banned":"opacityGreen"} action={()=>{}} />
        </div>
    </div>
    )
}

export default PlayerString;