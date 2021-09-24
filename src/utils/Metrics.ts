import { GameService } from './GameService';

enum MetricsEvents {
  rules = 'rules',
  name = 'name',
  age = 'age',
  randomgame = 'randomgame',
  friendsgame = 'friendsgame',
  oauth_onboarding = 'oauth_onboarding',
  came_back_oauth = 'came_back_oauth',
  oauth_endgame = 'oauth_endgame',
  came_back_oauth_endgame = 'came_back_oauth_endgame',
  micro_camera = 'micro_camera',
  into_game = 'into_game',
  copy_url_random = 'copy_url_random',
  start_game_random = 'start_game_random',
  introduction_random = 'introduction_random',
  one_more_random = 'one_more_random',
  random_game_start = 'random_game_start',
  first_round = 'first_round',
  second_round = 'second_round',
  third_round = 'third_round',
  end_random_game = 'end_random_game',
  friends_game_start = 'friends_game_start',
  micro_camera_friends = 'micro_camera_friends',
  into_game_friends = 'into_game_friends',
  copy_url_friends = 'copy_url_friends',
  start_game_friends = 'start_game_friends',
  introduction_friends = 'introduction_friends',
  one_more_friends = 'one_more_friends',
  first_round_friends = 'first_round_friends',
  second_round_friends = 'second_round_friends',
  third_round_friends = 'third_round_friends',
  end_friends_game = 'end_friends_game',
}

export class Metrics {
  static events = MetricsEvents;

  static hitEvent(event: MetricsEvents) {
    if (__DEV__) return;
    ym(67725880, 'reachGoal', event);
  }

  static hitEventWithPoolType(friendEvent: MetricsEvents, randomEvent: MetricsEvents) {
    const poolType = GameService.getMode();
    if (poolType === 'with_friends') Metrics.hitEvent(friendEvent);
    if (poolType === 'random_pool') Metrics.hitEvent(randomEvent);
  }
}

/*

Онбординг:
+ 1)  Нажал кнопку «Далее» на странице правил: 'rules'
+ 2)  Ввел Имя: 'name'
+ 3)  Нажал кнопку «Мне больше 16 лет»: 'age'
+ 4)  Нажал кнопку «Рандомная игра»: 'randomgame'
+ 5)  Нажал кнопку «Играть с друзьями»: 'friendsgame'

Авторизация черз Яндекс
+ 1)  Нажал кнопку авторизации в онбординге: 'oauth_onboarding'
+ 2)  Вернулся после авторизации: 'came_back_oauth'
+ 3)  Нажал кнопку авторизации в конце игры (экран победы/поражения): 'oauth_endgame'
+ 4)  Вернулся после авторизации: 'came_back_oauth_endgame'

Игра
+ 1)  Попал на экран рандомной игры: 'random_game_start \ friends_game_start'
+ 2)  Дал доступ к камере и микрофону: 'micro_camera \ micro_camera_friends'
+ 3)  Нажал кнопку «В Игру»: 'into_game \ into_game_friends'
+ 4) Скопировал ссылку для отправки друзьям в рандомной игре: 'copy_url_random \ copy_url_friends'
+ 5) Нажал кнопку «Начать игру» (рандомная игра): 'start_game_random \ start_game_friends'
+ 6) Представился участникам (рандомная игра): 'introduction_random \ introduction_friends'
+ 7) Нажал «сыграть еще раз» (рандомная игра): 'one_more_random \ one_more_friends'
+ 8) Начал игру: 'random_game_start \ friends_game_start'
+ 9) Отыграл 1 кон (день + ночь): 'first_round \ first_round_friends'
+ 10) Отыграл 2 кона (день + ночь): 'second_round \ second_round_friends'
+ 11) Отыграл 3 кона (день + ночь): 'third_round \ third_round_friends'
+ 12) Дошел до конца игры (экран победы и поражения): 'end_random_game \ end_friends_game'

*/
