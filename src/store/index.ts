/* global store setup (Pinia) - placeholder */
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: ()=>({
    storeName: 'محاسبي',
    currencies: ['YER','SAR','USD']
  }),
  actions: {

  }
})
