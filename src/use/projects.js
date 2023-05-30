import { ref } from "vue";

import projectApi from "src/sdk/project";
import pageApi from "src/sdk/page";
import teamApi from "src/sdk/team";
import userApi from "src/sdk/user";
import applicationApi from "src/sdk/application";
import typeApi from "src/sdk/type";
import propertyApi from "src/sdk/property";
import permissionApi from "src/sdk/permission";

export const useProjectsQuery = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  function getWithWere({ page, perPage, where, space_id }) {
    try {
      loading.value = true;

      const parameters = {
        page: page || 1,
        perPage: perPage || 50,
        where,
        space_id,
      };

      console.log(parameters);

      const {
        result: projects,
        loading: projectsLoading,
        error: projectsError,
      } = projectApi.paginateProject(parameters);

      async function refetch({ only_one }) {
        try {
          loading.value = true;

          const projects = await projectApi.refetchPaginateProjects(parameters);

          result.value = only_one ? projects[0] : projects;

          loading.value = false;
        } catch (e) {
          error.value = e;
          loading.value = false;

          console.log(e);
        }
      }

      loading.value = false;

      return {
        projects,
        projectsLoading,
        projectsError,
        refetch,
      };
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  async function getById({ id, team }) {
    try {
      loading.value = true;

      result.value = await projectApi.refetchProjectById({
        id,
        space_id: team.value.space,
      });

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return { result, loading, error, getWithWere, getById };
};

export const useProjectCreate = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function createProject({ name, team, user, space_id }) {
    try {
      loading.value = true;

      const projectInMainSpace = await projectApi.create({
        input: {
          name,
          team: {
            [process.env.TEAM_TYPE_ID]: team.id,
          },
        },
      });

      const subject = await userApi.refetchPaginateSubjects({
        page: 1,
        perPage: 1,
        where: {
          column: "user_id",
          operator: "EQ",
          value: user.user_id,
        },
        is_team: true,
        space_id,
      });

      const subjectInMainSpace = await userApi.refetchPaginateSubjects({
        page: 1,
        perPage: 1,
        where: {
          column: "user_id",
          operator: "EQ",
          value: user.user_id,
        },
      });

      await userApi.update(subjectInMainSpace[0].id, {
        projects: {
          [process.env.PROJECT_TYPE_ID]: [
            ...subjectInMainSpace[0].projects.map((project) => project.id),
            projectInMainSpace.id,
          ],
        },
      });

      console.log("subject", subject);

      const projectData = await projectApi.create({
        input: {
          name,
          team_name: team.name,
          space: space_id,
          leader: {
            [subject[0].type_id]: subject[0].id,
          },
          members: {
            [subject[0].type_id]: [subject[0].id],
          },
        },
        space_id,
      });

      const rootProjectPageData = await pageApi.create({
        input: {
          title: projectData.name,
        },
        space_id,
      });

      await pageApi.create({
        input: {
          title: "О проекте",
          parent_id: rootProjectPageData.id,
        },
        space_id,
      });

      await pageApi.create({
        input: {
          title: "Список задач",
          parent_id: rootProjectPageData.id,
        },
        space_id,
      });

      await pageApi.create({
        input: {
          title: "Документы",
          parent_id: rootProjectPageData.id,
        },
        space_id,
      });

      await useProjectsQuery()
        .getWithWere({
          space_id,
        })
        .refetch({});

      await teamApi.refetchPaginateTeams({
        page: 1,
        perPage: 1,
        where: {
          column: "id",
          operator: "EQ",
          value: team.id,
        },
      });

      result.value = projectData;

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return { result, loading, error, createProject };
};

export const useProjectUpdate = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function updateProject({ id, input, space_id }) {
    try {
      loading.value = true;

      console.log("space", { id, input, space_id });

      result.value = await projectApi.update({ id, input, space_id });

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return { result, loading, error, updateProject };
};

export const useProjectApplication = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function sendApplication({ project_id, project_name, subject, is_customer, space_id }) {
    try {
      loading.value = true;

      console.log({ project_id, project_name, subject, is_customer, space_id });

      const subjectType = await typeApi.refetchPaginateType({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: "subject",
        },
        space_id,
      });

      const stubjectInTeamSpace = await userApi.refetchPaginateSubjects({
        page: 1,
        perPage: 1,
        where: {
          column: "email",
          operator: "FTS",
          value: subject.email.email,
        },
        is_team: true,
        space_id,
      });

      const applicationType = await typeApi.refetchPaginateType({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: "application",
        },
        space_id,
      });

      const projectType = await typeApi.refetchPaginateType({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: "project",
        },
        space_id,
      });

      console.log("types", subjectType[0].id, applicationType[0].id, projectType[0].id);

      const subjectProperty = await propertyApi.refetchPaginateProperties({
        page: 1,
        perPage: 1,
        where: {
          and: [
            {
              column: "name",
              operator: "EQ",
              value: "subject",
            },
            {
              column: "type_id",
              operator: "EQ",
              value: applicationType[0].id,
            },
          ],
        },
        space_id,
      });

      const statusProperty = await propertyApi.refetchPaginateProperties({
        page: 1,
        perPage: 1,
        where: {
          and: [
            {
              column: "name",
              operator: "EQ",
              value: "status",
            },
            {
              column: "type_id",
              operator: "EQ",
              value: applicationType[0].id,
            },
          ],
        },
        space_id,
      });

      const statusPropertyWithMeta = await propertyApi.refetchPropertyById({
        id: statusProperty[0].id,
        space_id,
      });

      const applications = await applicationApi.refetchPaginateApplications({
        page: 1,
        perPage: 100,
        where: {
          column: `${subjectProperty[0].id}->${subjectType[0].id}`,
          operator: "EQ",
          value: stubjectInTeamSpace[0].id,
        },
      });

      if (applications.find((application) => application.project.id === project_id))
        throw new Error("Уже есть заявка!");

      result.value = await applicationApi.create({
        name: project_name,
        subject: {
          [subjectType[0].id]: stubjectInTeamSpace[0].id,
        },
        project: {
          [projectType[0].id]: project_id,
        },
        status: statusPropertyWithMeta.meta.options[0].id,
        is_customer: is_customer === "false" || !is_customer ? false : true,
        space_id,
      });

      await permissionApi.create({
        input: {
          model_type: "object",
          model_id: result.value.id,
          owner_type: "subject",
          owner_id: stubjectInTeamSpace[0].id,
          level: 5,
        },
        space_id,
      });

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  async function acceptApplication({ application, is_project, space_id }) {
    try {
      loading.value = true;

      console.log("accept", { application, is_project, space_id });

      if (is_project) {
        const subjectType = await typeApi.refetchPaginateType({
          page: 1,
          perPage: 1,
          where: {
            column: "name",
            operator: "EQ",
            value: "subject",
          },
          space_id,
        });

        const project = await projectApi.refetchPaginateProjects({
          page: 1,
          perPage: 1,
          where: {
            column: "id",
            operator: "EQ",
            value: application.project.id,
          },
          space_id,
        });

        await permissionApi.create({
          input: {
            model_type: "object",
            model_id: application.project.id,
            owner_type: "subject",
            owner_id: application.subject.id,
            level: 4,
          },
          space_id,
        });

        const prop = application.is_customer
          ? {
              customers: {
                [subjectType[0].id]: [
                  ...project[0].customers.map((customer) => customer.id),
                  application.subject.id,
                ],
              },
            }
          : {
              members: {
                [subjectType[0].id]: [
                  ...project[0].members.map((member) => member.id),
                  application.subject.id,
                ],
              },
            };

        await useProjectUpdate().updateProject({
          id: application.project.id,
          input: {
            name: application.name,
            ...prop,
          },
          space_id: application.project.space,
        });

        await applicationApi.deleteById(application.id, application.project.space);
      } else {
        const applicationType = await typeApi.refetchPaginateType({
          page: 1,
          perPage: 1,
          where: {
            column: "name",
            operator: "EQ",
            value: "application",
          },
          space_id,
        });

        const statusProperty = await propertyApi.refetchPaginateProperties({
          page: 1,
          perPage: 1,
          where: {
            and: [
              {
                column: "name",
                operator: "EQ",
                value: "status",
              },
              {
                column: "type_id",
                operator: "EQ",
                value: applicationType[0].id,
              },
            ],
          },
          space_id,
        });

        const statusPropertyWithMeta = await propertyApi.refetchPropertyById({
          id: statusProperty[0].id,
          space_id,
        });

        await applicationApi.update(
          application.id,
          {
            name: application.name,
            status: statusPropertyWithMeta.meta.options[2].id,
          },
          space_id
        );

        await projectApi.refetchPaginateProjects({
          page: 1,
          perPage: 1,
          where: {
            column: "name",
            operator: "EQ",
            value: application.project.name,
          },
          space_id: application.project.space,
        });
      }

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  async function cancelApplication({ application, is_project, space_id }) {
    try {
      loading.value = true;

      if (is_project) await applicationApi.deleteById(application.id, space_id);
      else {
        console.log(application, is_project, space_id);

        const statusProperty = await propertyApi.refetchPaginateProperties({
          page: 1,
          perPage: 1,
          where: {
            and: [
              {
                column: "name",
                operator: "EQ",
                value: "status",
              },
              {
                column: "type_id",
                operator: "EQ",
                value: application.type_id,
              },
            ],
          },
          space_id,
        });

        const statusPropertyWithMeta = await propertyApi.refetchPropertyById({
          id: statusProperty[0].id,
          space_id,
        });

        await applicationApi.update(
          application.id,
          {
            name: application.name,
            status: statusPropertyWithMeta.meta.options[1].id,
          },
          space_id
        );
      }

      await projectApi.refetchPaginateProjects({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: application.project.name,
        },
        space_id: application.project.space,
      });

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return {
    result,
    loading,
    error,
    sendApplication,
    acceptApplication,
    cancelApplication,
  };
};
