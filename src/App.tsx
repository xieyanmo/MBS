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

class App extends Component<{}, { selectedRooms: string[] }> {
    private gird: Grid | null = null;
    constructor(props: {}) {
        super(props);
        this.state = {
            selectedRooms: []
        };
    }

    handleClick = (col: number, row: number) => {
        this.gird && this.gird.focusObject(col, row);
    };

    handleCancel = () => {
        this.gird && this.gird.cancel();
    };

    focusRoom = (value: string) => {
        this.gird && this.gird.slideToRoom(value);
    };

    render() {
        return (
            <div className="App">
                <Search
                    focusRoom={this.focusRoom}
                    onCancel={this.handleCancel}
                    slideToBlock={this.handleClick}
                    value={this.state.selectedRooms}
                    onRoomChange={selectedRooms => this.setState({ selectedRooms })}
                />
                <Grid
                    ref={grid => (this.gird = grid)}
                    selectedRooms={this.state.selectedRooms}
                />
                <MapWrapper />
            </div>
        );
    }
}

export default App;
