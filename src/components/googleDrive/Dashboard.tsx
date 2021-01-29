import React from "react";
import { Container } from "react-bootstrap";
import useFolder from "../../hooks/useFolder";
import AddFolderBtn from "./AddFolderBtn";
import Folder from "./Folder";
import NavbarComponent from "./Navbar";
import { useParams } from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddFileBtn from "./AddFileBtn";

const Dashboard: React.FC = () => {
  const { folderId }: { folderId: string } = useParams();
  const { folder, childFolders } = useFolder(folderId);
  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className="d-flex mt-1 aligh-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileBtn currentFolder={folder} />
          <AddFolderBtn currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((folder) => {
              return (
                <div
                  key={folder.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2"
                >
                  <Folder folder={folder} />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
