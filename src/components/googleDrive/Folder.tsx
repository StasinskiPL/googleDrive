import React from 'react'
import { Link } from 'react-router-dom'
import {FaFolder} from "react-icons/fa"
import { Button } from 'react-bootstrap'

interface Props{
    folder:{
        name: string;
        id: string;
        userId: string;
        createdAt: {
          seconds: number;
          nanoseconds: number;
        } 
    } | null;
}

const Folder:React.FC<Props> = ({folder}) => {
    if(!folder) return null
    return (
        <Button className="text-truncate w-100" variant="outline-dark" as={Link}
         to={`/folder/${folder.id}`}>
            <FaFolder className="mr-2"/>
            {folder.name}
        </Button>
    )
}

export default Folder
