import React from "react";
import { Modal, Select, Icon } from "antd";
import room from "./Room.json";

interface IProps {
    visible: boolean;
    value: string[];
    onChange: (selected: string[]) => void;
    onOk: () => void;
}

export default class SelectModal extends React.Component<IProps> {
    render() {
        return (
            <Modal
                visible={this.props.visible}
                onOk={this.props.onOk}
                onCancel={this.props.onOk}
            >
                <Select
                    placeholder="Search for Item"
                    suffixIcon={<Icon type="search" />}
                    showSearch
                    mode="tags"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        String(option.props.children!)
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={selected =>
                        this.props.onChange(selected as string[])
                    }
                    style={{ width: 240 }}
                    value={this.props.value}
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
            </Modal>
        );
    }
}
