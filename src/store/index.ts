import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import persistStorage from 'redux-persist/lib/storage';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { settingsReducer } from './settings/reducer';
import { profileReducer } from './profile/reducer';
import { adminReducer } from './admin/reducer';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { appReducer } from './app/reducer';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: persistStorage,
  whitelist: ['settings'],
  // whitelist: [],
  debug: __DEV__,
};

export const rootReducer = combineReducers({
  app: appReducer,
  admin: adminReducer,
  profile: profileReducer,
  settings: settingsReducer,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

type ThunkDispatchType = ThunkDispatch<RootState, undefined, AnyAction>;

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware<ThunkDispatchType, RootState>(thunk)),
);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
//store.subscribe(gameSocket);
