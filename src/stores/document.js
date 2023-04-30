import { defineStore } from 'pinia'
import { useQuery } from '@vue/apollo-composable'
import { getDocuments } from 'src/graphql/document/queries'

export const useDocumentStore = defineStore('document', {
  state: () => ({
    documents: [],
    refetchDocuments: {},
  }),

  getters: {
    GET_DOCUMENTS() {
      return this.documents
    },
    GET_REFETCH_DOCUMENT() {
      return this.refetchDocuments
    },
  },

  actions: {
    SET_DOCUMENTS() {
      try {
        const { onResult, refetch } = useQuery(getDocuments)
        onResult((queryResult) => {
          this.documents = queryResult.data['paginate_document'].data
          this.refetchDocuments = refetch
        })
      } catch (e) {
        console.log('Ошибка:', e)
      }
    },
  },
})
