import { FC, useContext, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { DataTableSearch } from "../../ui/data-table-search"
import useSWR from 'swr';
import { dataFetcher } from "../../../helpers/data";
import { MapContext } from "../../../context/map";
import { GridEventListener, GridRowsProp } from "@mui/x-data-grid";
import { sectionState } from "../../../interfaces/data/section-states";

interface Props {
    show: boolean
    handleClose: Function
    adminIdsUrl: string
    clickId: string | number | null
    setSectionState: Function
    setClickId: Function
}

interface CountryRow {
    id: number | string | undefined
    country: string
    iso3: string
}

export const SearchCountryModal: FC<Props> = ({ show, handleClose, adminIdsUrl, clickId, setSectionState, setClickId }) => {
    const { map } = useContext( MapContext );
    const { data: adminIds } = useSWR<String[]>(adminIdsUrl, dataFetcher);
    const [ rows, setRows ] = useState<CountryRow[]>([]);
    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
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
            setClickId(params.row.id);
        }
        console.log(`${params.row.country} clicked`);
        handleClose(false);
    };
    useEffect(() => {
        if (map) {
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
                <Modal.Title>Modal heading</Modal.Title>
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
