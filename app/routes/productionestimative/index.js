import { HtmlElement, Route } from 'cx/widgets';

import List from './List';

export default (
    <cx>
        <Route route="~/productionestimative" url: bind="url">
            <List />
        </Route>
    </cx >
)