import { Controller } from 'cx/ui'
import { debounce } from 'cx/util'
import { queryUsers } from './api'

let lastQueryId = 0

export default class extends Controller {

      // path to form in the store
      formStorage = '$root.$page.$page.form.'

      onInit() {

            this.store.set('nome', 'Rafael Gonzaga')

            this.store.set(`${this.formStorage}firstName`, '#3#3#3#3##333#')
            this.store.set(`${this.formStorage}loaded`, 'true')

            let me = this
            setTimeout(function () {
                  me.store.set(`${me.formStorage}firstName`, 'Rafael Gonzaga')
                  me.store.set(`${me.formStorage}loaded`, 'false')
            }, 3000)

            console.log("------------------ RAFAEL ------------------------")
            //console.log(this.store)
            console.log('Escopo geral', this.store.get('$root.$page'))
            console.log('Data', this.store.getData())
            console.log("------------------ RAFAEL ------------------------")
      }

      load() {
            let q = this.store.get('search')
            this.store.set('status', 'loading')
            let queryId = ++lastQueryId
            queryUsers(q)
                  .then(data => {
                        //only the last query matters
                        if (queryId === lastQueryId) {
                              this.store.set('results', data)
                              this.store.set('status', 'ok')
                        }
                  })
                  .catch(() => {
                        if (queryId === lastQueryId) {
                              this.store.set('status', 'error')
                        }
                  })
      }
}