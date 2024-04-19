import { LineChart } from "@tremor/react";

const PlayerCharts = props => {
    const dataCharts = props.charts.map(data => {
        return {
            date: data.date,
            players: data.players,
        };
    });

    const dataFormatter = number =>
        `$${Intl.NumberFormat("us").format(number).toString()}`;

    return (
        <LineChart
            className="h-80 bg-slate-950"
            data={dataCharts}
            index="date"
            categories={["players"]}
            color={["green"]}
            yAxisWidth={60}
        />
    );
};

export default PlayerCharts;
