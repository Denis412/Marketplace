import { computed } from "vue";

export const useApplications = (object, is_team = false) => {
  console.log("object", object);

  const filteredApplications = computed(() => {
    return object.value?.applications.reduce(
      (acc, application) => {
        if (is_team)
          acc[application.sender == "subject" ? "incoming" : "outgoing"].push(
            application
          );
        else
          acc[application.sender == "team" ? "incoming" : "outgoing"].push(
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
    filteredApplications,
  };
};
