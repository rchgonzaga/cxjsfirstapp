import { 
    HtmlElement, 
    Section, 
    Select, 
    FlexRow, 
    TextField, 
    Link, 
    LinkButton, 
    Repeater, 
    Rescope, 
    LookupField, 
    TextArea, 
    Tab, 
    Button, 
    MsgBox,
    Menu,
    MenuItem,
    Submenu,
    Checkbox,
    DateField,
    ValidationGroup
} from 'cx/widgets';

import { LabelsTopLayout, VDOM } from 'cx/ui';
import React from "react"

import Controller from './ListController';
import "cx/widgets/icons";
import Prelog from '../../components/util/Prelog'

import { Icon, Header, Breadcrumb } from 'semantic-ui-react'

const labels = {
    routeTitle: "Person",
    buttonLabel: "Novo",
    buttonSave: "Save",
    buttonCancel: "Cancel",
    buttonDelete: "Delete"
}

const activeItem = 'home'

export default (<cx>

    <h2 putInto="header">{labels.routeTitle}</h2>
    <Rescope bind="$page" controller={Controller}>

    <form>
        <ValidationGroup
            layout={{ type: LabelsTopLayout, mod: 'stretch', vertical: true }}
            invalid:bind="$page.form.invalid">

            <div style={`padding: 0px 15px;`}>
                        
                        <FlexRow spacing target="tablet">
                            <div style="flex: 1;">
                                <Breadcrumb style={`padding: 11px 0px 5px; `}>
                                    <Breadcrumb.Section link><Icon name='dashboard' /> Dashboard</Breadcrumb.Section>
                                    <Breadcrumb.Divider />
                                    <Breadcrumb.Section link><Icon name='adn' /> Admin</Breadcrumb.Section>
                                    <Breadcrumb.Divider />
                                    <Breadcrumb.Section active><Icon name='line chart' />Production Estimatives</Breadcrumb.Section>
                                </Breadcrumb>
                            </div>
                            <div style="flex: 1;">
                                <div style="    margin-top: 5px;margin-bottom: -7px;width: 43px;float: right;">
                                    <Menu horizontal>
                                    <Submenu style="display: -webkit-inline-box;">
                                        <Icon name='setting' style="margin: 5px -8px 0px 0px;"/> File
                                        <Menu putInto="dropdown">
                                            <a
                                                href="#"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    MsgBox.alert('Primary');
                                                }}
                                            >
                                                <Icon name='cloud download' /> Export
                                            </a>
                                            <hr style="border: 0;height: 1px;background: #c0c0c0;margin: 0px 7px;"/>
                                            <a
                                                href="#"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    MsgBox.alert('Primary');
                                                }}
                                            >
                                                <Icon name='cloud upload' /> Import
                                            </a>
                                            <hr style="border: 0;height: 1px;background: #c0c0c0;margin: 0px 7px;"/>
                                            <a
                                                href="#"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    MsgBox.alert('Primary');
                                                }}
                                            >
                                                <Icon name='share' /> Share
                                            </a>

                                        </Menu>
                                    </Submenu>
                                    </Menu>
                                </div>
                            </div>
                        </FlexRow>

                    <hr/>
                    
                    <div class="pretable">
                        <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
                            <TextField
                                value:bind="$page.form.firstName"
                                label="Name"
                                placeholder="First Name"
                                validationMode="help-block" 
                                reactOn="enter blur change"
                                onValidate={(v) => { if (v != 'Cx' || v == null) return 'Oops, wrong answer!' }}
                            />

                            <TextField
                                value:bind="$page.form.lastName"
                                label="Last name"
                                placeholder="Last Name"
                            />
                        </div>
                        <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
                            <Select
                                value:bind="$page.form.title"
                                label="Salary review">
                                <option value="0"></option>
                                <option selected value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                                <option value="3">Março</option>
                                <option value="4">Abril</option>
                                <option value="5">Maio</option>
                                <option value="6">Junho</option>
                                <option value="7">Julho</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                            </Select>
                            
                            <TextField
                                value:bind="$page.form.street"
                                label="Address"
                                placeholder="Rua Fulano de Tal, 300"
                            />
                            <TextField
                                value:bind="$page.form.city"
                                label="City"
                                placeholder="City"
                            />
                            <TextField
                                value:bind="$page.form.zip"
                                lable="Zip"
                                placeholder="Zip"
                            />
                        </div>
                        <div layout={{ type: LabelsTopLayout, mod: 'stretch' }}>
                           <TextArea 
                            label="Description" 
                            value:bind="$page.form.text" 
                            rows={3}
                            placeholder="Everything that describes this person at work" />
                        </div>

                        <div class="innertab">
                            <div style="white-space:nowrap;">
                                <Tab tab="tab1" value:bind="$page.tab" mod="classic"><Icon name='history' /> History</Tab>
                                <Tab tab="tab2" value:bind="$page.tab" mod="classic"><Icon name='file' /> Files</Tab>
                                <Tab tab="tab3" value:bind="$page.tab" mod="classic"><Icon name='list' /> Logs</Tab>
                            </div>
                            <div style="border: 1px solid lightgray; background: white; padding: 20px">
                                <div visible:expr="{$page.tab}=='tab1'">Tab 1</div>
                                <div visible:expr="{$page.tab}=='tab2'">Tab 2</div>
                                <div visible:expr="{$page.tab}=='tab3'">Tab 3</div>
                            </div>
                        </div>

                        <div class="footer">
                            
                            <Button mod="primary" onClick={() => { MsgBox.alert('Primary') }} disabled:bind="$page.form.invalid">{labels.buttonSave}</Button>
                            <Button onClick={() => { MsgBox.alert('Disabled') }}>{labels.buttonCancel}</Button>
                            <Button mod="danger" confirm="You clicked the danger button. Are you sure that you want to proceed?"
                                onClick={() => {
                                    MsgBox.alert('Danger')
                                }}>
                                {labels.buttonDelete}
                            </Button>

                        </div>


                    </div>

            </div>

        </ValidationGroup>
    </form >

    <Prelog log:bind="$page.form"/>

   </Rescope >

</cx >)