import React from "react";
import { FaFileUpload } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import { database, storage } from "../../firebase";
interface Props {
  currentFolder: {
    name: string;
    id: string;
    userId: string;
    createdAt: {
      seconds: number;
      nanoseconds: number;
    };
  } | null;
}

const AddFileBtn: React.FC<Props> = ({ currentFolder }) => {
  const { currentuser } = useAuthContext();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      
      const uploadTask = storage
      .ref(`/files/${currentuser?.uid}/${currentFolder?.name}`)
      .put(file);

      uploadTask.on("state_change",snapchot =>{

      },()=>{

      },()=>{
          uploadTask.snapshot.ref.getDownloadURL().then(url=>{
              console.log(url)
              database.files.add({
                  url: url,
                  name:file.name,
                  createdAt :database.getTimeStampe(),
                  folderId:currentFolder?.id,
                useId: currentuser?.uid,
              })
              
          })
      })
    }
  };

  return (
    <label className="btn btn-outline-success btn-sm m-0 mr-2">
      <FaFileUpload />
      <input
        type="file"
        onChange={handleUpload}
        style={{ opacity: "0", position: "absolute", left: "-999px" }}
      />
    </label>
  );
};

export default AddFileBtn;
