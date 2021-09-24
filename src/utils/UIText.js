export default {
  profile: 'Профиль',
  played_games: 'сыгранных игр',
  winning_games: 'выигранных игр',
  achievements_in_game: 'достижений в игре',

  game_mode: 'Режим игры',
  game_with_random: 'Против случайных игроков',
  game_with_friends: 'Играть со своими друзьями',
  game: {
    unknown: '????',
    null: '????',
    role_in_game: 'Персонажи в этой игре:',
    died_this_night: 'Этой ночью погиб(-ла):',
    no_died_this_night: 'Этой ночью никто не погиб',
    distribution_roles: 'В данный момент ведущий распределяет роли всем игрокам',
    civilian: 'Мирный житель',
    civilian_role:
      'Ваша задача — найти Мафию и посадить ее в тюрьму. Доказывайте другим игрокам, что вы не Мафия. ' +
      'Говорите, кого считаете Мафией и почему.',
    don_mafia: 'Дон мафии',
    don_mafia_role:
      'Не сообщайте игрокам, что вы — Мафия! Каждую ночь вы будете проверять по одному игроку, чтобы найти Шерифа' +
      'После ночи запутайте игроков и притворитесь Шерифом. Рассказывайте о проверках, которые вы якобы провели.',
    mafia: 'Мафия',
    mafia_role: 'Не сообщайте игрокам, что вы Мафия! Запутайте остальных и посадите в тюрьму мирных жителей.',
    sheriff: 'Шериф',
    sheriff_role:
      'Ваша задача — найти Мафию и посадить ее в тюрьму. Каждую ночь вы будете проверять по одному игроку, ' +
      'не Мафия ли он. После ночи доказывайте, что именно вы Шериф, рассказывайте, какие проверки вы делали ' +
      'и кого нужно посадить в тюрьму.',
  },

  camera_need_message: 'Для запуска игры потребуется камера и микрофон',
  photo: 'фото',
  back: 'Назад',
  rating: 'Рейтинг',
  voting_results: 'Итоги голосования:',
  specify_name: 'Указать имя',
  loading: 'Загрузка',
  logout: 'Выйти',
  per: 'за',
  against: 'против',
  settings: 'Настройки',
  your_role: 'Ваша роль:',
  quit_game: 'Хотите покинуть игру и вернуться в главное меню?',
  room_full: 'Эта комната уже полная',
  yandex_login_big_text: `Авторизуйтесь на Яндексе, чтобы сохранить достижения в игре. 
Вы не потеряете игровой прогресс даже на другом устройстве, если войдете в тот же аккаунт`,
  yandex_login_endgame_banner: 'Авторизуйтесь через Яндекс, чтобы сохранить свой прогресс в игре',
  mafia_instruction: `Вы проголосовали за разных участников, но убить можно только одного. 
  Пожалуйста, выберите одну цель, иначе никто не будет убит.`,
  mafia_did_not_shoot: 'Мафия не стреляла этой ночью, у вас осталось мало времени для выбора цели!',
  volume: 'Громкость',
  to_jail: 'В тюрьму!',
  camera_microphone: 'Камера и микрофон',
  notifications: 'Push-уведомления',
  in_game: 'В игру',
  playerRole: 'Роль игрока',
  clickToCopy: 'Нажмите на ссылку-приглашение, чтобы скопировать',
  requestCameraAndMicrophone: 'Сейчас игра запросит у вас доступ к камере и микрофону — и можно начинать',
  linkCopied: 'Ссылка скопирована',
  enterGame: 'Войти',
  register: {
    
    enterGame: 'войти',
    yandexLogin: 'Войдите в аккаунт Яндекс\nдля сохранения достижений в игре',
    
    enterYandex: "Пожалуйстa, авторизируйтесь через Яндекс"
  },

  role: {
    don_mafia: 'Дон мафии',
    mafia: 'Мафия',
    sheriff: 'Шериф',
    civilian: 'Мирный житель',
  },

  rulesText:
    'Приходит ночь, и город засыпает… Мирные жители спешат скорее оказаться дома, запирают двери и надеются, что их\n' +
    'не настигнут те, кто всегда прячется во тьме. Хладнокровные убийцы, ловко скрывающиеся от правосудия на\n' +
    'запутанных улицах мегаполиса. Удастся ли вам остановить безжалостных злодеев и спасти город? Или вы – один из\n' +
    'них? Узнайте в легендарной психологической игре MAFIA. Игроки засыпают и переносятся в далекий город,\n' +
    'захваченный влиятельной и очень опасной группировкой, ночь за ночью совершающей нападения на мирных граждан.',

  endGame: {
    mafiaWin: 'Победила Мафия!',
    citizenWin: 'Победу одержали жители!',
    gameResults: 'Результаты игры',
  },

  buttons: {
    playAgain: 'Сыграть ещё раз',
    playOtherGames: 'Сыграть в другие игры',
    giveAccessToCamera: 'Повторный запрос камеры',
    start_game: 'Начать игру',
    play: 'играть',
    further: 'Далее',
    skip: 'Пропустить',
  },
  titles: {
    mafia_introduction: 'Мафия знакомится',
    vote_mafia: (isOnlyDon) => `${isOnlyDon ? 'Дон мафии проснулся' : 'Мафия проснулась'} и выбирает свою жертву`,
    vote_mafia_shootout: 'Последний шанс на убийство',
    vote_don_mafia: 'Дон мафии ищет Шерифа',
    vote_sheriff: 'Просыпается Шериф и ищет Мафию',
    last_words: (meCurrentPlayer, name) =>
      meCurrentPlayer ? 'Это ваши последние слова!\nПопрощайтесь' : `Последние слова ${name}`,
    players_introduction: (meCurrentPlayer, name) =>
      meCurrentPlayer ? 'Представьтесь другим игрокам' : `Вам представляется ${name}`,
    afternoonDiscussion: (meCurrentPlayer, name) =>
      meCurrentPlayer ? 'Расскажите, кого вы считаете Мафией' : `Сейчас говорит ${name}`,
    vote_jail_for_voted: 'Повторное голосование',
    who_is_mafia: 'Кто Мафия?',
    everybody_in_jail: ` Кто за то, чтобы все \nкандидаты сели в тюрьму?`,
    vote_results_sent_prison: 'По итогам голосования, в тюрьму отправляются:',
    all_voters_left_game: {
      part_1: 'Кто за то, чтобы все,',
      part_2: 'за кого проглосовали, покинули игру?',
    },
    vote_jail_for_voted_results: {
      group_arrest: ' Одинаковое количество голосов! \nВозможен групповой арест!',
      repeat_vote: ' Одинаковое количество голосов! \nБудет повторное голосование',
      goes_jail: 'По итогам голосования \nв тюрьму отправляется:',
      no_went_jail: 'Никто не проголосовал — \nникто не сел в тюрьму!',
    },
    other_games: 'Другие игры',
    rules: 'Правила',
  },

  checkResults: {
    check_mafia: (name, bool) => (name ? name : 'Это') + (bool ? ' Мафия!' : ' не Мафия'),
    check_sheriff: (name, bool) => (name ? name : 'Это') + (bool ? ' Шериф!' : ' не Шериф'),
  },

  doing: {
    kill: 'Убить',
    check: 'Проверить',
  },

  gum_errors: {
    no_device: 'Не найдена камера или микрофон',
    not_allowed_error:
      'Доступ к камере или микрофону заблокирован браузером, ' +
      'разрешите использование устройств в настройках браузера',
    overconstrained_error: 'Ваша камера не удовлетворяет минимальным требованиям',
    other_error: 'Не удалось получить доступ к камере',
  },
  timer: {
    lobby: 'Игра скоро начнется',
    players_introduction: (nextPlayer, curPlayer) =>
      nextPlayer !== null ? nextPlayer + ' будет говорить через:' : `У ${curPlayer} осталось:`,
    explanation_game_rules: 'Раздача ролей через:',
    mafia_choose_one_victim: 'Для убийства, Мафия должна выбрать одну цель',
    assignment_roles: 'Раздача ролей',
    mafia_introduction: 'Мафия знакомится:',
    timeUntilDay: 'День наступит через:',
    discussion_about_suspicious: (nextPlayer) =>
      nextPlayer !== null ? nextPlayer + ' будет говорить через:' : 'Голосование начнется через:',
    vote_jail: 'Голосование закончится через:',
    vote_mafia: (isOnlyDon) => `${isOnlyDon ? 'Дон мафии' : 'Мафия'} ищет свою жертву:`,
    vote_mafia_shootout: 'Ход Дона мафии через:',
    vote_don_mafia: 'Дон мафии ищет Шерифа',
    vote_don_mafia_results: 'Ход Шерифа через:',
    vote_sheriff: 'Шериф ищет Мафию',
    default: 'Следующая стадия через:',
  },
  badge: {
    games_played: 'Сыгранных \nИгр',
    wins_played: 'Выигранных \nИгр',
    achievements_played: 'Достижений \nв игре',
  },
  admin: {
    statistic: {
      header: 'Статистика',
      actualValue: 'За любое время',
      allValues: ['За любое время', 'За последние 28 дней', 'За последние 7 дней', 'За сегодняшний день'],
      createdTables: 'Создано \n игровых столов',
      random: 'Рандом',
      lobby: 'Лобби',
      numPlayers: 'Кол-во игроков в целом',
      playedGames: 'Сыграно игр',
      middleGames: 'Среднее кол-во сыгранных игр на 1 игрока',
      middleGamesTable: 'Среднее кол-во игроков на 1 стол',
      middleTime: 'Среднее время играния игрока',
      retentionRate: 'Retention Rate',
    },
    playerTables: {
      players: 'Игроки',
      all: 'Все',
      active: 'Активные',
      banned: 'Забанены',
      title: 'По дате',
      actualValue: 'За любое время',
      allValues: ['За любое время', 'За последние 28 дней', 'За последние 7 дней', 'За сегодняшний день'],
      type: 'selector',
      sortTitle: 'Сортировка',
      sortActualValue: 'По дате',
      sortAllValues: ['По количеству жалоб', 'По прогрессу', 'По дате'],
      getBan: 'Забанен',
      nowPlaying: 'Сейчас играет',
      played: 'Играл',
      doBan: 'Забанить',
      doDelete: 'Удалить',
    },
    playerCard: {
      buttonBan: 'Забанить',
      buttonDelete: 'Удалить',
      playedGames: 'Сыгранных\nигр',
      winnedGames: 'Выигранных\nигр',
      achievs: 'Достижений\nв игре',
      nowPlaying: 'Сейчас играет',
      createdTables: 'Создано столов',
      playedTime: 'Время играния',
      hours: 'часов',
      banHistory: 'История банов',
      watch: 'Смотреть',
    },
    notifications: {
      notifications: 'Уведомления',
      today: 'Сегодня',
      yesterday: 'Вчера',
    },
    gameTables: {
      buttonTitle: 'Режим игры',
      buttonAllValues: ['Рандом', 'Лобби'],
      dateTitle: 'По дате',
      dateActualValue: 'За любое время',
      dateAllVAlues: ['За любое время', 'За последние 28 дней', 'За последние 7 дней', 'За сегодняшний день'],
      filterTitle: 'Сортировка',
      filterActualValue: 'По дате',
      filterAllValues: ['По количеству жалоб', 'По прогрессу', 'По дате'],
      gameTables: 'Игровые столы',
      all: 'Все',
      active: 'Активные',
      arhive: 'Архивные',
      detail: 'Детальный',
      playerBan: 'Забанить',
      playerUnban: 'Разбанить',
      tableCreate: 'СОЗДАТЕЛЬ СТОЛА',
      checkTranslation: 'Просмотр трансляции',
      gameTablePageDelete: 'Удалить',
      progress: 'Прогресс',
      popoverDelete: 'Удалить',
    },
    sideFilter: {
      filter: 'Фильтр',
      gameType: 'Режим игры',
      accept: 'Применить',
      clean: 'Очистить',
    },
  },
  achievements: {
    last_mafia: 'Последняя Мафия',
    legendary_sheriff: 'Легендарный шериф',
    last_hero: 'Последний герой',
    deciding_vote: 'Решающий голос',
    under_hot_hand: 'Под горячую руку',
    played_games_5: '5 сыгранных игр',
    played_games_10: '10 сыгранных игр',
    played_games_25: '25 сыгранных игр',
    played_games_50: '50 сыгранных игр',
    played_games_75: '75 сыгранных игр',
    played_games_100: '100 сыгранных игр',
    played_games_250: '250 сыгранных игр',
    played_games_500: '500 сыгранных игр',
    played_games_750: '750 сыгранных игр',
    played_games_1000: '1000 сыгранных игр',
    won_games_3: '3 выигранных игры',
    won_games_5: '5 выигранных игры',
    won_games_10: '10 выигранных игры',
    won_games_25: '25 выигранных игры',
    won_games_50: '50 выигранных игры',
    won_games_75: '75 выигранных игры',
    won_games_100: '100 выигранных игры',
    won_games_250: '250 выигранных игры',
    won_games_500: '500 выигранных игры',
    won_games_1000: '1000 выигранных игры',
    frequently_guest: 'Частый гость',
    always_die_first: 'Всегда умирает первым',
    eternal_mafia: 'Вечный Мафиози',
    lost_games_20: 'Проиграл битву, но не проиграл войну',
    mafia_master: 'Мастер Мафии',
  },
};
