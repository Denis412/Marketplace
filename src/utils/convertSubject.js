export const convertSubject = (subjectData) => {
  const birthday = subjectData.birthday?.date || "";
  const speciality1 = subjectData.speciality1?.name || "";
  const status = subjectData.status?.name || "";

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
    speciality1,
    status,
    subject_id,
  };
};
