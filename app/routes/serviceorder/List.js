import { HtmlElement, Section, FlexRow, TextField, Link, LinkButton, Repeater, Rescope, Tab, Select, ValidationGroup, Button, Grid } from 'cx/widgets';
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

const Lol = React.createClass({
    render: function() {
        console.log(this)
        return <div>Hello, haters!</div>;
    }
})

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

                    <h4 style={{ height: "31px" }}>&nbsp;</h4>
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
                                <TextField value: bind="form.firstName" label="Name" placeholder="First Name" style={{ width: "100%" }}
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
                                asdasdas
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