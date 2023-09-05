import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";
import "./index.css";
import { AccountProvider } from "./components/ContractContext";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./app/reducers/index.js";
import AlertNotification from "./shared/components/AlertNotification";
import HomePage from "./components/home/HomePage";

const root = ReactDOM.createRoot(document.getElementById("root"));

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore(
  {
    reducer: persistedReducer,
  },
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store)

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }
]);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AccountProvider>
        <RouterProvider router={router}></RouterProvider>
        <AlertNotification />
      </AccountProvider>
    </PersistGate>
  </Provider>
);