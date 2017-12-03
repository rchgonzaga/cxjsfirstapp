import { Controller } from 'cx/ui'
import { debounce } from 'cx/util'
import { queryUsers } from './api'

let lastQueryId = 0

export default class extends Controller {

      constructor(props){
            super(props)
            console.log(props)
      }

      onInit() {

            this.store.set('nome', 'Rafael Gonzaga')

            this.store.set('form.firstName', '#3#3#3#3##333#')
            this.store.set('form.loaded', 'true')

            let me = this

            setTimeout(function () {
                  me.store.set('form.firstName', 'Rafael Gonzaga')
                  me.store.set('form.loaded', 'false')
            }, 3000)

            console.log("------------------ RAFAEL ------------------------")
            //console.log(this.store)
            console.log('Escopo geral', this.store.get('form'))
            console.log('Data', this.store.getData())
            console.log("------------------ RAFAEL ------------------------")
      }

      onSave() {
            let { invalid, form } = this.store.getData()

            //let userId = this.store.get('$root.$route.userId')

            console.log(form)
            console.log(invalid)
      }

}