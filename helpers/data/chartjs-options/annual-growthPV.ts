import { Tick } from 'chart.js/dist/core/core.scale';

export const annual_growth_optionsPV = {
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
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Annual Growth',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function(context: Record<string, any>) {
                console.log("test");
                let value = context.parsed.y;
                let units = context.dataset.unit;
                let label = context.dataset.label;
                if (units !== '%' && units !== 't/ha') {
                    value = value.toLocaleString(undefined, {maximumFractionDigits:2});
                }
                else {
                    value = value.toFixed(2);
                }
                return `${label}: ${value} ${units}`;
            }
        }
      }
    },
};