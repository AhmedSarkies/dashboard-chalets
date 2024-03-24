import { configureStore } from "@reduxjs/toolkit";

import {
  subAdminSlice,
  messagesSlice,
  sliderSlice,
  settingsSlice,
  termsConditionsSlice,
  chaletSlice,
  brokerSlice,
  bookChaletSlice,
} from "./slices";

const store = configureStore({
  reducer: {
    subAdmin: subAdminSlice,
    messages: messagesSlice,
    slider: sliderSlice,
    settings: settingsSlice,
    termsAndConditions: termsConditionsSlice,
    chalet: chaletSlice,
    broker: brokerSlice,
    bookChalet: bookChaletSlice,
  },
});

export default store;
