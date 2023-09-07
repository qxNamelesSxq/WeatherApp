import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "", // Здесь хранится выбранный город
  weatherData: null, // Здесь будет храниться погода
  theme: "light", // Текущая тема (light или dark)
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCityDate: (state, action) => {
      state.city = action.payload;
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setCity, setWeatherData, toggleTheme } = weatherSlice.actions;
export default weatherSlice.reducer;
