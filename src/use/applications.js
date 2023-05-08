import applicationApi from "src/sdk/application";
import { computed } from "vue";

export const useApplications = ({ team, is_owner }) => {
  if (!is_owner) return {};

  const { result: applications } = applicationApi.paginateApplication({
    page: 1,
    perPage: 100,
    where: {
      column: `${process.env.APPLICATION_TEAM_PROPERTY}->${process.env.TEAM_TYPE_ID}`,
      operator: "EQ",
      value: team.id,
    },
  });

  const filteredApplications = computed(() => {
    return applications.value?.paginate_application.data.reduce(
      (acc, application) => {
        acc[application.sender == "subject" ? "incoming" : "outgoing"].push(
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
