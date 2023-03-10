import axios from 'axios';

const config_prod = {
  url: process.env.NEXT_PUBLIC_CENTRAL_URL + 'WLRD',
  params: {
    "elementIds": JSON.stringify([5510]),
    "cropIds": JSON.stringify([176]),
  }
}
const config_harv = {
  url: process.env.NEXT_PUBLIC_CENTRAL_URL + 'WLRD',
  params: {
    "elementIds": JSON.stringify([5312]),
    "cropIds": JSON.stringify([176]),
  }
}
const config_yield = {
  url: process.env.NEXT_PUBLIC_CENTRAL_URL + 'WLRD',
  params: {
    "elementIds": JSON.stringify([1000]),
    "cropIds": JSON.stringify([176]),
  }
}

export const GetChartData = (setterLabels: Function,setterProd: Function,setterHarv: Function,setterYield: Function) => { 
    axios(config_prod)
      .then(response => {
        setterLabels(response.data.data.labels)
        setterProd(response.data.data.observations)
      })
      axios(config_harv)
      .then(response => {
        setterHarv(response.data.data.observations)
      })
      .catch(error => {
        console.log(error)
      })
    axios(config_yield)
      .then(response => {
        setterYield(response.data.data.observations)
      })
      .catch(error => {
        console.log(error)
      })
}

export const GenerateDataJson = (xLabels : number[], dataProd : number[], dataHarv : number[], dataYield : number[]) => {
  const data_json = xLabels.map(
    (elem, idx)=> ( 
        { 
            Year: elem, 
            Production: dataProd[idx], 
            Harvested_Area: dataHarv[idx], 
            Yield: dataYield[idx]
        } 
    )
  )
  return data_json
}

// ServerSideRendering ALTERNATIVE
/*
export const GetChartData = async () => {
  const data = {
    xLabels: [],
    dataProd: {},
    dataHarv: {},
    dataYield: {},
  }
  await axios(config_prod)
    .then(response => {
      data.xLabels = response.data.data.labels
      data.dataProd = response.data.data.observations
    })
  await axios(config_harv)
    .then(response => {
      data.dataHarv = response.data.data.observations
    })
    .catch(error => {
      console.log(error)
    })
  await axios(config_yield)
    .then(response => {
      data.dataYield = response.data.data.observations
    })
    .catch(error => {
      console.log(error)
    })
  return {
    xLabels: data.xLabels,
    prodJson: data.dataProd,
    harvJson: data.dataHarv,
    yieldJson: data.dataYield,
  }
}
*/