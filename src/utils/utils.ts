import UIText from 'utils/UIText';
import { Role } from 'types/PlayerTypes';
import { setCookie } from './cookieApi';
import { store } from '../store';
import { profileActions } from '../store/profile/reducer';
import { appActions } from '../store/app/reducer';
import { getPlayerStats } from '../api';

export const role2text: { [key in Role]: string } = {
  don_mafia: UIText.role.don_mafia,
  mafia: UIText.role.mafia,
  sheriff: UIText.role.sheriff,
  civilian: UIText.role.civilian,
};

let isMobileMemo: boolean | null = null;
export const isMobile = (): boolean => {
  if (isMobileMemo !== null) return isMobileMemo;
  let check = false;

  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        a.substr(0, 4),
      )
    ) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || (window as any).opera);

  if (check) {
    isMobileMemo = check;
    return check;
  }

  if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
    check = true; // ipad is mobile too
  }

  isMobileMemo = check;
  return check;
};

const getPlayerSDK = () => {
  return window.ysdk.getPlayer();
};

export const setPlayerSDK = async () => {
  const player = await getPlayerSDK();
  if (player) {
    try {
      // @ts-ignore
      Object.entries(player).forEach(([key, value]) => {
        console.log(key, value);
      });
    } catch (e) {
      console.log(e);
    }
    const id = player.getUniqueID();
    const userStats = await getPlayerStats(id).then((r) => r.data);
    setCookie('ya_token', id, { 'max-age': 604000 });
    store.dispatch(
      profileActions.setBadges({
        games: userStats.plays_count,
        wins: userStats.win_count,
        achievements: userStats.achievements_count,
      }),
    );
    store.dispatch(
      profileActions.setUserInfo({
        YandexId: id,
        name: player.getName(),
        avatar: player.getPhoto('small'),
      }),
    );
    store.dispatch(appActions.setYAAuth(true));
  }
};

export const onClickYALoginBtn = async () => {
  if (window.is_yandex) {
    getPlayerSDK()
      .catch(() => {
        window.ysdk.auth.openAuthDialog().then((player: any) => {
          setPlayerSDK();
        });
      })
      .finally(() => {
        setPlayerSDK();
      });
  } else {
    let redirectUri = 'http://localhost:8080';
    const link = document.createElement('a');
    const value =
      'https://oauth.yandex.ru/authorize?response_type=token&client_id=a156fb5bd30945549bbe46d6df545491' +
      '&redirect_uri=' +
      redirectUri;
    link.setAttribute('href', value);
    link.click();
  }
};

export const getRandomName = (): string => {
  const names = [
    'Якоб',
    'Вильям',
    'Итан',
    'Мишель',
    'Алекс',
    'Джеймс',
    'Эмма',
    'Оливия',
    'София',
    'Изабелла',
    'Ева',
    'Даниель',
    'Бенджамин',
    'Логан',
    'Эйдан',
    'Мия',
    'Эмили',
    'Эбигейл',
    'Мэдисон',
    'Шарлота',
    'Джойден',
    'Метью',
    'Джексон',
    'Давид',
    'Лукас',
    'Харпер',
    'Эвери',
    'Элизабет',
    'Амелия',
    'Эвелин',
    'Джозеф',
    'Энтони',
    'Эндрю',
    'Самуэль',
    'Габриель',
    'Элла',
    'Хлоя',
    'Виктория',
    'Зои',
    'Натали',
    'Лилиан',
  ];
  return names[Math.floor(Math.random() * (names.length - 1))];
};
export const isSwearWord = (name: string): boolean => {
  name = name.toLowerCase();
  const swearWords = [
    'anal',
    'anus',
    'arse',
    'ass',
    'ballsack',
    'bastard',
    'bitch',
    'biatch',
    'blowjob',
    'bollock',
    'bollok',
    'boner',
    'boob',
    'bugger',
    'bum',
    'butt',
    'buttplug',
    'clitoris',
    'cock',
    'coon',
    'crap',
    'cunt',
    'damn',
    'dick',
    'dildo',
    'dyke',
    'fag',
    'faggοt',
    'feck',
    'fellate',
    'fellatio',
    'felching',
    'fuck',
    'fuck',
    'fudgepacker',
    'fudge packer',
    'flange',
    'Goddamn',
    'God damn',
    'hell',
    'homo',
    'jerk',
    'jizz',
    'knobend',
    'labia',
    'lmao',
    'lmfao',
    'muff',
    'nigger',
    'nigga',
    'omg',
    'penis',
    'piss',
    'poop',
    'prick',
    'pube',
    'pussy',
    'queer',
    'scrotum',
    'sex',
    'shit',
    'sh1t',
    'slut',
    'smegma',
    'spunk',
    'tit',
    'tosser',
    'turd',
    'twat',
    'vagina',
    'wank',
    'whore',
    'wtf',
    'сука',
    'ебать',
    'ёб',
    'ёб',
    'пизд',
    'хуй',
    'бля',
    'выеб',
    'выёб',
    'греблядь',
    'дерьмохеропиздократ',
    'дерьмохеропиздократия',
    'доебался',
    'ебало',
    'ебанёшься',
    'ебанул',
    'ебанулся',
    'ебашит',
    'ёбкость',
    'ёбнул',
    'жидоёб',
    'жидоёбка',
    'жидоёбский',
    'заебал',
    'заебись',
    'заебцовый',
    'заёб',
    'изъебнулся',
    'испизделся',
    'козлоёб',
    'козлоёбина',
    'козлоёбище',
    'косоёбится',
    'многопиздная',
    'наблядовал',
    'наеб',
    'объеб',
    'остоебал',
    'пёздтрепездон',
    'уебался',
    'хитровыебанный',
    'хуёво',
    'объеб',
    'пезды',
    'sука',
    'сuка',
    'суkа',
    'сук@',
    'eбать',
    'еbать',
    'еб@ть',
    'ебаtь',
    'ебатb',
    'eб',
    'ёb',
    'pизд',
    'пiзд',
    'пиzд',
    'пизd',
    'hуй',
    'хuй',
    'bля',
    'бlя',
    'блya',
    'vыеб',
    'выeб',
    'выеb',
    'vыёб',
    'выёb',
    'gреблядь',
    'гrеблядь',
    'грeблядь',
    'греbлядь',
    'гребlядь',
    'греблyaдь',
    'гребляdь',
    'греблядb',
    'dоебался',
    'д0ебался',
    'доeбался',
    'доеbался',
    'доеб@лся',
    'доебаlся',
    'доебалsя',
    'доебалсya',
    'eбало',
    'еbало',
    'еб@ло',
    'ебаlо',
    'ебал0',
    'eбанёшься',
    'еbанёшься',
    'еб@нёшься',
    'ебаnёшься',
    'ебанeшься',
    'ебанёshься',
    'ебанёшbся',
    'ебанёшьsя',
    'ебанёшьсya',
    'eбанул',
    'еbанул',
    'еб@нул',
    'ебаnул',
    'ебанuл',
    'ебануl',
    'eбанулся',
    'еbанулся',
    'еб@нулся',
    'ебаnулся',
    'ебанuлся',
    'ебануlся',
    'ебанулsя',
    'ебанулсya',
    'eбашит',
    'еbашит',
    'еб@шит',
    'ебаshит',
    'ебашiт',
    'ебашиt',
    'eбкость',
    'ёbкость',
    'ёбkость',
    'ёбк0сть',
    'ёбкоsть',
    'ёбкосtь',
    'ёбкостb',
    'eбнул',
    'ёbнул',
    'ёбnул',
    'ёбнuл',
    'ёбнуl',
    'zhидоёб',
    'жiдоёб',
    'жиdоёб',
    'жид0ёб',
    'жидоeб',
    'жидоёb',
    'zhидоёбка',
    'жiдоёбка',
    'жиdоёбка',
    'жид0ёбка',
    'жидоeбка',
    'жидоёbка',
    'жидоёбkа',
    'жидоёбк@',
    'zhидоёбский',
    'жiдоёбский',
    'жиdоёбский',
    'жид0ёбский',
    'жидоeбский',
    'жидоёbский',
    'жидоёбsкий',
    'жидоёбсkий',
    'жидоёбскiй',
    'zаебал',
    'з@ебал',
    'заeбал',
    'заеbал',
    'заеб@л',
    'заебаl',
    'zаебись',
    'з@ебись',
    'заeбись',
    'заеbись',
    'заебiсь',
    'заебиsь',
    'заебисb',
    'zаебцовый',
    'з@ебцовый',
    'заeбцовый',
    'заеbцовый',
    'заебcовый',
    'заебц0вый',
    'заебцоvый',
    'zаёб',
    'з@ёб',
    'заeб',
    'заёb',
    'iзъебнулся',
    'иzъебнулся',
    'изъeбнулся',
    'изъеbнулся',
    'изъебnулся',
    'изъебнuлся',
    'изъебнуlся',
    'изъебнулsя',
    'изъебнулсya',
    'iспизделся',
    'иsпизделся',
    'исpизделся',
    'испiзделся',
    'испиzделся',
    'испизdелся',
    'испиздeлся',
    'испиздеlся',
    'испизделsя',
    'испизделсya',
    'kозлоёб',
    'к0злоёб',
    'коzлоёб',
    'козlоёбище',
    'козл0ёбище',
    'козлоeбище',
    'козлоёbище',
    'козлоёбiще',
    'козлоёбиschе',
    'козлоёбищe',
    'kосоёбится',
    'к0соёбится',
    'коsоёбится',
    'кос0ёбится',
    'косоeбится',
    'косоёbится',
    'косоёбiтся',
    'косоёбиtся',
    'косоёбитsя',
    'косоёбитсya',
    'mногопиздная',
    'мnогопиздная',
    'мн0гопиздная',
    'мноgопиздная',
    'мног0пиздная',
    'многоpиздная',
    'многопiздная',
    'многопиzдная',
    'многопизdная',
    'многопиздnая',
    'многопиздн@я',
    'многопизднаya',
    'nаблядовал',
    'н@блядовал',
    'наbлядовал',
    'набlядовал',
    'наблyaдовал',
    'набляdовал',
    'набляд0вал',
    'наблядоvал',
    'наблядов@л',
    'наблядоваl',
    'nаеб',
    'н@еб',
    'наeб',
    'наеb',
    '0бъеб',
    'оbъеб',
    'объeб',
    'объеb',
    '0стоебал',
    'оsтоебал',
    'осtоебал',
    'ост0ебал',
    'остоeбал',
    'остоеbал',
    'остоеб@л',
    'остоебаl',
    'pёздтрепездон',
    'пeздтрепездон',
    'пёzдтрепездон',
    'пёзdтрепездон',
    'пёздtрепездон',
    'пёздтrепездон',
    'пёздтрeпездон',
    'пёздтреpездон',
    'пёздтрепeздон',
    'пёздтрепеzдон',
    'пёздтрепезdон',
    'пёздтрепезд0н',
    'пёздтрепездоn',
    'uебался',
    'уeбался',
    'уеbался',
    'уеб@лся',
    'уебаlся',
    'уебалsя',
    'уебалсya',
    'hитровыебанный',
    'хiтровыебанный',
    'хиtровыебанный',
    'хитrовыебанный',
    'хитр0выебанный',
    'хитроvыебанный',
    'хитровыeбанный',
    'хитровыеbанный',
    'хитровыеб@нный',
    'хитровыебаnный',
    'хитровыебанnый',
    'hуёво',
    'хuёво',
    'хуeво',
    'хуёvо',
    'хуёв0',
    'хуев',
    'pезды',
    'пeзды',
    'пеzды',
    'пезdы',
  ];

  for (let i = 0; i < swearWords.length; i++) {
    if (name.indexOf(swearWords[i]) > -1) {
      return true;
    }
  }
  return false;
};
export const validateName = (name: string): { error: string | undefined } => {
  let error = undefined;

  

  return { error };
};

export const createId = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const millisecondsToDate = (mil: number) => {
  const firstPart = new Date(mil).toLocaleDateString();
  const senondPart = new Date(mil).toLocaleTimeString().toString();
  return firstPart + ' в ' + senondPart.slice(0, -3);
};

export const randomInteger = (min: number, max: number) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export function* getCounter(): Generator<number> {
  let c = 0;
  while (true) {
    yield c++;
  }
}
