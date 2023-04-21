import { FC, useCallback, useState, useEffect} from "react"
import { Button } from "react-bootstrap"
import { utils,writeFileXLSX } from "xlsx"
import styles from './modal.module.css';
import {SetCountriesList} from '../../../helpers/data'
import {InputLabel, MenuItem, FormControl, TextField} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from "next/router";

interface Props {
    dataJson : Object[],
    setShowModal : Function
};

export const ModalForm: FC<Props> = ({dataJson, setShowModal}) => {
    console.log({ dataJson })
    const { locale } = useRouter();
    const exportFile = useCallback(() => {
        if (validateForm()){
            const ws = utils.json_to_sheet(dataJson);
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, "Data");
            writeFileXLSX(wb, "SheetJSReactAoO.xlsx");
            setShowModal(false)
        }
        
    }, [dataJson]);

    const validateForm = () => {
        const tfname =document.querySelector('#tf-name') as any
        const name = tfname.value
        const tfemail =document.querySelector('#tf-email') as any
        const email = tfemail.value
        const tfinst =document.querySelector('#tf-inst') as any
        const inst = tfinst.value
        //Validating Fields
        const re1 : RegExp = /^[A-Za-z\s]+$/
        const re2: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        
        /*if (re1.test(name)) {
            if (re2.test(email)) {
                if(re1.test(inst)) {
                    if(true) { 
                        return true
                    }
                    else {
                        alert('Selecciona un pais')
                    }
                }
                else{
                    setinstVal(false)
                }
            }
            else {
                setemailVal(false)
            }
        }
        else {
            setnameVal(false)
        }*/
        setnameVal(re1.test(name))
        setemailVal(re2.test(email))
        setinstVal(re1.test(inst))

        return re1.test(name) && re2.test(email) && re1.test(inst)

    }
    
    let [countries, setCountries] = useState([]);
    let [country, setCountry] = useState('');
    //VALIDATORS
    let [tfnameVal, setnameVal] = useState(true);
    let [tfemailVal, setemailVal] = useState(true);
    let [tfinstVal, setinstVal] = useState(true);

    const handleChange = (event: SelectChangeEvent) => {
        setCountry(event.target.value as string);
    };

    useEffect(() => {
        SetCountriesList(setCountries)
      }, []);
    
    const [title, setTitle] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [institution, setInstitution] = useState('');
    const [countriesText, setCountriesText] = useState('')
    useEffect(() => {
        switch ( locale ) {
            case 'en':
                setTitle('Please enter your name and email to proceed with downloading the data.');
                setFullName('Full name');
                setEmail('Email');
                setInstitution('Institution');
                setCountriesText('Countries');
                break;
            case 'es':
                setTitle('Por favor ingresa su nombre y un email para proceder a descargar los datos');
                setFullName('Nombre completo');
                setEmail('Correo electrónico');
                setInstitution('Institución');
                setCountriesText('Países');
                break;
        
            default:
                setTitle('Por favor, insira seu nome e e-mail para prosseguir com o download dos dados.');
                setFullName('Nome completo');
                setEmail('Email');
                setInstitution('Instituição');
                setCountriesText('Países');
                break;
        }
    
    }, [ locale ])
    
    
      return (
        <div className={styles["modal-container"]}>
            <div className={styles["modal-form"]}>
                <label className= {styles["modal-label"]}>{ title }</label><br/>
                <TextField error={!tfnameVal} className={styles["textfield"]} id="tf-name" label={ fullName } variant="standard" /><br/>
                <TextField error={!tfemailVal} className={styles["textfield"]} id="tf-email" label={ email } variant="standard" /><br/><br/>
                <FormControl fullWidth size="small">
                    <InputLabel id="label-countries-select">{ countriesText }</InputLabel>
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
                <TextField error={!tfinstVal} className={styles["textfield"]} id="tf-inst" label={ institution } variant="standard" /><br/><hr className={styles["modal-line"]}/>
                <div className={styles["modal-footer"]}>
                    <Button className={ styles.button } onClick={ () => setShowModal(false) }  variant="outline-secondary"> Close </Button>
                    <Button className={ styles.button } onClick={ exportFile } variant="secondary"> Submit </Button>
                </div>
            </div>
        </div>
        )
}