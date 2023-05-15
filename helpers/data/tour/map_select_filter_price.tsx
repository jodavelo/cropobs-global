function HelperComponent(title: string, text: string) {
    return (
        <div>
            <h4>{ title }</h4>
            <p>{ text }</p>
        </div>
    )
}

export const map_select_filter_price = [
    {
        selector: '#element-filter-price',
        content: HelperComponent('Element', 'Select the variable and the country of interest whose distribution you wish to visualize on the graphs')
    },
]
export const map_select_filter_price_es = [
    {
        selector: '#element-filter-price',
        content: HelperComponent('Elemento', 'Selecciona la variable y el pais de interés cuya distribución deseas visualizar en las gráficas')
    },
]

export const map_select_filter_price_pt = [
    {
        selector: '#element-filter-price',
        content: HelperComponent('Elemento', 'Selecione a variável de interesse e a cidade cuja distribuição você deseja visualizar nos gráficos')
    },
]