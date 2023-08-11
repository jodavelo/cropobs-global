function HelperComponent(title: string, text: string) {
    return (
        <div>
            <h4>{ title }</h4>
            <p>{ text }</p>
        </div>
    )
}

export const general_data_steps = [
    {
        selector: '#element-filter',
        content: HelperComponent('Element', 'Select the variable of interest whose distribution you wish to visualize on the map.')
    },
    {
        selector: '#year-filter',
        content: HelperComponent('Year', 'Now select the year of interest.')
    },
    {
        selector: '#macro-region-filter',
        content: HelperComponent('Region', 'As well as the region for which you wish to limit the display. You can select from the full list of countries by selecting the "World" option, or explore other ways to categorize groups of countries.')
    },
    {
        selector: '#search-country-button',
        content: HelperComponent('Country', 'Once you have selected the region of interest, here you can browse the list of countries contained in the region of interest.')
    },
    {
        selector: '#graphs-button',
        content: HelperComponent('Chart view','By selecting this option you will be able to hide the map to display only graphics.')
    },
    {
        selector: '#graphs-map-button',
        content: HelperComponent('Chart and map view', 'By selecting this option you will be able to keep the current map and chart view.')
    },
    {
        selector: '#map-button',
        content: HelperComponent('Map view', 'By selecting this option you will be able to view only the map.')
    },
    {
        selector: '#btn-collapse-sidebar',
        content: HelperComponent('Hide menu', 'By pressing this arrow you can hide sections menu.')
    },
]

export const general_data_steps_mobile = [
    {
        selector: '#element-filter',
        content: HelperComponent('Element', 'Select the variable of interest whose distribution you wish to visualize on the map.')
    },
    {
        selector: '#year-filter',
        content: HelperComponent('Year', 'Now select the year of interest.')
    },
    {
        selector: '#macro-region-filter',
        content: HelperComponent('Region', 'As well as the region for which you wish to limit the display. You can select from the full list of countries by selecting the "World" option, or explore other ways to categorize groups of countries.')
    },
    {
        selector: '#search-country-button',
        content: HelperComponent('Country', 'Once you have selected the region of interest, here you can browse the list of countries contained in the region of interest.')
    }
]

export const general_data_steps_es = [
    {
        selector: '#element-filter',
        content: HelperComponent('Elemento', 'Selecciona la variable de interés cuya distribución deseas visualizar en el mapa')
    },
    {
        selector: '#year-filter',
        content: HelperComponent('Año', 'Ahora selecciona el año de interés')
    },
    {
        selector: '#macro-region-filter',
        content: HelperComponent('Región', 'Además de la región para la cual deseas limitar la visualización. Podrás seleccionar de la lista completa de países al elegir la opción "Mundo", o explorar otras formas de categorizar grupos de países')
    },
    {
        selector: '#search-country-button',
        content: HelperComponent('País', 'Una vez seleccionada la región de interés, aquí podrás explorar la lista de países contenidos en la región de interés.')
    },
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
    {
        selector: '#btn-collapse-sidebar',
        content: HelperComponent('Esconder menú', 'Al presionar esta flecha podrás ocultar el menú de secciones.')
    },
]

export const general_data_steps_es_mobile = [
    {
        selector: '#element-filter',
        content: HelperComponent('Elemento', 'Selecciona la variable de interés cuya distribución deseas visualizar en el mapa')
    },
    {
        selector: '#year-filter',
        content: HelperComponent('Año', 'Ahora selecciona el año de interés')
    },
    {
        selector: '#macro-region-filter',
        content: HelperComponent('Región', 'Además de la región para la cual deseas limitar la visualización. Podrás seleccionar de la lista completa de países al elegir la opción "Mundo", o explorar otras formas de categorizar grupos de países')
    },
    {
        selector: '#search-country-button',
        content: HelperComponent('País', 'Una vez seleccionada la región de interés, aquí podrás explorar la lista de países contenidos en la región de interés.')
    }
]


export const general_data_steps_pt = [
    {
        selector: '#element-filter',
        content: HelperComponent('Elemento', 'Selecione a variável de interesse cuja distribuição você deseja visualizar no mapa.')
    },
    {
        selector: '#year-filter',
        content: HelperComponent('Ano', 'Agora seleccione o ano de interesse')
    },
    {
        selector: '#macro-region-filter',
        content: HelperComponent('Região', 'Bem como a região para a qual se pretende limitar a exposição. Pode seleccionar a partir da lista completa de países escolhendo a opção "Mundo", ou explorar outras formas de categorização de grupos de países.')
    },
    {
        selector: '#search-country-button',
        content: HelperComponent('País', 'Uma vez seleccionada a região de interesse, aqui pode consultar a lista de países contidos na região de interesse.')
    },
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
    {
        selector: '#btn-collapse-sidebar',
        content: HelperComponent('Ocultar menu', 'Ao premir esta seta, pode esconder o menu de secções.')
    },
]

export const general_data_steps_pt_mobile = [
    {
        selector: '#element-filter',
        content: HelperComponent('Elemento', 'Selecione a variável de interesse cuja distribuição você deseja visualizar no mapa.')
    },
    {
        selector: '#year-filter',
        content: HelperComponent('Ano', 'Agora seleccione o ano de interesse')
    },
    {
        selector: '#macro-region-filter',
        content: HelperComponent('Região', 'Bem como a região para a qual se pretende limitar a exposição. Pode seleccionar a partir da lista completa de países escolhendo a opção "Mundo", ou explorar outras formas de categorização de grupos de países.')
    },
    {
        selector: '#search-country-button',
        content: HelperComponent('País', 'Uma vez seleccionada a região de interesse, aqui pode consultar a lista de países contidos na região de interesse.')
    }
]