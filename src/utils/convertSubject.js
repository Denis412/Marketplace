export const convertSubject = (subjectData) => {
  const birthday = subjectData.birthday?.date || "";
  // const speciality = subjectData.speciality?.name || "";

  const {
    fullname: { first_name: first_name, middle_name: middle_name, last_name: last_name },
    email: { email: email },
    id: subject_id,
    ...rest
  } = subjectData;

  return {
    ...rest,
    first_name,
    middle_name,
    last_name,
    email,
    birthday,
    subject_id,
  };
};
