import { Tick } from 'chart.js/dist/core/core.scale';

export const harvested_production_yield = {
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
            type: 'linear',
            position: 'left',
            ticks: {
                beginAtZero: true
            },
            title: {
                display: true,
                text: 'Production (ton) and Area (ha)'
            },

        },
        y2: {
            display: true,
            type: 'linear',
            position: 'right',
            grid: {
                drawOnChartArea: false
            },
            ticks: {
                beginAtZero: true
            },
            title: {
                display: true,
                text: 'Yield (ton/ha)'
            }
        }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Harvested area, production and yield',
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
                //return `${label.replace(/\(.*\)/, '').trim()} (${units}): ${value}`;
                return `${label} (${units}): ${value}`;
            }
        }
      }
    },
};