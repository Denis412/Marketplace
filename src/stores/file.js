import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import { getFiles } from 'src/graphql/files/queries'

export const useFileStore = defineStore('file', {
  id: 'file',
  state: () => ({
    files: [],
    refetchFiles: {},
  }),

  getters: {
    GET_FILES() {
      return this.files
    },
  },

  actions: {
    SET_FILES() {
      try {
        const { onResult, refetch } = useQuery(getFiles)
        onResult((queryResult) => {
          this.files = queryResult.data['paginate_file'].data
          this.refetchFiles = refetch
          console.log(queryResult.data['paginate_file'].data)
        })
      } catch (e) {
        console.log('Ошибка:', e)
      }
    },
  },
})
