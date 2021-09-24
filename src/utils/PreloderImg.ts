import cards from 'assets/images/background/cards.jpg';
import man from 'assets/images/background/man.jpg';

import DonFull from '/src/assets/images/cards/jpg/Don.jpg';
import MafiaFull from '/src/assets/images/cards/jpg/Mafia.jpg';
import SheriffFull from '/src/assets/images/cards/jpg/Sheriff.jpg';
import CivilianFull from '/src/assets/images/cards/jpg/Citizen.jpg';
import UnknownFull from '/src/assets/images/cards/jpg/Back.jpg';
import DonSm from '/src/assets/images/cards/jpg/Don_min.jpg';
import MafiaSm from '/src/assets/images/cards/jpg/Mafia_min.jpg';
import SheriffSm from '/src/assets/images/cards/jpg/Sheriff_min.jpg';
import CivilianSm from '/src/assets/images/cards/jpg/Citizen_min.jpg';
import UnknownSm from '/src/assets/images/cards/jpg/Back_min.jpg';

const waitImageLoad = (src: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener('load', resolve);
    img.src = src;
  });
};

export const preloadImage = async () => {
  const prelodedImages = [
    cards,
    man,
    DonFull,
    MafiaFull,
    SheriffFull,
    CivilianFull,
    UnknownFull,
    DonSm,
    MafiaSm,
    SheriffSm,
    CivilianSm,
    UnknownSm,
  ];
  await Promise.all(prelodedImages.map((i) => waitImageLoad(i)));
};
