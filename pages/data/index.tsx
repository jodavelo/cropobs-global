import React, { useState } from 'react'
import { GetStaticProps, NextPage } from 'next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/layouts'
import { MainBar, MapView, SidebarComponent } from '../../components/ui';
import { v4 as uuidv4 } from 'uuid';

import styles from './data.module.css';
import { DataPodium, PlotlyChartStackedArea, Podium, ToggleDescription } from '../../components/data';
import { PercentContainer } from '../../components/data/percent-info';
import { buildPlotStackedAreaObject, getYearsPlotlyChart } from '../../helpers/data';
import { Percent } from '@mui/icons-material';
import { TabComponent } from '../../components/data/tabs';

const data: DataPodium[] = [
    {
        rank: 3,
        cropName: 'Crop 3', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '65%',
        heightTransparentBar: '35%',
        color:  'rgb(181, 181, 181)',
    },
    {
        rank: 1,
        cropName: 'Crop 1', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '100%',
        heightTransparentBar: '0%',
        color:  'rgb(181, 181, 181)',
    },
    
    {
        rank: 2,
        cropName: 'Crop 2', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '80%',
        heightTransparentBar: '20%',
        color:  'rgb(181, 181, 181)',
    }, 
    {
        rank: 4,
        cropName: 'Crop 4', 
        urlIcon: 'https://commonbeanobservatorytst.ciat.cgiar.org/images/icons/100px/icon-crops-4.png',
        heightBar: '40%',
        heightTransparentBar: '60%',
        color:  'rgb(181, 181, 181)',
    }
]



const datax = {
    "data": {
      "iso3": "WLRD",
      "id_element": 5312,
      "country_name": "None",
      "section": 2,
      "variable": "Area harvested",
      "labels": [
        1961,
        1962,
        1963,
        1964,
        1965,
        1966,
        1967,
        1968,
        1969,
        1970,
        1971,
        1972,
        1973,
        1974,
        1975,
        1976,
        1977,
        1978,
        1979,
        1980,
        1981,
        1982,
        1983,
        1984,
        1985,
        1986,
        1987,
        1988,
        1989,
        1990,
        1991,
        1992,
        1993,
        1994,
        1995,
        1996,
        1997,
        1998,
        1999,
        2000,
        2001,
        2002,
        2003,
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021
      ],
      "observations": [
        {
          "value": 22652818,
          "year": 1961,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7547291,
          "year": 1961,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 2410732,
          "year": 1961,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1946270,
          "year": 1961,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1088851,
          "year": 1961,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23395097,
          "year": 1962,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 10330424,
          "year": 1962,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 2759787,
          "year": 1962,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 2219165,
          "year": 1962,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1380848,
          "year": 1962,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23741059,
          "year": 1963,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 13379735,
          "year": 1963,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 3983166,
          "year": 1963,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 2014327,
          "year": 1963,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1651246,
          "year": 1963,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 24657407,
          "year": 1964,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 13193393,
          "year": 1964,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 3887777,
          "year": 1964,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1943769,
          "year": 1964,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1398397,
          "year": 1964,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 24256450,
          "year": 1965,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 9892851,
          "year": 1965,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4030633,
          "year": 1965,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1806121,
          "year": 1965,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1069978,
          "year": 1965,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23684470,
          "year": 1966,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8820481,
          "year": 1966,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4505191,
          "year": 1966,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1765259,
          "year": 1966,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1107436,
          "year": 1966,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23819421,
          "year": 1967,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8382317,
          "year": 1967,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 5519355,
          "year": 1967,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1704316,
          "year": 1967,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1026013,
          "year": 1967,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23230287,
          "year": 1968,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7949291,
          "year": 1968,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4958569,
          "year": 1968,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1515725,
          "year": 1968,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 990104,
          "year": 1968,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 22802960,
          "year": 1969,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7927620,
          "year": 1969,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 5874158,
          "year": 1969,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1550571,
          "year": 1969,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 943157,
          "year": 1969,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23243468,
          "year": 1970,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7784095,
          "year": 1970,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 5624237,
          "year": 1970,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1497035,
          "year": 1970,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 980702,
          "year": 1970,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23169032,
          "year": 1971,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7774740,
          "year": 1971,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 5546883,
          "year": 1971,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1342275,
          "year": 1971,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 759543,
          "year": 1971,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 22684341,
          "year": 1972,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8097180,
          "year": 1972,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4190065,
          "year": 1972,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1494396,
          "year": 1972,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 832286,
          "year": 1972,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23805691,
          "year": 1973,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8291627,
          "year": 1973,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4829620,
          "year": 1973,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1467359,
          "year": 1973,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 770794,
          "year": 1973,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23787691,
          "year": 1974,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8126812,
          "year": 1974,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4695457,
          "year": 1974,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1359009,
          "year": 1974,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 758778,
          "year": 1974,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 24330462,
          "year": 1975,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7779267,
          "year": 1975,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4769526,
          "year": 1975,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1400039,
          "year": 1975,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 696336,
          "year": 1975,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23217721,
          "year": 1976,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7598548,
          "year": 1976,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4493121,
          "year": 1976,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1162556,
          "year": 1976,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 612969,
          "year": 1976,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 24203124,
          "year": 1977,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7654228,
          "year": 1977,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 3202992,
          "year": 1977,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1194698,
          "year": 1977,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 565647,
          "year": 1977,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 24320293,
          "year": 1978,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7194347,
          "year": 1978,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 3360521,
          "year": 1978,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1090165,
          "year": 1978,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 497117,
          "year": 1978,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 22996840,
          "year": 1979,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7423662,
          "year": 1979,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 3299769,
          "year": 1979,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 862904,
          "year": 1979,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 497316,
          "year": 1979,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 25392767,
          "year": 1980,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7042682,
          "year": 1980,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 3473251,
          "year": 1980,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 807375,
          "year": 1980,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 515483,
          "year": 1980,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26335396,
          "year": 1981,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7847268,
          "year": 1981,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 3390881,
          "year": 1981,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 855220,
          "year": 1981,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 558693,
          "year": 1981,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26108856,
          "year": 1982,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7429926,
          "year": 1982,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 3871232,
          "year": 1982,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 804277,
          "year": 1982,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 653351,
          "year": 1982,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 25090078,
          "year": 1983,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8309053,
          "year": 1983,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 3675530,
          "year": 1983,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 983578,
          "year": 1983,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 842197,
          "year": 1983,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26209330,
          "year": 1984,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8904928,
          "year": 1984,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 3660273,
          "year": 1984,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1079266,
          "year": 1984,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1062245,
          "year": 1984,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26267031,
          "year": 1985,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8981500,
          "year": 1985,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4224099,
          "year": 1985,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1099696,
          "year": 1985,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 993756,
          "year": 1985,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26374339,
          "year": 1986,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 9398431,
          "year": 1986,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4283068,
          "year": 1986,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1198627,
          "year": 1986,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1127148,
          "year": 1986,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 25401983,
          "year": 1987,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 9739208,
          "year": 1987,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4449347,
          "year": 1987,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1138337,
          "year": 1987,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1354634,
          "year": 1987,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26630361,
          "year": 1988,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 9810808,
          "year": 1988,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 4873552,
          "year": 1988,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1045198,
          "year": 1988,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1174807,
          "year": 1988,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26001016,
          "year": 1989,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 9245432,
          "year": 1989,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 5189835,
          "year": 1989,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1094299,
          "year": 1989,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1166088,
          "year": 1989,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26375983,
          "year": 1990,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8701461,
          "year": 1990,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 5665646,
          "year": 1990,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1008142,
          "year": 1990,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1043460,
          "year": 1990,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 27250315,
          "year": 1991,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8040487,
          "year": 1991,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6268237,
          "year": 1991,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 911531,
          "year": 1991,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1099790,
          "year": 1991,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 25272265,
          "year": 1992,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7166978,
          "year": 1992,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8537676,
          "year": 1992,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 774820,
          "year": 1992,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1170473,
          "year": 1992,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 24458832,
          "year": 1993,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7390849,
          "year": 1993,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8337045,
          "year": 1993,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 663079,
          "year": 1993,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1261033,
          "year": 1993,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26453271,
          "year": 1994,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7645319,
          "year": 1994,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7401267,
          "year": 1994,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 669762,
          "year": 1994,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1529323,
          "year": 1994,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 25754773,
          "year": 1995,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7127237,
          "year": 1995,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8498197,
          "year": 1995,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 821337,
          "year": 1995,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1451942,
          "year": 1995,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 25610394,
          "year": 1996,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6367772,
          "year": 1996,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8778925,
          "year": 1996,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 963396,
          "year": 1996,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1384887,
          "year": 1996,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 25331053,
          "year": 1997,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6488847,
          "year": 1997,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8797742,
          "year": 1997,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 799733,
          "year": 1997,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1556317,
          "year": 1997,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 24104056,
          "year": 1998,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6515675,
          "year": 1998,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 10340651,
          "year": 1998,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 797981,
          "year": 1998,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1531629,
          "year": 1998,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23513147,
          "year": 1999,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 5932408,
          "year": 1999,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 9205492,
          "year": 1999,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 805993,
          "year": 1999,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1482732,
          "year": 1999,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23650985,
          "year": 2000,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6004731,
          "year": 2000,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8930208,
          "year": 2000,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 719199,
          "year": 2000,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1319813,
          "year": 2000,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 23788674,
          "year": 2001,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6890654,
          "year": 2001,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 9202706,
          "year": 2001,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 689414,
          "year": 2001,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1290989,
          "year": 2001,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 27484499,
          "year": 2002,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 5999735,
          "year": 2002,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 9912454,
          "year": 2002,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 692619,
          "year": 2002,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1171329,
          "year": 2002,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 28342829,
          "year": 2003,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6127349,
          "year": 2003,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 10434455,
          "year": 2003,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 829649,
          "year": 2003,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1063437,
          "year": 2003,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 27149199,
          "year": 2004,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6325808,
          "year": 2004,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 9157179,
          "year": 2004,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 786476,
          "year": 2004,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1072419,
          "year": 2004,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26650138,
          "year": 2005,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6529678,
          "year": 2005,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 10377213,
          "year": 2005,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 748251,
          "year": 2005,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1023579,
          "year": 2005,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 27750570,
          "year": 2006,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6341391,
          "year": 2006,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 11291425,
          "year": 2006,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 673841,
          "year": 2006,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1003356,
          "year": 2006,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 29371882,
          "year": 2007,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6235548,
          "year": 2007,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 11711117,
          "year": 2007,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 565719,
          "year": 2007,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1006432,
          "year": 2007,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 26805034,
          "year": 2008,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6057949,
          "year": 2008,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 12622531,
          "year": 2008,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 539068,
          "year": 2008,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 801647,
          "year": 2008,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 25601025,
          "year": 2009,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6401032,
          "year": 2009,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 9472475,
          "year": 2009,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 398403,
          "year": 2009,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 936358,
          "year": 2009,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 30886440,
          "year": 2010,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6601981,
          "year": 2010,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 11602095,
          "year": 2010,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 409069,
          "year": 2010,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1084333,
          "year": 2010,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 30588530,
          "year": 2011,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6178287,
          "year": 2011,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 10703137,
          "year": 2011,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 511885,
          "year": 2011,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 964543,
          "year": 2011,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 29280924,
          "year": 2012,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6715480,
          "year": 2012,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 11545605,
          "year": 2012,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 566388,
          "year": 2012,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 719165,
          "year": 2012,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 29518641,
          "year": 2013,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6414768,
          "year": 2013,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 12417341,
          "year": 2013,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 469551,
          "year": 2013,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 664541,
          "year": 2013,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 30724020,
          "year": 2014,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6806442,
          "year": 2014,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 12766226,
          "year": 2014,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 501342,
          "year": 2014,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 707357,
          "year": 2014,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 31389520,
          "year": 2015,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 6899131,
          "year": 2015,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 12123511,
          "year": 2015,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 511886,
          "year": 2015,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 935406,
          "year": 2015,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 35214378,
          "year": 2016,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7448842,
          "year": 2016,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 13730699,
          "year": 2016,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 492849,
          "year": 2016,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 978556,
          "year": 2016,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 36870470,
          "year": 2017,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 8059673,
          "year": 2017,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 14480799,
          "year": 2017,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 534856,
          "year": 2017,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 927307,
          "year": 2017,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 36133947,
          "year": 2018,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7448608,
          "year": 2018,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 14262214,
          "year": 2018,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 334888,
          "year": 2018,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 981971,
          "year": 2018,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 33593630,
          "year": 2019,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7136498,
          "year": 2019,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 14250038,
          "year": 2019,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 347839,
          "year": 2019,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 1049090,
          "year": 2019,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 34698604,
          "year": 2020,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7189890,
          "year": 2020,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 15056435,
          "year": 2020,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 352206,
          "year": 2020,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 888507,
          "year": 2020,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 35812867,
          "year": 2021,
          "id_crop": 176,
          "crop_name": "Beans, dry",
          "crop_name_es": "Frijoles, secos",
          "crop_name_pt": "Feijão, seco",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 7042926,
          "year": 2021,
          "id_crop": 187,
          "crop_name": "Peas, dry",
          "crop_name_es": "Guisantes, secos",
          "crop_name_pt": "Ervilhas, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 14911307,
          "year": 2021,
          "id_crop": 195,
          "crop_name": "Cow peas, dry",
          "crop_name_es": "Caupis, secos",
          "crop_name_pt": "Ervilhas de vaca, secas",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 332103,
          "year": 2021,
          "id_crop": 205,
          "crop_name": "Vetches",
          "crop_name_es": "Veza",
          "crop_name_pt": "Vetches",
          "id_element": 5312,
          "unit": "ha"
        },
        {
          "value": 984192,
          "year": 2021,
          "id_crop": 210,
          "crop_name": "Lupins",
          "crop_name_es": "Altramuz",
          "crop_name_pt": "Tremoços",
          "id_element": 5312,
          "unit": "ha"
        }
      ]
    }
  }

const DataPage: NextPage = () => {

    const { t: dataTranslate } = useTranslation('data');
    // const [open, setOpen] = useState(false);
    // const [open2, setOpen2] = useState(false);
    const { labels, observations } = datax.data;
    // buildPlotStackedAreaObject(observations, labels);
    console.log(datax.data)
    
    const [open, setOpen] = useState(false);

    return (
        <Layout title={ dataTranslate('title-header') }>
            <Container fluid>
                <Row>
                  <Button className={styles["toggle-dropdown"]}   onClick={() => setOpen(!open)} aria-controls="collapse-button" aria-expanded={open}>
                    <svg viewBox="0 0 448 512" width="100">
                    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                    </svg>
                  </Button>
                   <Col xs={ 12 } lg={ 3 } xl={ 2 } style={{width: open ? "60px" : ""}}   className={styles["sidebar"]}  id="collapse-button">
                        <SidebarComponent />
                    </Col>
                    <Col xs={ 12 } lg={ 9 } xl={ 10 } className={ styles['content-data'] }>
                        <Container fluid className={ `${ styles['content-data'] } ${ styles['no-padding'] }` } >
                            <Row>
                                <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <TabComponent></TabComponent>
                                </Col>

                                {/* <Col xs={ 12 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <MainBar key={ uuidv4() } section='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis quas quis quae accusantium vel' />
                                </Col>
                                <Col xs={ 12 } xl={ 6 } className={ `${ styles['no-margin'] } ${ styles['no-padding'] }` }>
                                    <MapView/>
                                </Col>
                                <Col xs={ 12 } xl={ 6 } style={{ height: '80vh', border: '1px black solid' }}>
                                  <Podium data={ data }></Podium>
                                  <PercentContainer ></PercentContainer>
                                </Col> */}
                                    {/* <Podium data={ data }/> */}
                                    {/* <Button onClick={ () => setOpen(!open) } >Ok</Button>
                                    <ToggleDescription isOpen={ open } text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, massa nec auctor aliquet, urna ex tristique ante, ac tempus quam dui et metus. Proin finibus venenatis nisl, ut egestas dui consequat id. Fusce consequat hendrerit ornare. Aliquam id imperdiet libero. Cras sodales blandit urna ac pellentesque. Nullam venenatis neque nibh, sit amet commodo mauris tincidunt nec. Curabitur maximus a nisl a pretium. Proin iaculis, erat id rhoncus pulvinar,' /> */}
                                    {/* <PlotlyChartStackedArea/> */}
                                    {/* <Button onClick={ () => setOpen2(!open2) } >Ok</Button>
                                    <ToggleDescription isOpen={ open2 } text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus, massa nec auctor aliquet, urna ex tristique ante, ac tempus quam dui et metus. Proin finibus venenatis nisl, ut egestas dui consequat id. Fusce consequat hendrerit ornare. Aliquam id imperdiet libero. Cras sodales blandit urna ac pellentesque. Nullam venenatis neque nibh, sit amet commodo mauris tincidunt nec. Curabitur maximus a nisl a pretium. Proin iaculis, erat id rhoncus pulvinar,' /> */}
                            </Row>
                            
                        </Container>
                    </Col>
                </Row>
            </Container>
            
            {/* <h1>{ dataTranslate('title-page') }</h1> */}   
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            // ...( await serverSideTranslations( locale!, ['common'] ) ),
            ...( await serverSideTranslations( locale!, ['data'] ) )
        }
    }
}

export default DataPage