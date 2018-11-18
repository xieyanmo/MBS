import { BaseType, svg } from "d3";
import * as d3 from "d3";
import * as React from "react";
import room from "./Room.json";
import { IRoom } from "./type";

export const START_X = 273;
export const START_Y = 2623;
export const OFFSET = 18;

const drawRect = (options: {
    class: string;
    col: number;
    row: number;
    svg: d3.Selection<BaseType, {}, null, undefined>;
    fill?: string;
}) => {
    const { col, row, svg, fill, class: className } = options;
    const xStart = col * OFFSET + START_X;
    const yStart = row * OFFSET + START_Y;

    const box = svg.append("g").attr("class", "box");

    box.append("rect")
        .attr("class", className)
        .attr("x", xStart)
        .attr("y", yStart)
        .attr("width", OFFSET)
        .attr("height", OFFSET)
        .attr("stroke-width", 1)
        .attr("stroke", "rgba(100, 100, 100, 0.1)")
        .attr("fill", fill || "none");
};

const focus = (
    col: number,
    row: number,
    svg: d3.Selection<BaseType, {}, null, undefined>
) => {
    svg.selectAll(".focus-box").remove();
    drawRect({ class: "focus-box", col, row, svg, fill: "yellow" });
};

const removeRect = (options: {
    class: string;
    svg: d3.Selection<BaseType, {}, null, undefined>;
}) => {
    const { class: className, svg } = options;
    svg.selectAll(className).remove();
};

const init = (div: HTMLDivElement) => {
    const svg = d3
        .select(div)
        .append("svg")
        .attr("id", "map")
        .attr("width", 4873)
        .attr("height", 2942);

    const xArray = new Array(186).fill(undefined).map((_, i) => i);
    const yArray = new Array(7).fill(undefined).map((_, i) => i);

    xArray.forEach(col => {
        yArray.forEach(row => {
            drawRect({ class: "grid", col, row, svg });
        });
    });

    return svg;
};

interface IProps {
    selectedRooms: string[];
}

class Grid extends React.PureComponent<IProps> {
    private div!: HTMLDivElement | null;
    private svg!: d3.Selection<BaseType, {}, null, undefined>;
    componentDidMount() {
        this.svg = init(this.div!);
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.selectedRooms !== this.props.selectedRooms) {
            this.cancel()
            prevProps.selectedRooms.forEach(name => {
                removeRect({ class: `.rect-${name}`, svg: this.svg });
            });
            const blocksToDraw = this.props.selectedRooms.map(name => ({
                name,
                room: (room as IRoom)[name]
            }));
            blocksToDraw.forEach(blockToDraw => {
                const {
                    name,
                    room: { block, color }
                } = blockToDraw;
                block.forEach((b, index) => {
                    const [col, row] = b.split("-").map(Number);
                    drawRect({
                        class: `rect-${name}`,
                        col,
                        row,
                        svg: this.svg,
                        fill: color
                    });
                });
            });
        }
    }

    cancel = () => {
        this.svg.selectAll(".focus-box").remove();
    };

    slideToRoom = (value: string) => {
        this.cancel()
        const blockToSlide = (room as IRoom)[value];
        if (blockToSlide) {
            const [col, row] = blockToSlide.block[0].split("-").map(Number);
            const x = col * OFFSET + START_X - window.screen.width / 2;
            const y = row * OFFSET + START_Y;
            window.scroll({ top: y, left: x, behavior: "smooth" });
        }
    };

    focusObject = (col: number, row: number) => {
        focus(col, row, this.svg);
    };

    render() {
        return (
            <div
                style={{ zIndex: 998, position: "absolute", left: 0, top: 0 }}
                ref={div => (this.div = div)}
            />
        );
    }
}

export default Grid;
