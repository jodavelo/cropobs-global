import { FC } from "react"
import { Button, Modal } from "react-bootstrap"
import { DataTableSearch } from "../../ui/data-table-search"

interface Props {
    show: boolean
    handleClose: Function
}

export const SearchCountryModal: FC<Props> = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={() => handleClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DataTableSearch />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => handleClose(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
