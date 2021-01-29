import React,{useState} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {FaFolderPlus} from "react-icons/fa"
import { useAuthContext } from '../../context/AuthContext'
import {database} from "../../firebase"

interface Props{
    currentFolder:{
        name: string;
        id: string;
        userId: string;
        createdAt: {
          seconds: number;
          nanoseconds: number;
        };
    } | null
}

const AddFolderBtn:React.FC<Props> = ({currentFolder}) => {
    const [open,setOpen] = useState<boolean>(false)
    const [name,setName] = useState<string>("")
    const {currentuser} = useAuthContext();

    const closeModal = ()=>{
        setOpen(false)
    }
    const openModal =()=>{
        setOpen(true)
    }

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
        setOpen(false)

        if(currentFolder === null) return
        database.folders.add({
            name:name,
            parentId:currentFolder.id,
            userId:currentuser?.uid,
            createdAt: database.getTimeStampe(),
        })
        setName("")
    }

    return (
        <>
        <Button onClick={openModal} variant="outline-success" size="sm">
            <FaFolderPlus/>
        </Button>
        <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>
                        Folder Name
                    </Form.Label>
                    <Form.Control
                    required
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="success" type="submit" >
                    Add Folder
                </Button>
            </Modal.Footer>
        </Form>
        </Modal>
        </>
    )
}

export default AddFolderBtn
