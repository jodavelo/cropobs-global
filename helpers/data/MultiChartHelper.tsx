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

const config_data1 = {
  url: 'https://commonbeanobservatory.org/api/v1/chart/default/beans_production_value/WLRD',
  params: {
    "elementIds": JSON.stringify([152]),
    "cropIds": JSON.stringify([176]),//beans
  }
}
const config_data2 = {
  url: 'https://commonbeanobservatory.org/api/v1/chart/default/beans_production_value/WLRD',
  params: {
    "elementIds": JSON.stringify([152]),
    "cropIds": JSON.stringify([96001]),//pulses
  }
}
const config_data3 = {
  url: 'https://commonbeanobservatory.org/api/v1/chart/default/beans_production_value/WLRD',
  params: {
    "elementIds": JSON.stringify([152]),
    "cropIds": JSON.stringify([998]),//crops
  }
}
const config_data4 = {
  url: 'https://commonbeanobservatory.org/api/v1/chart/default/beans_production_value/WLRD',
  params: {
    "elementIds": JSON.stringify([152]),
    "cropIds": JSON.stringify([2051]),//agric
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

export const GetChartData2 = (setterLabels: Function,setterdata1: Function,setterdata2: Function,setterdata3: Function, setterdata4: Function) => { 
  axios(config_data1)
    .then(response => {
      setterLabels(response.data.data.labels)
      setterdata1(response.data.data.observations)
    })
    axios(config_data2)
    .then(response => {
      setterdata2(response.data.data.observations)
    })
    .catch(error => {
      console.log(error)
    })
  axios(config_data3)
    .then(response => {
      setterdata3(response.data.data.observations)
    })
    .catch(error => {
      console.log(error)
    })
  axios(config_data4)
    .then(response => {
      setterdata4(response.data.data.observations)
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

export const GenerateDataJson2 = (xLabels : number[], data1 : number[], data2 : number[], data3 : number[], data4 : number[]) => {
  const data_json = xLabels.map(
    (elem, idx)=> ( 
        { 
            Year: elem, 
            Beans: data1[idx], 
            Pulses: data2[idx], 
            Agriculture: data4[idx],
            Crops: data3[idx]
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