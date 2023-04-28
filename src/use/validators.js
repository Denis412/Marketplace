export function useValidators() {
  return {
    required: (val) =>
      (val && val.length > 0) || "Поле обязательно для заполнения!",

    maxLength: (length) => (val) =>
      val.length <= length ||
      `Максимльно возможное количество символов ${length}!`,

    minLength: (length) => (val) =>
      val.length > length ||
      `Минимально возможное количество символов ${length}`,

    passwordValid: (val) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!?\-#$%_.]+$/.test(val) ||
      "Пароль должен содержать как минимум одну заглавную и одну строчную букву, а также как минимум одну цифру",

    equal: (val1) => (val) => val1 === val || "Значения не совпадают",
  };
}
