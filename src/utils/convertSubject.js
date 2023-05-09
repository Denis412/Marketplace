export const convertSubject = (subjectData) => {
  const {
    fullname: {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
    },
    email: { email: email },
    birthday: { date: birthday },
    speciality: { name: specilaity },
    id: subject_id,
    ...rest
  } = subjectData;

  return {
    first_name,
    middle_name,
    last_name,
    email,
    birthday,
    specilaity,
    subject_id,
    ...rest,
  };
};
