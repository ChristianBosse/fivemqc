import { LineChart } from "@tremor/react";

const PlayerCharts = () => {
    const chartdata = [
        {
            date: "2024-04-14 14:00:00",
            players: 100,
        },
        {
            date: "2024-04-14 14:30:00",
            players: 120,
        },
        {
            date: "2024-04-14 15:00:00",
            players: 154,
        },
        {
            date: "2024-04-14 15:30:00",
            players: 54,
        },
        {
            date: "2024-04-14 16:00:00",
            players: 78,
        },
        {
            date: "2024-04-14 16:30:00",
            players: 234,
        },
        {
            date: "2024-04-14 17:00:00",
            players: 6,
        },
    ];

    const dataFormatter = number =>
        `$${Intl.NumberFormat("us").format(number).toString()}`;

    return (
        <LineChart
            className="h-80 dark:bg-slate-950"
            data={chartdata}
            index="date"
            categories={["players"]}
            color={["green"]}
            yAxisWidth={60}
        />
    );
};

export default PlayerCharts;
