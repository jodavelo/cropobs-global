import { FC, useContext, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { DataTableSearch } from "../../ui/data-table-search"
import useSWR from 'swr';
import { dataFetcher } from "../../../helpers/data";
import { MapContext } from "../../../context/map";
import { GridEventListener, GridRowsProp } from "@mui/x-data-grid";
import { sectionState } from "../../../interfaces/data/section-states";
import { useRouter } from "next/router";

interface Props {
    show: boolean
    handleClose: Function
    adminIdsUrl: string
    clickId: string | number | null
    setSectionState: Function
    setClickId: Function
    setLocationName2?: Function
    setLocationNames?: Function
}

interface CountryRow {
    id: number | string | undefined
    country: string
    iso3: string
    country_es?: string | null | undefined
    country_pt?: string | null | undefined
}

export const SearchCountryModal: FC<Props> = ({ show, handleClose, adminIdsUrl, clickId, setSectionState, setClickId, setLocationName2 = () => {}, setLocationNames = () => {} }) => {
    const { map } = useContext( MapContext );
    //console.log(adminIdsUrl);
    const { data: adminIds } = useSWR<String[]>(adminIdsUrl, dataFetcher);
    const [ rows, setRows ] = useState<CountryRow[]>([]);
    const { locale } = useRouter();
    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        console.log(params)
        if (map){
            if (clickId !== null) {
                map.setFeatureState(
                    { source: 'geo_countries', id: clickId},
                    { clicked: false }
                );
            }
            map.setFeatureState(
                { source: 'geo_countries', id: params.row.id },
                { clicked: true }
            );
            setSectionState( (prevState: sectionState) => ({
                ...prevState,
                countryCode: params.row.iso3,
                locationName: params.row.country
            }));
            if( setLocationName2 ) {
                let countryName = '';
                switch (locale) {
                    case 'en':
                        countryName = params.row.country
                        break;
                    case 'es':
                        countryName = params.row.country_es
                        break;
                    default:
                        countryName = params.row.country_pt
                        break;
                }
                setLocationName2(countryName)
            }
            if( setLocationNames ) {
                setLocationNames( (prevState: sectionState) => ({
                    ...prevState,
                    en: params.row.country,
                    es: params.row.country_es,
                    pt: params.row.country_pt,
                    isoLabel: params.row.iso3,
                    clickId: params.row.id
                }));
            }
            console.log('aqui para pintar name', rows)
            setClickId(params.row.id);
        }
        console.log(`${params.row.country} clicked`);
        handleClose(false);
    };
    useEffect(() => {
        if (map && show) {
            let tempDict: Record<string, boolean> = {};
            let tempRows: CountryRow[] = [];
            map.querySourceFeatures('geo_countries', {
                sourceLayer: 'country_layer',
                filter: ['in', ['get', 'iso3'], ['literal', adminIds]]
            })
                .forEach( (layer, index) => {
                    if (layer.id){
                        // Tuve que hacer esta comprobación porque hay ids repetidos y eso genera errores en el renderizado de la DataGrid
                        if (!tempDict[layer.id]) {
                            tempDict[layer.id] = true
                            tempRows.push({
                                id: layer.id,
                                country: layer.properties?.country_name,
                                country_es: layer.properties?.country_name_es,
                                country_pt: layer.properties?.country_name_pt,
                                iso3: layer.properties?.iso3
                            });
                        }
                    }
                });
            setRows(tempRows);
            console.log(tempRows);
        }
    }, [show]);
    return (
        <Modal show={show} onHide={() => handleClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Country List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DataTableSearch rows={rows} handleRowClick={handleRowClick}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => handleClose(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
