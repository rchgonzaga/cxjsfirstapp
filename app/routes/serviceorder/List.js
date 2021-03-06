import { MsgBox,HtmlElement, Section, FlexRow, TextField, Link, LinkButton, Repeater, Rescope, Tab, Select, ValidationGroup, Button, Grid } from 'cx/widgets';
import { Rectangle, Svg, Text } from "cx/svg";
import {
  CategoryAxis,
  Chart,
  Column,
  Gridlines,
  Legend,
  NumericAxis,
  LineGraph
} from "cx/charts";

import { LabelsTopLayout, VDOM, KeySelection } from "cx/ui";
import Controller from './ListController';
import "cx/widgets/icons";

import { bind, expr } from 'cx/ui';
import React from "react"
import TFlexRow from '../../components/layout/TFlexRow'
import { Dropdown, Form } from 'semantic-ui-react'
import PubSub from 'pubsub-js'




class Lol extends React.Component {

    constructor(props) {
        super(props)

        console.log(' -----------------: ', props)

        this.state = props

        let me = this
        setTimeout(function () {
            me.setState({ cross: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA' });
        }, 8000)

        PubSub.subscribe('updateInputs', (prop, a) => {
            console.log('*************************: ', prop, a)
            this.setState({ cross: a })
        });
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ cross: nextProps.cross });
        console.log(' 1 - %%%%%%%%%%%%%%%%%%: ', this.state)
        console.log(' 2 - %%%%%%%%%%%%%%%%%%: ', nextProps)

        PubSub.publish('updateInputs', nextProps.cross);
    }

    onInputChange(event){
        event.preventDefault()
        PubSub.publish('updateInputs', event.target.value);
    }

    render() {

        const oie = this.state.cross

        return (<div>
            Hello, haters! ${oie}

            <Form>
                <Form.Group>
                    <Form.Input label='First name' placeholder='First Name' width={6} value={this.state.cross} onChange={this.onInputChange} />
                    <Form.Input label='Middle Name' placeholder="Middle" width={4} />
                    <Form.Input label='Last Name' placeholder='Last Name' width={6} />
                </Form.Group>
                <Form.Group>
                    <Form.Input placeholder='2 Wide' width={2} />
                    <Form.Input placeholder='12 Wide' width={12} />
                    <Form.Input placeholder='2 Wide' width={2} />
                </Form.Group>
                <Form.Group>
                    <Form.Input placeholder='8 Wide' width={8} />
                    <Form.Input placeholder='6 Wide' width={6} />
                    <Form.Input placeholder='2 Wide' width={2} />
                </Form.Group>
            </Form>

        </div>)
    }
}

const TextArea = (props) => (
  <div className="form-group">
    <label className="form-label">{props.title}</label>
    <textarea
      className="form-input"
      style={props.resize ? null : {resize: 'none'}}
      name={props.name}
      rows={props.rows}
      value={props.content}
      onChange={props.controlFunc}
      placeholder={props.placeholder} />
  </div>
)


const LineChart = ({ data, chartStyle, lineStyle }) => <cx>
    <Svg style={chartStyle}>
        <Chart offset="20 -20 -40 40" axes={{ x: { type: NumericAxis }, y: { type: NumericAxis, vertical: true } }}>
            <Gridlines/>
            <LineGraph data={data} lineStyle={lineStyle} />
        </Chart>
    </Svg>
</cx>



class GenerecContainer extends React.Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.state = props
    this.handleClick = this.handleClick.bind(this)

    
  }

  componentWillReceiveProps(nextProps){
      this.setState({firstName: nextProps.firstName});
  }

  handleClick() {
    console.log(this); // React Component instance
    console.log(this.state.firstName); // React Component instance
    console.log(this.props.firstName); // React Component instance

    this.setState({firstName: this.props.firstName})
  }
  render() {
    return (
      <div onClick={this.handleClick} style={{ width: "100%", padding: "5px" }}> 
        aaa {this.state.firstName} bbb 
        {this.props.children}
      </div>
    );
  }
}

const stateOptions = [{ key: 'AL', value: 'AL', text: 'Alabama' }, { key: 'BR', value: 'BR', text: 'Barazzil' }]

export default (<cx>
    <h2 putInto="header"> Service Order</h2>

    <Rescope bind="$page" controller={Controller}>
        <Section mod="well" title="Classic" style="width: 100%; height: 100%;">

            <FlexRow spacing target="tablet">
                <div style="flex: 1; height: 100%;">

{/* 
                    <GenerecContainer firstName:bind="form.firstName">
                        <hr/>
                        <TextArea content:bind="form.firstName"/>
                        <hr/>
                    
                        <LineChart
                            chartStyle="width: 300px; height: 200px; background: white;"
                            lineStyle="stroke: red"
                            data={Array.from({length: 100}, (_, x) => ({ x, y: 75 - 50 * Math.random() }))}
                        />
                        <hr/>
                        <Lol/>
                    </GenerecContainer>  */}
                    
                    <div style={{ height: "39px" }}>
                        <Button pressed:bind="form.toggle.1.active" 
                            mod:bind="form.toggle.1.color" 
                            style={{ top: "0px;"}} 
                            onClick={(e, { controller }) => { controller.handleToggle(1); }}>
                            Id
                        </Button>
                        <Button pressed:bind="form.toggle.2.active" 
                            mod:bind="form.toggle.2.color" 
                            style={{ top: "0px;"}} 
                            onClick={(e, { controller }) => { controller.handleToggle(2); }}>
                            Ticket
                        </Button>
                        <Button pressed:bind="form.toggle.3.active"
                            mod:bind="form.toggle.3.color" 
                            style={{ top: "0px;"}} 
                            onClick={(e, { controller }) => { controller.handleToggle(3); }}>
                            Descr
                        </Button>
                        <Button pressed:bind="form.toggle.4.active" 
                            mod:bind="form.toggle.4.color" 
                            style={{ top: "0px;"}} 
                            onClick={(e, { controller }) => { controller.handleToggle(4); }}>
                            Nome
                        </Button>
                        <Button pressed:bind="form.toggle.5.active"  
                            mod:bind="form.toggle.5.color" 
                            style={{ top: "0px;"}} 
                            onClick={(e, { controller }) => { controller.handleToggle(5); }}>
                            Dt Entrada
                        </Button>
                    </div>



                <Grid records:bind='form.records'
                    style={{width: "100%"}}
                    selection={{ type: KeySelection, bind: 'form.id', keyField: 'id'}}
                    columns={[
                        { header: 'Name', field: 'fullName', sortable: true },
                        { header: 'Phone', field: 'phone' },
                        { header: 'City', field: 'city', sortable: true },
                        { header: 'Notified', field: 'notified', sortable: true, value: { expr: '{$record.notified} ? "Yes" : "No"' } },
                        { header: 'Actions', items: (<cx>
                            <Button data-id:bind='$record.id' onClick={(e, {controller, data}) => { controller.removeRecord(data.data.id)}}>Remove</Button>
                            </cx>)
                        }
                    ]}
                />
                
                <Dropdown placeholder='State' search selection options={stateOptions} />

            </div>
                <div style="flex: 2; height: 100%;">
                
                    <div>

                    <form>
                        <ValidationGroup
                            layout={{ type: LabelsTopLayout, mod: 'stretch', vertical: true }}
                            invalid:bind="invalid">

                        <FlexRow spacing target="desktop">

                            <TFlexRow width="100px">
                                <TextField label="ID" value:bind="form.id"
                                    icon="search" 
                                    style={{ width: "100%" }}
                                    disabled:bind="form.idmode"
                                    onBlur="onBlurid" />
                            </TFlexRow>

                            <TFlexRow>
                                <Select value:bind="form.title" label="Title" style={{ width: "100%" }}>
                                    <option value="Mr">Mr.</option>
                                    <option value="Mrs">Mrs.</option>
                                </Select>
                            </TFlexRow>

                            <TFlexRow>
                                <TextField value:bind="form.firstName" label="Name" placeholder="First Name" style={{ width: "100%" }}
                                    validationMode="help-block" reactOn="enter blur change"
                                    onValidate={(v) => { if (v != 'Cx') return 'Oops, wrong answer!' }}
                                />
                            </TFlexRow>

                            <TFlexRow>
                                <TextField value:bind="form.lastName"  label="Last Name" placeholder="Last Name" style={{ width: "100%" }}/>
                            </TFlexRow>

                        </FlexRow>

                        <FlexRow spacing target="desktop">
                            <TFlexRow>
                                <TextField value: bind="form.street" label="Address" placeholder="Street" style={{ width: "100%" }} />
                            </TFlexRow>

                            <TFlexRow>
                                <TextField value: bind="form.city" label="City" placeholder="City" style={{ width: "100%" }}/>
                            </TFlexRow>

                            <TFlexRow>
                                <TextField value: bind="form.zip" label="Zip" placeholder="Zip"  style={{ width: "100%" }}/>
                            </TFlexRow>

                            <TFlexRow>
                                <TextField value: bind="form.number" label="Number" placeholder="Number"  style={{ width: "100%" }}/>
                            </TFlexRow>
                        </FlexRow>
                        </ValidationGroup>

                        <br />

                        <div style="padding-left:10px;white-space:nowrap;">
                            <Tab tab="tab1" value:bind="$page.tab" mod="classic" default>Tab 1</Tab>
                            <Tab tab="tab2" value:bind="$page.tab" mod="classic">Tab 2</Tab>
                            <Tab tab="tab3" value:bind="$page.tab" mod="classic">Tab 3</Tab>
                            <Tab tab="tab4" value:bind="$page.tab" mod="classic" disabled>Tab 4</Tab>
                        </div>

                        <div style="border: 1px solid lightgray; background: white; padding: 20px">
                            
                            <div visible:expr="{$page.tab}=='tab1'">
                                <FlexRow spacing target="desktop">
                                    <div style="flex: 1; height: 30px; background: lightgray;" />
                                    <div style="flex: 1; height: 30px; background: lightgray;" />
                                    <div style="flex: 1; height: 30px; background: lightgray;" />
                                </FlexRow>
                            </div>

                            <div visible:expr="{$page.tab}=='tab2'">

                                
                                <Lol cross:bind="form.firstName"/>

                            </div>
                            
                            <div visible:expr="{$page.tab}=='tab3'">
                                Tab 3
                            </div>

                            <div visible:expr="{$page.tab}=='tab4'">
                                Tab 4
                            </div>
                            
                        </div >
                        <br/>
                        <div>
                        <Button
                            mod="primary"
                            onClick="onSave"
                            disabled:bind="invalid"
                        >
                            Save
                        </Button>
                        &nbsp;
                        <Button
                            mod="primary"
                            onClick="onSubmit"
                            submit
                        >Submit</Button>
                        </div>
                    </form >


                    </div >
                </div>
            </FlexRow>

        </Section >


   </Rescope >
</cx >)