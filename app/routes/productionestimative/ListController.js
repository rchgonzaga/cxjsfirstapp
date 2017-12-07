import { Controller } from 'cx/ui';
import { debounce } from 'cx/util'

let lastQueryId = 0;

export default class extends Controller {
    
    onInit() {
        console.log(' ListController ')

        const optionsArray = [
            { id: 1, text: 'ID' },
            { id: 2, text: 'TICKET' },
            { id: 3, text: 'DESCR' },
            { id: 4, text: 'SAFRA' }
        ]

        this.store.set('$page.options5', optionsArray);

    }
}