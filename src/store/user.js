// store.js
import { createGlobalState, useStorage } from '@vueuse/core'

export const useUserState = createGlobalState(() => {
  return useStorage('vueuse-local-storage', {
    email: '',
    username: '',
    sessionToken: ''
  })
})