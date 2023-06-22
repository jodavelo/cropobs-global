
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
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";


const ContactPage: NextPage = () => {

    let [countries, setCountries] = useState([]);
    let [country, setCountry] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCountry(event.target.value as string);
    };

    useEffect(() => {
        SetCountriesList(setCountries)
      }, []);

    const { locale } = useRouter();

    const contact_text=[
        {
            text: 'Contact Us!',
            text_es: '¡Contáctanos!',
            text_pt: 'Contate-nos!',
        },
        {
            text: '| Alliance Bioversity International and the International Center for Tropical Agriculture (CIAT) |',
            text_es: 'Alianza Bioversity International y el Centro Internacional de Agricultura Tropical (CIAT) |',
            text_pt: 'Aliança Bioversity International e O Centro Internacional para a Agricultura Tropical (CIAT) |',
        },
        {
            text: '| Headquarters for the Americas |',
            text_es: '| Sede de las Américas |',
            text_pt: '| Campus das Americas |',
        },
        {
            text: 'Full Name',
            text_es: 'Nombre Completo',
            text_pt: 'Nome completo',
        },
        {
            text: 'Email',
            text_es: 'Correo Electrónico',
            text_pt: 'Email',
        },
        {
            text: 'Countries',
            text_es: 'Países',
            text_pt: 'Países',
        },
        {
            text: 'Institute',
            text_es: 'Instituto',
            text_pt: 'Instituto',
        },
        {
            text: 'Subject',
            text_es: 'Asunto',
            text_pt: 'Assunto',
        },
        {
            text: 'Message',
            text_es: 'Mensaje',
            text_pt: 'Mensagem',
        },
        {
            text: 'Send',
            text_es: 'Enviar',
            text_pt: 'Enviar',
        },
        {
            text: '',
            text_es: '',
            text_pt: '',
        },
    ]

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

    useEffect(() => {
        SetCountriesList(setCountries)
      }, []);


    

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [countryForm, setCountryForm] = useState("");
    const [institution, setInstitution] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [observatory, setObservatory] = useState('general');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(captchaValue === "") {
            // Mostrar un mensaje de error al usuario indicando que necesita resolver el reCAPTCHA
            toast.error("Please verify the reCAPTCHA", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            return;
        }

        const response = await fetch('http://cropobscentral.test/contact', { // TODO: Set this url when it's running in a dev server or test server or production server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, country: country, institution, subject, message, observatory, recaptcha: captchaValue  }),
        });

        if (response.ok) {
            setName('');
            setEmail('');
            setCountry('');
            setInstitution('');
            setSubject('');
            setMessage('');
            // Mostrar notificación toast
            toast.success("Message sent successfully", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        } else {
            // Mostrar error toast
            toast.error("Error sending message", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    };
    const key = "6LcPXqQmAAAAAPGyiN4GKNLGkhwUjSSGkgUeBZ8g";

    
    // For to manage recaptcha
    const [captchaIsDone, setCaptchaIsDone] = useState(false);
    const [captchaValue, setCaptchaValue] = useState<string | null>("");

    const onChange = (value: string | null) => {
        console.log('changed');
        setCaptchaIsDone(true);
        //console.log('reCAPTCHA value:', value);
        setCaptchaValue(value);
    }

    

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
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <FormControl fullWidth>
                                <TextField 
                                    id="input-name" 
                                    label={locale == 'en' ? contact_text[3].text : ( locale == 'es' ? contact_text[3].text_es : contact_text[3].text_pt )} 
                                    variant="standard" 
                                    required
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                        </Box><br/>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Mail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <FormControl 
                                fullWidth
                            >
                                <TextField 
                                    id="input-email" 
                                    label={locale == 'en' ? contact_text[4].text : ( locale == 'es' ? contact_text[4].text_es : contact_text[4].text_pt )} 
                                    variant="standard" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                        </Box><br/><br/>
                        <FormControl size="small" fullWidth>
                            <InputLabel 
                                id="label-countries-select"
                            >{locale == 'en' ? contact_text[5].text : ( locale == 'es' ? contact_text[5].text_es : contact_text[5].text_pt )}</InputLabel>
                            <Select
                                labelId="label-countries-select"
                                id="countries-select"
                                value={country}
                                label= "Countries"
                                onChange={handleChange}
                                className= {styles['countries-select']}
                            >
                                {countries.map((elem,idx)=> (<MenuItem value={elem} key={idx} >{elem}</MenuItem>) )}
                            </Select>
                        </FormControl><br/>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <ApartmentIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl 
                                    fullWidth
                                >
                                    <TextField 
                                        id="input-inst" 
                                        label={locale == 'en' ? contact_text[6].text : ( locale == 'es' ? contact_text[6].text_es : contact_text[6].text_pt )}
                                        variant="standard" 
                                        value={ institution }
                                        onChange={ (e) => setInstitution(e.target.value) }
                                    />
                                </FormControl>
                        </Box><br/>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <CreateIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <FormControl fullWidth>
                                <TextField 
                                    id="input-subj" 
                                    label={locale == 'en' ? contact_text[7].text : ( locale == 'es' ? contact_text[7].text_es : contact_text[7].text_pt )} 
                                    variant="standard" 
                                    required
                                    value={ subject }
                                    onChange={ (e) => setSubject(e.target.value) }
                                />
                            </FormControl>
                        </Box><br/><br/>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <CreateIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <FormControl fullWidth>
                            <TextField
                                id="filled-multiline-static"
                                label={locale == 'en' ? contact_text[8].text : ( locale == 'es' ? contact_text[8].text_es : contact_text[8].text_pt )}
                                multiline
                                required
                                rows={4}
                                defaultValue=""
                                variant="outlined"
                                value={ message }
                                onChange={ (e) => setMessage(e.target.value) }
                            />
                            </FormControl>
                        </Box><br/><br/>
                        <ReCAPTCHA
                            sitekey={ key }
                            onChange={onChange}
                        />
                        <Button className={ styles.button } type="submit" variant="contained" color="warning"> {locale == 'en' ? contact_text[9].text : ( locale == 'es' ? contact_text[9].text_es : contact_text[9].text_pt )} </Button>
                    
                    </form>
                    
                </div>
            </div>
        </Layout>
    )
}

export default ContactPage