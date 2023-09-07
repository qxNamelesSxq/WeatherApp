// Создаем компонент для отображения ошибки при получении данных
const Error = () => {
  // Получаем данные из стора с помощью useSelector из react-redux
  const error = useSelector((state) => state.error);
  const theme = useSelector((state) => state.theme);

  // Возвращаем JSX элемент с сообщением об ошибке
  return (
    <View style={styles[theme].errorContainer}>
      <Text style={styles[theme].errorText}>{error}</Text>
    </View>
  );
};

// Экспортируем компонент для использования в других местах
export default Error;
