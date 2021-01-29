import React from 'react'
import { Breadcrumb } from 'react-bootstrap'

    interface Props{
        currentFolder:{
            name: string;
            id: string;
            userId: string;
            createdAt: {
              seconds: number;
              nanoseconds: number;
            } 
        } | null;
    }

const FolderBreadcrumbs:React.FC<Props> = ({currentFolder}) => {
    return (
        <Breadcrumb className="flex-grow-1 m-0" listProps={{className:"bg-white m-0 p-0"}}>
            {currentFolder && (
                <Breadcrumb.Item className="text-truncate"
                active style={{maxWidth:"200px"}}>
                    {currentFolder.name}
                </Breadcrumb.Item>
            )}
            
        </Breadcrumb>
    )
}

export default FolderBreadcrumbs
