// Создаем компонент для отображения текущей погоды
const CurrentWeather = () => {
  // Получаем данные из стора с помощью useSelector из react-redux
  const city = useSelector((state) => state.city);
  const current = useSelector((state) => state.current);
  const theme = useSelector((state) => state.theme);

  // Возвращаем JSX элемент с информацией о текущей погоде
  return (
    <View style={styles[theme].currentContainer}>
      <Text style={styles[theme].cityText}>{city}</Text>
      <Text style={styles[theme].tempText}>{current.temp_c}°C</Text>
      <Text style={styles[theme].condText}>{current.condition.text}</Text>
      <Text style={styles[theme].windText}>Ветер: {current.wind_kph} км/ч</Text>
      <Text style={styles[theme].humidText}>
        Влажность: {current.humidity}%
      </Text>
      <Text style={styles[theme].dateText}>{current.last_updated}</Text>
    </View>
  );
};

// Экспортируем компонент для использования в других местах
export default CurrentWeather;
