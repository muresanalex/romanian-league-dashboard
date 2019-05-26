import React, { Component } from "react";

class ColorPicker extends Component {
    getValue = () => this.color.value;

    render() {
        return (
            <input
                type="color"
                onChange={ this.props.handleColorChange }
                value={ this.props.value }
                ref={ ref => {
                    this.color = ref;
                } }
            />
        );
    }
}

export default ColorPicker;
