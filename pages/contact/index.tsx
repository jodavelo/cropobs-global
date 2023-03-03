
import {Box, TextField, FormControl, InputLabel, MenuItem, Button} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Mail from '@mui/icons-material/Mail';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Layout } from '../../components/layouts'
import styles from './contact.module.css';
import {SetCountriesList} from '../../helpers/data'

const cards = [
    {
        logo: <HomeIcon fontSize="large" sx={{marginBottom: "7px"}}/>,
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '],
        color: 'black' 
    },
    {
        logo: <FmdGoodIcon fontSize="large" sx={{marginBottom: "7px"}}/>,
        text: ['Lorem Ipsum'],
        color: 'gray' 
    },
    {
        logo: <LocalPhoneIcon fontSize="large" sx={{marginBottom: "7px"}}/>,
        text: ['Lorem ipsum dolor sit amet',', consectetur adipiscing elit'],//each array element is a line
        color: 'darkgray' 
    },
    {
        logo: <Mail fontSize="large" sx={{marginBottom: "7px"}}/>,
        text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit'],
        color: 'darkgray' 
    },
    
]

const ContactPage: NextPage = () => {

    let [countries, setCountries] = useState([]);
    let [country, setCountry] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCountry(event.target.value as string);
    };

    useEffect(() => {
        SetCountriesList(setCountries)
      }, []);

    return(
        <Layout title="Contact">
            <div className={styles['contact-container']}>
                <h2> Contact Us! </h2>
                <div className={styles['contact-cards']}>
                    {cards.map((elem,idx)=> (
                        <div className={styles["contact-card"]} key={idx} style={{backgroundColor: elem.color}}>
                            <div className={styles["card-body"]}>
                                {elem.logo}
                                {elem.text.map((txt,idx)=>(<div key={idx} style={{textAlign: 'center'}}>{txt}</div>))}
                            </div>
                        </div>))
                    }
                </div>
                <div className={styles['contact-form']}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <FormControl fullWidth><TextField id="input-name" label="Full Name" variant="standard" required /></FormControl>
                    </Box><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Mail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <FormControl fullWidth><TextField id="input-email" label="Email" variant="standard" required /></FormControl>
                    </Box><br/><br/>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="label-countries-select">Countries</InputLabel>
                        <Select
                            labelId="label-countries-select"
                            id="countries-select"
                            value={country}
                            label="Countries"
                            onChange={handleChange}
                            className= {styles['countries-select']}
                        >
                            {countries.map((elem,idx)=> (<MenuItem value={elem} key={idx} >{elem}</MenuItem>) )}
                        </Select>
                    </FormControl><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <ApartmentIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <FormControl fullWidth><TextField id="input-inst" label="Institute" variant="standard" /></FormControl>
                    </Box><br/>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <CreateIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <FormControl fullWidth><TextField id="input-subj" label="Subject" variant="standard" required/></FormControl>
                    </Box><br/><br/>
                    <TextField
                        id="filled-multiline-static"
                        label="Message"
                        multiline
                        required
                        rows={4}
                        defaultValue=""
                        variant="outlined"
                    /><br/>
                    <Button className={ styles.button } onClick={ ()=>true } variant="contained" color="warning"> Send </Button>
                </div>
            </div>
        </Layout>
    )
}

export default ContactPage