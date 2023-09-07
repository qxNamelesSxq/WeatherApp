// Создаем компонент для переключения темы приложения
const ThemeSwitcher = () => {
  // Получаем данные из стора с помощью useSelector из react-redux
  const theme = useSelector((state) => state.theme);

  // Получаем функцию для диспатча экшенов с помощью useDispatch из react-redux
  const dispatch = useDispatch();

  // Создаем функцию для обработки изменения значения переключателя
  const handleValueChange = (value) => {
    dispatch(setTheme(value ? "dark" : "light")); // Диспатчим экшен для установки темы в стор в зависимости от значения переключателя
  };

  // Возвращаем JSX элемент с переключателем темы
  return (
    <View style={styles[theme].switcherContainer}>
      <Text style={styles[theme].switcherText}>Тема:</Text>
      <Switch
        value={theme === "dark"} // Устанавливаем значение переключателя в зависимости от темы в сторе
        onValueChange={handleValueChange} // Устанавливаем функцию для обработки изменения значения переключателя
      />
    </View>
  );
};

// Экспортируем компонент для использования в других местах
export default ThemeSwitcher;
