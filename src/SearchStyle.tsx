import placeholder from "./placeholder.jpg";
import styled from "styled-components";

export const StyledWrapper = styled.div`
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
                            &.selected {
                                background: rgba(255, 255, 0, 0.6);
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
                .item-name {
                    display: inline-flex;
                    align-items: center;
                    .color {
                        width: 15px;
                        height: 15px;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
`;
