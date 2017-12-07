import { Controller } from 'cx/ui'
import { debounce } from 'cx/util'
import { queryUsers } from './api'

export default class extends Controller {

      constructor(props){
            super(props)
            console.log(props)
      }

      onInit() {

            // super.init();

            this.store.set('nome', 'Rafael Gonzaga')

            this.store.set('form.firstName', '#3#3#3#3##333#')
            this.store.set('form.loaded', 'true')
            this.store.set('form.idmode', false)

            let me = this

            setTimeout(function () {
                  me.store.set('form.firstName', 'Rafael Gonzaga')
                  me.store.set('form.loaded', 'false')
                  me.store.set('form.idmode', true)
            }, 4000)

            PubSub.subscribe('updateInputs', (prop, a) => {
                  console.log('*************************: ', prop, a)
                  this.store.set('form.firstName', a)
            });

            console.log("------------------ RAFAEL ------------------------")

            console.log('Escopo geral', this.store.get('form'))
            console.log('Data', this.store.getData())
            console.log("------------------ RAFAEL ------------------------")


            this.store.set('form.records', Array.from({ length: 5 }).map((v, i) => ({
                  id: i + 1,
                  fullName: i + ' Rafael',
                  phone: '1231312',
                  city: 'Ribeirao Preto',
                  notified: '132312312'
            })));

            this.addTrigger('form.form', ['form.id', 'form.records'], (id, records) => {

                  console.log(id, records.find(a => a.id == id))

                  this.store.set('form.edit', records.find(a => a.id == id));
                  this.store.set('form.add', false);
            });


            this.store.set('form.toggle.1.active', true)
            this.store.set('form.toggle.1.color', "primary")

            this.store.set('form.toggle.2.active', false)
            this.store.set('form.toggle.2.color', "")
            
            this.store.set('form.toggle.3.active', false)
            this.store.set('form.toggle.3.color', "")

            this.store.set('form.toggle.4.active', false)
            this.store.set('form.toggle.4.color', "")

            this.store.set('form.toggle.5.active', false)
            this.store.set('form.toggle.5.color', "")
            

      }

      handleToggle(position){
            
            for (let index = 1; index < 6; index++) {

                  if(position == index){
                        this.store.set(`form.toggle.${index}.active`, true)
                        this.store.set(`form.toggle.${index}.color`, "primary") 
                  } else {
                        this.store.set(`form.toggle.${index}.active`, false)
                        this.store.set(`form.toggle.${index}.color`, "")  
                  }
            }

      }

      onSave() {
            let { invalid, form } = this.store.getData()

            //let userId = this.store.get('$root.$route.userId')

            console.log(form)
            console.log(invalid)
      }

      onSubmit(event) {
            event.preventDefault();
            console.log(event)
      }

      onBlurid(event){
            console.log(' --------------- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -----------------------')
      }

      newRecord() {
            var records = this.store.get('form.records');
            this.store.set('form.add', true);
            this.store.set('form.form', {
                  fullName: 'New Entry'
            });
      }

      saveRecord() {
            var page = this.store.get('form'),
                  newRecords;
            if (page.add) {
                  var id = page.records.reduce((acc, rec) => Math.max(acc, rec.id), 0) + 1;
                  newRecords = [...page.records, Object.assign({ id: id }, page.form)];
                  this.store.set('form.id', id);
            } else
                  newRecords = page.records.map(r => r.id == page.id ? page.form : r);

            this.store.set('form.records', newRecords);
      }

      removeRecord(id) {
            var newRecords = this.store.get('form.records').filter(r => r.id != id);
            this.store.set('form.records', newRecords);
      }


}