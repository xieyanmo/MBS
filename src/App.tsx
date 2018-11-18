import React, { Component } from "react";
import styled from "styled-components";
import map from "./map.png";
import "./App.css";
import Grid from "./Grid";
import Search from "./Search";

const MapWrapper = styled.div`
    opacity: 0.6;
    position: absolute;
    width: 4873px;
    height: 2942px;
    background: url(${map});
`;

class App extends Component<{}, { value: string | null }> {
    private gird: Grid | null = null;
    constructor(props: {}) {
        super(props);
        this.state = {
            value: null
        };
    }

    componentDidUpdate(prevProps: {}, prevState: { value: string | null }) {
        const { value: currValue } = this.state;
        const { value: prevValue } = prevState;
        if (this.gird && currValue) {
            this.gird.switchObject(prevValue, currValue);
        }
    }

    handleClick = (col: number, row: number) => {
        this.gird && this.gird.focusObject(col, row);
    };

    handleCancel = () => {
        this.gird && this.state.value && this.gird.cancel(this.state.value);
        this.setState({ value: null });
    };

    render() {
        return (
            <div className="App">
                <Search
                    onCancel={this.handleCancel}
                    onClick={this.handleClick}
                    value={this.state.value}
                    onChange={value => this.setState({ value })}
                />
                <Grid ref={grid => (this.gird = grid)} />
                <MapWrapper />
            </div>
        );
    }
}

export default App;
