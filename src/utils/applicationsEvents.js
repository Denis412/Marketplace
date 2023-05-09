import teamApi from "src/sdk/team";
import userApi from "src/sdk/user";
import applicationApi from "src/sdk/application";

const accept = async ({ application, is_team }) => {
  if (is_team) {
    await teamApi.acceptUser({
      team_id: application.team.id,
      space_id: application.team.space,
      data: {
        name: application.subject.fullname.first_name,
        surname: application.subject.fullname.last_name,
        email: application.subject.email.email,
        id: application.subject.id,
        application_id: application.id,
      },
    });

    await applicationApi.deleteById(application.id);
  } else
    await applicationApi.update(application.id, {
      status: process.env.APPLICATION_STATUS_APPROVED,
    });

  await teamApi.refetchPaginateTeams({
    page: 1,
    perPage: 1,
    where: {
      column: "name",
      operator: "EQ",
      value: application.team.name,
    },
  });
};

const cancel = async ({ application, is_team }) => {
  if (
    (is_team && application.sender === "team") ||
    (!is_team && application.sender === "subject")
  )
    await applicationApi.deleteById(application.id);
  else
    await applicationApi.update(application.id, {
      status: process.env.APPLICATION_STATUS_REJECTED,
    });

  await userApi.refetchPaginateSubjects({
    page: 1,
    perPage: 1,
    where: {
      column: "user_id",
      operator: "EQ",
      value: JSON.parse(localStorage.getItem("user-data")).user_id,
    },
    is_my_teams: true,
  });

  await teamApi.refetchPaginateTeams({
    page: 1,
    perPage: 1,
    where: {
      column: "name",
      operator: "EQ",
      value: application.team.name,
    },
  });
};

const applicationsEvents = { accept, cancel };

export default applicationsEvents;
