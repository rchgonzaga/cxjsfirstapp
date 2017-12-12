import { Controller } from 'cx/ui';
import { debounce } from 'cx/util'

let lastQueryId = 0;


const casual = {
    "records": [
        {
            "fullName": "Brandi Bartell",
            "continent": "South America",
            "browser": "Opera",
            "os": "Android",
            "visits": 27
        },
        {
            "fullName": "Orie Hand",
            "continent": "South America",
            "browser": "Chrome",
            "os": "Mac OS",
            "visits": 2170
        },
        {
            "fullName": "Zachary Borer",
            "continent": "Australia",
            "browser": "Firefox",
            "os": "Ubuntu",
            "visits": 34
        },
        {
            "fullName": "Samanta Kling",
            "continent": "South America",
            "browser": "Opera",
            "os": "Mac OS",
            "visits": 88
        },
        {
            "fullName": "Nolan Lind",
            "continent": "Europe",
            "browser": "Internet Explorer",
            "os": "iOS",
            "visits": 76
        },
        {
            "fullName": "Roosevelt Morar",
            "continent": "Africa",
            "browser": "Edge",
            "os": "iOS",
            "visits": 4
        },
        {
            "fullName": "Jasen Sipes",
            "continent": "Europe",
            "browser": "Safari",
            "os": "iOS",
            "visits": 62
        },
        {
            "fullName": "Gracie Feest",
            "continent": "Australia",
            "browser": "Chrome",
            "os": "Android",
            "visits": 66
        },
        {
            "fullName": "Asia Erdman",
            "continent": "Australia",
            "browser": "Internet Explorer",
            "os": "Ubuntu",
            "visits": 120
        }
    ]
}


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

        this.store.set("$page.tab", "tab1");
        this.store.set("$page.form.invalid", true);

        this.shuffle()
    }

    shuffle() {
        this.store.set("$page.records", casual)
    }

    editRow(e, { store }) {
        let record = store.get("$record");
        store.set("$record.$editing", record);
    }

    saveRow(e, { store }) {
        store.delete("$record.$editing");
    }

    cancelRowEditing(e, { store }) {
        let oldRecord = store.get("$record.$editing");
        if (oldRecord.add) store.delete("$record");
        else store.set("$record", oldRecord);
    }

    addRow(e) {
        this.store.update("$page.records.records", records => [
            ...records,
            { $editing: { add: true } }
        ]);
    }

    deleteRow(e, { store }) {
        store.delete("$record");
    }
}