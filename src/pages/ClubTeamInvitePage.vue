<template>
  <q-page class="c-pa-32 page-background">
    <header>
      <h3 class="text-h3">Пригласить участника</h3>
    </header>

    <main class="q-mt-md">
      <section class="flex items-center">
        <q-input
          class="search-input c-input-outline"
          outlined
          placeholder="Поиск участника"
          @update:model-value="filteredSubjects"
          v-model="filter"
        >
          <template #prepend>
            <q-icon
              name="img:/src/assets/icons/search/search-grey.svg"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <c-dropdown
          :loading="loading"
          label="Специальность"
          class="c-ml-32"
          :list="allSpecialities?.paginate_speciality.data"
        />
      </section>

      <section class="row c-mt-24">
        <section class="col">
          <div class="subjects-wrapper">
            <section class="q-gutter-y-md">
              <c-invite-subject-item
                v-for="subject in allSubjects?.paginate_subject.data"
                :key="subject.id"
                class="rounded-borders-10 flex justify-between"
                :subject="subject"
              />
            </section>
          </div>

          <div class="q-mt-md q-gutter-x-md text-body1">
            <c-button background label="Пригласить" @click="resetSubjects" />

            <c-button outline label="Отменить" @click="resetSubjects" />
          </div>
        </section>

        <section class="col c-ml-32">
          <div v-if="selectedSubjects.length">
            <section class="selected-subjects-wrapper c-pa-32">
              <q-list class="flex q-gutter-md">
                <c-selected-subject-chip
                  v-for="subject in selectedSubjects"
                  :key="subject.id"
                  :subject="subject"
                />
              </q-list>
            </section>

            <div class="text-body1">
              <c-button
                background
                label="Сбросить"
                class="q-mt-md"
                @click="resetSubjects"
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  </q-page>
</template>

<script setup>
import CButton from "src/components/ClubButton.vue";
import CInviteSubjectItem from "src/components/ClubInviteSubjectItem.vue";
import CSelectedSubjectChip from "src/components/ClubSelectedSubjectChip.vue";
import CDropdown from "src/components/ClubDropdown.vue";
import { provide, ref } from "vue";

import specilalityApi from "src/sdk/speciality";
import userApi from "src/sdk/user";

const { team } = defineProps({
  team: Object,
});

const { result: allSpecialities, loading } = specilalityApi.querySpecialities();
const { result: allSubjects, loading: loadingSubjects } =
  userApi.queryPaginateSubjectsForInvite();

const selectedSubjects = ref([]);
const filter = ref([]);

provide("selectedSubjects", selectedSubjects);

const filteredSubjects = () => {};
const resetSubjects = () => (selectedSubjects.value = []);
</script>

<style scoped lang="scss">
.search-input {
  width: 450px;
}

.subjects-wrapper {
  max-height: 532px;
  overflow-y: auto;

  padding: 24px;
  background: $grey-2;
  border-radius: 10px;
}

.selected-subjects-wrapper {
  height: max-content;

  border-radius: 10px;
  background: $grey-2;
}
</style>
