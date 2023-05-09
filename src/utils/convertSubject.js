export const convertSubject = (subjectData) => {
  const birthday = subjectData.birthday?.date || "";

  const {
    fullname: {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
    },
    email: { email: email },
    speciality: { name: specilaity },
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
    specilaity,
    subject_id,
  };
};