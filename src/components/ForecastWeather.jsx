// Создаем компонент для отображения прогноза погоды на несколько дней
const ForecastWeather = () => {
  // Получаем данные из стора с помощью useSelector из react-redux
  const forecast = useSelector((state) => state.forecast);
  const days = useSelector((state) => state.days);
  const theme = useSelector((state) => state.theme);

  // Возвращаем JSX элемент с информацией о прогнозе погоды
  return (
    <View style={styles[theme].forecastContainer}>
      <Text style={styles[theme].forecastText}>
        Прогноз на {days} {days === 1 ? "день" : days < 5 ? "дня" : "дней"}
      </Text>
      <FlatList
        data={forecast.slice(0, days)} // Отбираем нужное количество дней из прогноза
        keyExtractor={(item) => item.date} // Устанавливаем ключ для каждого элемента списка
        renderItem={(
          { item } // Рендерим каждый элемент списка
        ) => (
          <View style={styles[theme].dayContainer}>
            <Text style={styles[theme].dayText}>{item.date}</Text>
            <Text style={styles[theme].dayTempText}>
              {item.day.maxtemp_c}°C / {item.day.mintemp_c}°C
            </Text>
            <Text style={styles[theme].dayCondText}>
              {item.day.condition.text}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

// Экспортируем компонент для использования в других местах
export default ForecastWeather;
