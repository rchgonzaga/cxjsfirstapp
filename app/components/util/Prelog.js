import React from "react"
import { LabelsTopLayout, VDOM } from "cx/ui";

class Prelog extends React.Component {

    constructor(props) {
        super(props)
        this.state = props
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillReceiveProps(nextProps) {

    }

    handleClick() {
        console.log(this.props); // React Component instance
    }

    render() {
        return (
            <pre onClick={this.handleClick}>
                {JSON.stringify(this.props.log)}
            </pre>
        );
    }
}

export default Prelog