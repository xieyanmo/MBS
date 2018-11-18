import { Select, Icon, Button } from "antd";
import * as React from "react";
import room from "./Room.json";
import styled from "styled-components";
import placeholder from "./placeholder.jpg";
import { IRoom } from "./type";
import { START_X, START_Y, OFFSET } from "./Grid";

const StyledWrapper = styled.div`
    position: fixed;
    z-index: 999;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .search-wrapper {
        padding: 10px;
        margin-left: 10px;
        margin-top: 10px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
    }

    .info {
        ul {
            position: relative;
            padding: 0;
            margin-top: 10px;
            margin-bottom: 0;
            list-style: none;
            li {
                &:last-child,
                &:first-child {
                    border-bottom: none;
                }
                &.halfwidth {
                    width: 65%;
                }
                &.pic {
                    position: absolute;
                    right: 0px;
                    top: 0px;
                }
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #eeeeee;
                padding: 5px 0;
                &.description {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    .content {
                        margin-left: 10px;
                        max-width: 310px;
                        text-align: left;
                    }
                }
                &.block {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    .position {
                        display: flex;
                        max-height: 90px;
                        overflow-y: auto;
                        flex-wrap: wrap;
                        max-width: 320px;
                        div {
                            user-select: none;
                            cursor: pointer;
                            font-size: 12px;
                            padding: 0 8px;
                            width: 60px;
                            margin-right: 4px;
                            margin-bottom: 4px;
                            border: 1px solid #eee;
                            border-radius: 2px;
                            &:hover {
                                border: 1px solid #888;
                            }
                        }
                    }
                }
                .title {
                    opacity: 0.7;
                }
                .placeholder {
                    width: 80px;
                    height: 60px;
                    background: url(${placeholder}) no-repeat center;
                    background-size: contain;
                }
            }
        }
    }
`;

interface IProps {
    onChange?: (value: string) => void;
    value: string | null;
    onClick: (col: number, row: number) => void;
    onCancel: () => void;
}

export default class Search extends React.PureComponent<IProps> {
    handleChange = (value: any) => {
        this.props.onChange && this.props.onChange(value);
    };
    handleClick = (col: number, row: number) => {
        const x = col * OFFSET + START_X - window.screen.width / 2;
        const y = row * OFFSET + START_Y;
        window.scroll({ top: y, left: x, behavior: "smooth" });
        this.props.onClick(col, row);
    };
    render() {
        const { description, quantity } = this.props.value
            ? (room as IRoom)[this.props.value]
            : { description: "", quantity: undefined };

        const block = this.props.value
            ? (room as IRoom)[this.props.value].block
                  .map(s => s.split("-").map(Number))
                  .map(([x, y]) => ({ x, y }))
            : [];
        console.log(block);
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
                        onChange={this.handleChange}
                        style={{ width: 240 }}
                        value={this.props.value || ''}
                    >
                        {Object.keys(room).map((objectName, index) => {
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
                    <Button onClick={this.props.onCancel}>Cancel</Button>
                    {this.props.value && (
                        <div className="info">
                            <ul>
                                <li className="pic">
                                    <div className="placeholder" />
                                </li>
                                <li className="halfwidth">
                                    <span className="title">Item</span>
                                    <span>{this.props.value}</span>
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
                                                    key={i}
                                                    onClick={this.handleClick.bind(
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
