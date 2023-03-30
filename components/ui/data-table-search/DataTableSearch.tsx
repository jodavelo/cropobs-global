import { Box } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';

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

const columns: GridColDef[] = [{ field: 'country', headerName: 'Country', width: 150 }];

const rows = [{id:1, country: 'Colombia'}, {id:2, country: 'Ecuador'}, {id:3, country: 'Venezuela'}];

export const DataTableSearch = () => {
    

    return (
        <Box sx={{ height: '50vh', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                localeText={{
                toolbarQuickFilterPlaceholder: 'Buscar...'
                }}
                slots={{ toolbar: QuickSearchToolbar }}
            />
        </Box>
    )
}
