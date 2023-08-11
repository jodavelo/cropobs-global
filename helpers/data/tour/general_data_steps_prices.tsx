function HelperComponent(title: string, text: string) {
    return (
        <div>
            <h4>{ title }</h4>
            <p>{ text }</p>
        </div>
    )
}

export const general_data_steps_prices = [
    {
        selector: '#element-filter',
        content: HelperComponent('', 'Select the variable of interest whose distribution you wish to visualize on the map.')
    },
    {
        selector: '#graphs-button',
        content: HelperComponent('', 'By selecting this option you will be able to hide the map to display only graphics.')
    },
    {
        selector: '#graphs-map-button',
        content: HelperComponent('', 'By selecting this option you will be able to keep the current map and chart view.')
    },
    {
        selector: '#map-button',
        content: HelperComponent('', 'By selecting this option you will be able to view only the map.')
    },
]
export const general_data_steps_prices_es = [
    {
        selector: '#element-filter',
        content: HelperComponent('', 'Selecciona la variable de interés cuya distribución deseas visualizar en el mapa')
    },
    {
        selector: '#graphs-button',
        content: HelperComponent('', 'Al seleccionar esta opción podrás ocultar el mapa para visualizar solo los gráficos')
    },
    {
        selector: '#graphs-map-button',
        content: HelperComponent('', 'Al seleccionar esta opción podrás mantener la vista actual de mapa y gráfico')
    },
    {
        selector: '#map-button',
        content: HelperComponent('', 'Al seleccionar esta opción podrás visualizar solo el mapa')
    },
]
    
export const general_data_steps_prices_pt = [
    {
        selector: '#element-filter',
        content: HelperComponent('', 'Selecione a variável de interesse cuja distribuição você deseja visualizar no mapa.')
    },
    {
        selector: '#graphs-button',
        content: HelperComponent('', 'A selecção desta opção permite-lhe esconder o mapa para exibir apenas os gráficos')
    },
    {
        selector: '#graphs-map-button',
        content: HelperComponent('', 'A selecção desta opção permite-lhe manter o mapa e a vista gráfica actuais.')
    },
    {
        selector: '#map-button',
        content: HelperComponent('', 'Seleccionando esta opção, pode visualizar apenas o mapa')
    },
]

export const general_data_steps_prices_int = [
    {
        selector: '#graphs-button',
        content: HelperComponent('Chart view', 'By selecting this option you will be able to hide the map to display only graphics.')
    },
    {
        selector: '#graphs-map-button',
        content: HelperComponent('Chart and map view', 'By selecting this option you will be able to keep the current map and chart view.')
    },
    {
        selector: '#map-button',
        content: HelperComponent('Map view', 'By selecting this option you will be able to view only the map.')
    },
]
export const general_data_steps_prices_int_es = [
    {
        selector: '#graphs-button',
        content: HelperComponent('Vista de gráficos', 'Al seleccionar esta opción podrás ocultar el mapa para visualizar solo los gráficos')
    },
    {
        selector: '#graphs-map-button',
        content: HelperComponent('Vista mapa y gráficos', 'Al seleccionar esta opción podrás mantener la vista actual de mapa y gráfico')
    },
    {
        selector: '#map-button',
        content: HelperComponent('Vista mapa', 'Al seleccionar esta opción podrás visualizar solo el mapa')
    },
]
    
export const general_data_steps_prices_int_pt = [
    {
        selector: '#graphs-button',
        content: HelperComponent('Visualização dos gráficos', 'A selecção desta opção permite-lhe esconder o mapa para exibir apenas os gráficos')
    },
    {
        selector: '#graphs-map-button',
        content: HelperComponent('Visualização mapa e gráficos', 'A selecção desta opção permite-lhe manter o mapa e a vista gráfica actuais.')
    },
    {
        selector: '#map-button',
        content: HelperComponent('Visualização do mapa', 'Seleccionando esta opção, pode visualizar apenas o mapa')
    },
]
