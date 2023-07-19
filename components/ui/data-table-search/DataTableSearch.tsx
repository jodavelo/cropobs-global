import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridEventListener, GridRowsProp, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Country, createCountryArrays } from "../../../helpers";
import { useRouter } from "next/router";

interface Props {
    rows: GridRowsProp
    handleRowClick: GridEventListener<'rowClick'>
}

function QuickSearchToolbar() {
    return (
        <Box
            sx={{
            p: 0.5,
            pb: 0,
            }}
        >
            <GridToolbarQuickFilter sx={{width: '100%'}} />
        </Box>
    );
}

const columns: GridColDef[] = [{ field: 'country', headerName: 'Country', width: 200 }];

export const DataTableSearch: FC<Props> = ({ rows, handleRowClick }) => {
    const { locale } = useRouter();
    const [rowsDataGrid, setRowsDataGrid] = useState<Country[]>([]);

    const countries = rows.map(row => ({
        id: row.id,
        country: row.country,
        iso3: row.iso3,
        country_es: row.country_es,
        country_pt: row.country_pt
    })) as Country[];
    const [englishCountries, spanishCountries, portugueseCountries] = createCountryArrays(countries);
    // TODO: To do at here in this use effect!
    // useEffect(() => {
    //     switch (locale) {
    //         case 'en':
    //             setRowsDataGrid(englishCountries);
    //             break;
    //         case 'es':
    //             // Aquí deberías asignar `spanishCountries` o lo que corresponda
    //             break;
    //         default:
    //             break;
    //     }
    // }, [])
    
    
    return (
        <Box sx={{ height: '50vh', width: '100%' }}>
            <DataGrid
                rows={spanishCountries}
                onRowClick={handleRowClick}
                columns={columns}
                localeText={{
                toolbarQuickFilterPlaceholder: 'Buscar...'
                }}
                slots={{ toolbar: QuickSearchToolbar }}
            />
        </Box>
    )
}
