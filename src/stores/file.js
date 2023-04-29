import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import { getFiles } from 'src/graphql/files/queries'

export const useFileStore = defineStore('file', {
  id: 'file',
  state: () => ({
    files: [],
    refetchDocumets: {},
  }),

  getters: {
    GET_FILES() {
      return this.files
    },
    GET_REFETCH_DOCUMENT() {
      return this.files
    },
  },

  actions: {
    SET_FILES() {
      try {
        const { onResult, refetch } = useQuery(getFiles)
        onResult((queryResult) => {
          this.files = queryResult.data['paginate_file'].data
          this.refetchDocumets = refetch
        })
      } catch (e) {
        console.log('Ошибка:', e)
      }
    },
  },
})
