import {HtmlElement, Route} from 'cx/widgets';

import List from './List';
import Editor from './Editor';

export default (
    <cx>
    <Route route="~/serviceorder" url:bind="url">
        <List />
    </Route>
    <Route route="~/serviceorder/:userId" url:bind="url">
        <Editor />
    </Route>
    </cx>
)