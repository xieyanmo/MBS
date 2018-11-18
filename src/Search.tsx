import { Select, Icon, Button } from "antd";
import * as React from "react";
import room from "./Room.json";
import { StyledWrapper } from "./SearchStyle";
import { IRoom } from "./type";
import { START_X, START_Y, OFFSET } from "./Grid";
import SelectModal from "./SelectModal";

interface IProps {
    focusRoom: (value: string) => void;
    onRoomChange: (value: string[]) => void;
    value: string[];
    slideToBlock: (col: number, row: number) => void;
    onCancel: () => void;
}

interface IState {
    visible: boolean;
    currentRoom: string;
    currentBlock: string;
}

export default class Search extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            visible: false,
            currentRoom: "",
            currentBlock: ""
        };
    }
    focusRoom = (value: string) => {
        this.setState({ currentRoom: value, currentBlock: "" });
        this.props.focusRoom(value);
    };
    slideToBlock = (col: number, row: number) => {
        const x = col * OFFSET + START_X - window.screen.width / 2;
        const y = row * OFFSET + START_Y;
        window.scroll({ top: y, left: x, behavior: "smooth" });
        this.props.slideToBlock(col, row);
        this.setState({ currentBlock: `${col}-${row}` });
    };
    handleCancel = () => {
        this.setState({ currentRoom: "" });
        this.props.onCancel();
    };
    render() {
        const { description, quantity } = this.state.currentRoom
            ? (room as IRoom)[this.state.currentRoom]
            : { description: "", quantity: undefined };

        const block = this.state.currentRoom
            ? (room as IRoom)[this.state.currentRoom].block
                  .map(s => s.split("-").map(Number))
                  .map(([x, y]) => ({ x, y }))
            : [];
        const color = this.state.currentRoom
            ? (room as IRoom)[this.state.currentRoom].color
            : "#FFFFFF";
        return (
            <StyledWrapper>
                <div className="search-wrapper">
                    <Select
                        placeholder="Search for Item"
                        suffixIcon={<Icon type="search" />}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            String(option.props.children!)
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={value => this.focusRoom(value as string)}
                        style={{ width: 180 }}
                        value={this.state.currentRoom || ""}
                    >
                        {this.props.value.map((objectName, index) => {
                            return (
                                <Select.Option
                                    value={objectName}
                                    key={index.toString()}
                                >
                                    {objectName}
                                </Select.Option>
                            );
                        })}
                    </Select>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button onClick={() => this.setState({ visible: true })}>
                        Select from all
                    </Button>
                    <SelectModal
                        onOk={() => this.setState({ visible: false })}
                        onChange={this.props.onRoomChange}
                        visible={this.state.visible}
                        value={this.props.value}
                    />
                    {this.state.currentRoom && (
                        <div className="info">
                            <ul>
                                <li className="pic">
                                    <div className="placeholder" />
                                </li>
                                <li className="halfwidth">
                                    <span className="title">Item</span>
                                    <span className="item-name">
                                        {this.state.currentRoom}
                                        <div
                                            className="color"
                                            style={{ background: color }}
                                        />
                                    </span>
                                </li>
                                <li className="halfwidth">
                                    <span className="title">Quantity</span>
                                    <span>
                                        {quantity === undefined
                                            ? "--"
                                            : quantity}
                                    </span>
                                </li>
                                <li className="description">
                                    <div className="title">Description</div>
                                    <div className="content">{description}</div>
                                </li>
                                <li className="block">
                                    <div className="title">Blocks</div>
                                    <div className="position">
                                        {block.map(({ x, y }, i) => {
                                            return (
                                                <div
                                                    className={
                                                        this.state
                                                            .currentBlock ===
                                                        `${x}-${y}`
                                                            ? "selected"
                                                            : "normal"
                                                    }
                                                    key={i}
                                                    onClick={this.slideToBlock.bind(
                                                        this,
                                                        x,
                                                        y
                                                    )}
                                                >
                                                    {x}-{y}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </StyledWrapper>
        );
    }
}
