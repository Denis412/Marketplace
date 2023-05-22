import { defineStore } from 'pinia'
import { onResult, refetch } from 'src/sdk/files/fileQuery'

export const useFileStore = defineStore('file', {
  id: 'file',
  state: () => ({
    files: [],
    refetchFiles: {},
    currentTitleDoc: '',
    currentDateDoc: '',
    currentEditorValue: '',
    currentBreadcrumps: ''
  }),

  getters: {
    GET_FILES() {
      return this.files
    },
  },

  actions: {
    SET_FILES() {
      onResult((queryResult) => {
        this.files = queryResult.data['paginate_file'].data
        this.refetchFiles = refetch
      })
    },

    SET_CURRENT_TITLE_DOC(value) {
      this.currentTitleDoc = value
    },

    SET_CURRENT_DATE_DOC(value){
      this.currentDateDoc = value
    },
    SET_BREADCRUMPS_FOR_DOC(value){
      this.currentBreadcrumps = value
    },
    SET_CURRENT_EDITOR_VALUE(value) {
      this.currentEditorValue = value
    },
  },
})
