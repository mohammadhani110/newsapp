// ** Toolkit imports
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, purgeStoredState } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ** Reducers
import authReducer from "./auth";
import newsReducer from "./news";

export const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  news: newsReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export const clearPersist = () => purgeStoredState(persistConfig);
