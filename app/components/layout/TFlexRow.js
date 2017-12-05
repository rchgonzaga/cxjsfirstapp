import React from "react"
import { LabelsTopLayout, VDOM } from "cx/ui";

class TFlexRow extends React.Component {

    constructor(props) {
        super(props)
        this.state = props
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {
        let bgColor = (this.state.bgColor ? this.state.bgColor : '#FFF')
        let divWidth = (this.state.width ? this.state.width : '100%')
        let divFlex = (divWidth.endsWith("px") ? "-1 0 0" : 1)

        return (
            <div onClick={this.handleClick} style={{ width: divWidth, backgroundColor: (bgColor), padding: "5px", flex: divFlex }}>
                {this.props.children}
            </div>
        );
    }
}

export default TFlexRow