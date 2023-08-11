export interface sectionState {
    elementId: number
    regionCode: string
    macroRegionCode: string
    countryCode: string
    year: number
    admin: string
    locationName: string
}

export interface PodiumConfig {
    url: string
    text: string
    name: string
    description: string
    textFormatter?: Function
}

export interface ConfigChart {
    key: string
    name: string
}

export interface ChartConfig {
    dataURL: string
    options: Record<string, any>
    config: ConfigChart
    name: string
    elementsURL: string
    description: string
}