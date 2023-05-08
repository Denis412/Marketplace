import applicationApi from "src/sdk/application";
import { computed } from "vue";

export const useSubjectApplications = ({ subject_id }) => {
  const { result: applications } = applicationApi.paginateApplication({
    page: 1,
    perPage: 100,
    where: {
      column: `${process.env.APPLICATION_SUBJECT_PROPERTY}->${process.env.SUBJECT_TYPE_ID}`,
      operator: "EQ",
      value: subject_id,
    },
  });

  console.log(applications);

  const filteredApplications = computed(() => {
    return applications.value?.paginate_application.data.reduce(
      (acc, application) => {
        acc[application.sender == "subject" ? "outgoing" : "incoming"].push(
          application
        );

        return acc;
      },
      {
        incoming: [],
        outgoing: [],
      }
    );
  });

  return {
    applications,
    filteredApplications,
  };
};
