import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Switch,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setWeatherData,
  toggleTheme,
} from "../redux/slices/weatherSlice";
import * as Location from "expo-location";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const [cityOne, setCityOne] = useState("");
  const city = useSelector((state) => state.weather.setCity);
  const theme = useSelector((state) => state.weather.theme);
  const weatherData = useSelector((state) => state.weather.weatherData);
  const [location, setLocation] = useState("");
  const [selectedInterval, setSelectedInterval] = useState("сегодня");
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeatherDataByCoordinates = (cityName) => {
    if (cityName) {
      let days = 1; // По умолчанию запрашиваем погоду на 1 день
      setCityOne(cityName);
      // Выполните запрос к API с координатами и городом для определения города и выбранным интервалом
      axios
        .get(
          `https://api.weatherapi.com/v1/forecast.json?key=6bbd51f35ab54d55860202414230509&q=${cityName}&days=${days}`
        )
        .then((response) => {
          const weatherData = response.data;
          dispatch(setWeatherData(weatherData));

          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Ошибка при получении данных о погоде:", error);
          setIsLoading(false);
        });
    } else {
      console.warn(
        "Город не определен. Пожалуйста, дождитесь получения координат и определения города."
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const locationData = await Location.getCurrentPositionAsync({});

          const { latitude, longitude } = locationData.coords;

          let regionName = await Location.reverseGeocodeAsync({
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
          });

          const cityName = regionName[0]?.city;
          dispatch(setCity(cityName));

          fetchWeatherDataByCoordinates(cityName);
        }
      } catch (error) {
        console.error("Ошибка при получении координат:", error);
      }
    })();
  }, []);
  if (isLoading) {
    // Отображаем загрузочный экран
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color={theme === "dark" ? "white" : "black"}
        />
      </View>
    );
  }

  const handleDaysButtonClick = (days) => {
    setSelectedInterval(days);

    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=6bbd51f35ab54d55860202414230509&q=${cityOne}&days=${days}`
      )
      .then((response) => {
        const weatherData = response.data;
        dispatch(setWeatherData(weatherData));
      })
      .catch((error) => {
        console.error("Ошибка при получении данных о погоде:", error);
      });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme === "dark" ? "black" : "white" }}
    >
      <View
        style={{
          ...styles.container,
          backgroundColor: theme === "dark" ? "black" : "white",
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: theme === "dark" ? "white" : "black",
          }}
        >
          Погода в {cityOne}
        </Text>
        <Text
          style={{
            ...styles.text,
            color: theme === "dark" ? "white" : "black",
          }}
        >
          Выбран интервал: {selectedInterval}
        </Text>

        {weatherData && (
          <View>
            {weatherData.forecast.forecastday.map((forecastDay) => (
              <View key={forecastDay?.date}>
                <Text
                  style={{
                    ...styles.text,
                    color: theme === "dark" ? "white" : "black",
                  }}
                >
                  Погода {forecastDay?.date}
                </Text>
                <Text
                  style={{
                    ...styles.text,
                    color: theme === "dark" ? "white" : "black",
                  }}
                >
                  Текущая температура: {forecastDay.day?.avgtemp_c}°C
                </Text>
                <Text
                  style={{
                    ...styles.text,
                    color: theme === "dark" ? "white" : "black",
                  }}
                >
                  Описание: {forecastDay.day.condition.text}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Переключатели и кнопки */}
        <Button title="Сегодня" onPress={() => handleDaysButtonClick(1)} />
        <Button title="3 дня" onPress={() => handleDaysButtonClick(3)} />
        <Button title="7 дней" onPress={() => handleDaysButtonClick(7)} />
        <Button title="14 дней" onPress={() => handleDaysButtonClick(14)} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: theme === "dark" ? "white" : "black",
            }}
          >
            Темная тема
          </Text>
          <Switch
            value={theme === "dark"}
            onValueChange={() => dispatch(toggleTheme())}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 15,
    fontSize: 24,
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
