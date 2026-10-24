import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  selectedCity: string;
}

const initialState: WeatherState = {
  selectedCity: "Yerevan",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSelectedCity(state, action: PayloadAction<string>) {
      state.selectedCity = action.payload;
    },
  },
});

export const { setSelectedCity } = weatherSlice.actions;
export default weatherSlice.reducer;
