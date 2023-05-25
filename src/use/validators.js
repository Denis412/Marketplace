export function useValidators() {
  return {
    required: (val) => (val && val.length > 0) || "Поле обязательно для заполнения!",

    maxLength: (length) => (val) =>
      val.length <= length || `Максимально возможное количество символов ${length}!`,

    maxLengthForTeamForm: (length) => (val) =>
      val.length <= length ||
      `Количество символов в описании команды не должно превышать ${length} символов!`,

    minLength: (length) => (val) =>
      !val || val.length >= length || `Минимально возможное количество символов ${length}`,

    passwordValid: (val) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!?\-#$%_.]+$/.test(val) ||
      "Пароль должен содержать как минимум одну заглавную и одну строчную букву, а также как минимум одну цифру",

    onlyLatin: (val) => !/^[а-яА-Я]+$/.test(val) || "Ввод только латинскими символами!",

    equal: (val1) => (val) => val1 === val || "Значения не совпадают!",

    notEqual: (val1) => (val) => val1 !== val || "Новый пароль не может быть равен старому!",

    isUrl: (val) => val.includes("https://") || val.includes("http://") || "Введите ссылку.",

    isTelegramUrl: (val) => val.includes("https://t.me/") || "Неверный формат ссылки",

    requiredOneOf: (val1) => (val) =>
      (val1 && val1.length > 0) || (val && val.length > 0) || "Заполните хотя бы одно из полей",

    requiredOneOfNumber: (val1) => (val) =>
      val1 > 0 || val > 0 || "Заполните хотя бы одно из полей",

    positive: (val) => val >= 0 || "Введите неотрицательное значение",

    biggerThan: (val1) => (val) => val >= val1 || `Введите значение больше ${val1}`,

    lowerThan: (val1) => (val) => val <= val1 || val1 == "" || `Введите значение меньше ${val1}`,
  };
}
