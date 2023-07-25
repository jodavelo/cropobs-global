import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const idCrop = process.env.NEXT_PUBLIC_ID_CROP;
const cropName = process.env.NEXT_PUBLIC_CROP_NAME;
const idGroup = process.env.NEXT_PUBLIC_ID_GROUP;
const idIndicators = process.env.NEXT_PUBLIC_ID_INDICATORS;

const config_prod = {
  url: process.env.NEXT_PUBLIC_CENTRAL_URL + 'WLRD',
  params: {
    "elementIds": JSON.stringify([5510]),
    "cropIds": JSON.stringify([idCrop]),
  }
}
const config_harv = {
  url: process.env.NEXT_PUBLIC_CENTRAL_URL + 'WLRD',
  params: {
    "elementIds": JSON.stringify([5312]),
    "cropIds": JSON.stringify([idCrop]),
  }
}
const config_yield = {
  url: process.env.NEXT_PUBLIC_CENTRAL_URL + 'WLRD',
  params: {
    "elementIds": JSON.stringify([1000]),
    "cropIds": JSON.stringify([idCrop]),
  }
}

const setConfigData = (countryCode: string, elementId: string) => {
  return [
    {
      url: `${ baseURL }/api/v1/chart/default/${ cropName }_production_value/${countryCode}`,
      params: {
        "elementIds": JSON.stringify([elementId]),
        "cropIds": JSON.stringify([idCrop]),//crop
      }
    },
    {
      url: `${ baseURL }/api/v1/chart/default/${ cropName }_production_value/${countryCode}`,
      params: {
        "elementIds": JSON.stringify([elementId]),
        "cropIds": JSON.stringify([idGroup]),//group
      }
    },
    {
      url: `${ baseURL }/api/v1/chart/default/${ cropName }_production_value/${countryCode}`,
      params: {
        "elementIds": JSON.stringify([elementId]),
        "cropIds": JSON.stringify([998]),//crops
      }
    },
    {
      url: `${ baseURL }/api/v1/chart/default/${ cropName }_production_value/${countryCode}`,
      params: {
        "elementIds": JSON.stringify([elementId]),
        "cropIds": JSON.stringify([2051]),//agric
      }
    }
  ]
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

export const GetChartData2 = (setterLabels: Function,setterdata1: Function,setterdata2: Function,setterdata3: Function, setterdata4: Function, countryCode: string, elementId: string) => {
  const configData = setConfigData(countryCode, elementId);
  axios(configData[0])
    .then(response => {
      setterLabels(response.data.data.labels)
      setterdata1(response.data.data.observations.map((datum: any) => datum.value))
    })
    axios(configData[1])
    .then(response => {
      setterdata2(response.data.data.observations.map((datum: any) => datum.value))
    })
    .catch(error => {
      console.log(error)
    })
  axios(configData[2])
    .then(response => {
      setterdata3(response.data.data.observations.map((datum: any) => datum.value))
    })
    .catch(error => {
      console.log(error)
    })
  axios(configData[3])
    .then(response => {
      setterdata4(response.data.data.observations.map((datum: any) => datum.value))
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

interface DataDocument {
  label : string,
  values: number[] 
}

export const GenerateDataJsonGeneric = (data : DataDocument[]) => {
  console.log(data)
  const dataJson = Array<Object>(0)
  const labels = data.map(e => e.label)
  if(data.length > 0) {
    data[0].values.forEach((elem, idxValue)=>{
      const row = Object();
      labels.forEach((label,idxCol) => { 
        if(data[idxCol].values.hasOwnProperty("data")) {
          //TODO: find a way that a property can be an object or array   
          //@ts-ignore 
          return row[label] = data[idxCol].values.data[idxValue]
        }
        return row[label] = data[idxCol].values[idxValue]      
      })
      dataJson.push(row)
    })
  }
  return dataJson  
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