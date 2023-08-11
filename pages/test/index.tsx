import React from 'react'
import { MyTreeMap } from '../../components/data/treemap/TreeMapExample'

const iso3Code = 'CHN'

const Test = () => {
  return (
    <MyTreeMap dataUrl={`https://cropobs-central.ciat.cgiar.org/api/v1/chart/trade/treeMap/BEANS_TRADE_AUX/1/${ iso3Code }/3002/713999/2021`} iso3Code={ iso3Code } />
  )
}

export default Test