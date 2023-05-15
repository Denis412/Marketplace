export const convertSubject = (subject) => {
  return {
    first_name: subject.fullname.first_name || "",
    middle_name: subject.fullname.middle_name || "",
    last_name: subject.fullname.last_name || "",
    gender: subject.gender || "",
    city: subject.city || "",
    birthday: subject.birthday?.date || "",
    subject_id: subject.id,
  };
};

export const convertUserData = (userData) => {
  return {
    email: userData.email,
    avatar: userData.avatar,
    telegram_chat_id: userData.telegram_chat_id,
  };
};
