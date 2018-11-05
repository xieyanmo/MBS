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
    svg.selectAll(`.${className}`).remove();
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

    /* Object.entries(room).forEach(([key, object]) => {
        object.forEach(block => {
            const [x, y] = block.split("-").map(Number);
            drawRect({
                class: key,
                col: x,
                row: y,
                svg,
                fill: "rgba(0, 255, 0, 0.6)"
            });
        });
    }); */

    return svg;
};

class Grid extends React.PureComponent {
    private div!: HTMLDivElement | null;
    private svg!: d3.Selection<BaseType, {}, null, undefined>;
    componentDidMount() {
        this.svg = init(this.div!);
    }

    switchObject = (prev: string | null, curr: string) => {
        this.svg.selectAll(".focus-box").remove();
        if (prev) {
            removeRect({ class: prev, svg: this.svg });
        }
        const blockToDraw = (room as IRoom)[curr].block;
        blockToDraw.forEach((block, index) => {
            const [col, row] = block.split("-").map(Number);
            drawRect({
                class: curr,
                col,
                row,
                svg: this.svg,
                fill: "rgba(220, 50, 50, 1)"
            });
            if (index === 0) {
                const x = col * OFFSET + START_X - window.screen.width / 2;
                const y = row * OFFSET + START_Y;
                window.scroll({ top: y, left: x, behavior: "smooth" });
            }
        });
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
