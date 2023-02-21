import Scale, { Tick } from 'chart.js/dist/core/core.scale';

export const annual_growth_options = {
    responsive: true,
    scales: {
        x: {
            display: true,
            ticks: {
                callback: function(this: any, val: string | number, index: number, ticks: Tick[]): string | number | string[] | number[] {
                    return index % 2 === 0 || index == ticks.length - 1 ? this.getLabelForValue(val) : '';
                },
            },
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Growth rate (%)'
            }
        }
    },
    interaction: {
        intersect: false
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Annual Growth',
      },
    },
};