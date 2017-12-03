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
        return (
            <div onClick={this.handleClick} style={{ width: "100%", backgroundColor: (bgColor), padding: "5px", flex: 1 }}>
                {this.props.children}
            </div>
        );
    }
}

export default TFlexRow