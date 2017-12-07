import { HtmlElement, Section, Select, FlexRow, TextField, Link, LinkButton, Repeater, Rescope, LookupField } from 'cx/widgets';

import Controller from './ListController';
import "cx/widgets/icons";
import { LabelsTopLayout } from 'cx/ui';

const labels = {
    routeTitle: "Estimativas",
    buttonLabel: 'Novo'
}

//layout={{type: LabelsTopLayout, mod: 'stretch', vertical: true}}

export default (<cx>

    <h2 putInto="header">{labels.routeTitle}</h2>
    <Rescope bind="$page" controller={Controller}>


    <FlexRow pad spacing wrap class="presentation">
            <div style={`width: 30%;`}>

                <Section mod="card">
                    <FlexRow spacing>
                        <TextField
                            value: bind="search"
                            placeholder="Search..."
                            style="flex: 1 2 0"
                            inputStyle="border-color: transparent; box-shadow: none; font-size: 16px"
                            icon:expr="{status}=='loading' ? 'loading' : 'search'"
                            showClear
                        />

                        <LookupField
                            value: bind="$page.s5.id"
                            text:bind="$page.s5.text"
                            options:bind="$page.options5"
                        />

                        <LinkButton mod="hollow" href="~/users/new">{labels.buttonLabel}</LinkButton>
                    </FlexRow>
                </Section>

                <FlexRow spacing wrap style="margin-top: 15px">
                    <Repeater records: bind="results" recordAlias="$user" idField="id">
                        <Link href: tpl="~/users/{$user.id}" class="user-card">
                        <Section mod="card" class="user-card-body">
                            <img src="http://placehold.it/50x50" />
                            <h6 text: bind="$user.display"/>
                            @<span text: bind="$user.username"/>
                        </Section>
                        </Link>
                    </Repeater>
                </FlexRow>
                
            </div>
            <div style={`width: 68%;`}>
                <Section mod="card">


                    <div class="pretable">
                        <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
                            <Select
                                value:bind="$page.title"
                                label="Title">
                                <option value="Mr">Mr.</option>
                                <option value="Mrs">Mrs.</option>
                            </Select>

                            <TextField
                                value:bind="$page.firstName"
                                label="Name"
                                placeholder="First Name"
                            />

                            <TextField
                                value:bind="$page.lastName"
                                placeholder="Last Name"
                            />
                        </div>
                        <div layout={{type: LabelsTopLayout, mod: 'stretch'}}>
                            <TextField
                                value:bind="$page.street"
                                label="Address"
                                placeholder="Street"
                            />
                            <TextField
                                value:bind="$page.city"
                                placeholder="City"
                            />
                            <TextField
                                value:bind="$page.zip"
                                placeholder="Zip"
                            />
                        </div>
                    </div>

                    
                </Section>
            </div>
    </FlexRow>
    

   </Rescope >

</cx >)