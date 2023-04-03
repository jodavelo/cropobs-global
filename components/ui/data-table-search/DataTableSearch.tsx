import { Box } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridEventListener, GridRowsProp, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { FC } from "react";

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
    return (
        <Box sx={{ height: '50vh', width: '100%' }}>
            <DataGrid
                rows={rows}
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
