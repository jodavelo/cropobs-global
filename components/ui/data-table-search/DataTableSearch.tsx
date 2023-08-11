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

    useEffect(() => {
        const countries = rows.map(row => ({
            id: row.id,
            country: row.country,
            iso3: row.iso3,
            country_es: row.country_es,
            country_pt: row.country_pt
        })) as Country[];
    
        let [englishCountries, spanishCountries, portugueseCountries] = createCountryArrays(countries);
    
        switch (locale) {
            case 'en':
                setRowsDataGrid(englishCountries);
                break;
            case 'es':
                setRowsDataGrid(spanishCountries);
                break;
            case 'pt':
                setRowsDataGrid(portugueseCountries);
                break;
            default:
                break;
        }
    }, [rows, locale]);
    
    
    
    
    return (
        <Box sx={{ height: '50vh', width: '100%' }}>
            <DataGrid
                rows={rowsDataGrid}
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
