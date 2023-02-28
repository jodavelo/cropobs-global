import axios from 'axios';

const config = {
  url: 'https://restcountries.com/v3.1/all',
  params: {}
}

export const SetCountriesList = (setCountries: Function) => { 
    axios(config)
      .then(response => {
        const dataC = response.data.map((country: any) => country.name.common)
        const countries = dataC.sort() 
        setCountries(countries)
      })
}

