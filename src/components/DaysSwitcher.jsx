// Создаем компонент для переключения количества дней для прогноза
const DaysSwitcher = () => {
  // Получаем данные из стора с помощью useSelector из react-redux
  const days = useSelector((state) => state.days);
  const theme = useSelector((state) => state.theme);

  // Получаем функцию для диспатча экшенов с помощью useDispatch из react-redux
  const dispatch = useDispatch();

  // Создаем функцию для обработки изменения значения переключателя
  const handleValueChange = (value) => {
    dispatch(setDays(value)); // Диспатчим экшен для установки количества дней в стор
  };

  // Возвращаем JSX элемент с переключателем количества дней
  return (
    <View style={styles[theme].switcherContainer}>
      <Text style={styles[theme].switcherText}>Количество дней:</Text>
      <Switch
        value={days} // Устанавливаем значение переключателя из стора
        onValueChange={handleValueChange} // Устанавливаем функцию для обработки изменения значения переключателя
        minimumValue={1} // Устанавливаем минимальное значение переключателя
        maximumValue={14} // Устанавливаем максимальное значение переключателя
        step={1} // Устанавливаем шаг изменения значения переключателя
      />
    </View>
  );
};

// Экспортируем компонент для использования в других местах
export default DaysSwitcher;
