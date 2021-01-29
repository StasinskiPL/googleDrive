import { useReducer, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { database } from "../firebase";

type stringOrNull = string | null;

type Reducer<S, A> = (prevState: S, action: A) => S;

interface Folder {
  name: string;
  id: string;
  userId: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

interface State {
  folderId: stringOrNull;
  folder: Folder | null;
  childFolders: Folder[];
  childFiles: string[];
}

const UPDATE_FOLDER = "UPDATE_FOLDER";
const SELECT_FOLDER = "SELECT_FOLDER";
const SET_CHILD_FOLDER = "SET_CHILD_FOLDER";

const ROOT_FOLDER: Folder = {
  name: "Root",
  id: "",
  userId: "",
  createdAt: {
    seconds: 0,
    nanoseconds: 0,
  },
};

interface SelectFolderType {
  type: typeof SELECT_FOLDER;
  payload: {
    folderId: stringOrNull;
    folder: Folder | null;
  };
}
const selectFolderAction = ({
  folderId,
  folder,
}: {
  folderId: stringOrNull;
  folder: Folder | null;
}): SelectFolderType => {
  return {
    type: SELECT_FOLDER,
    payload: {
      folderId,
      folder,
    },
  };
};

interface UpdateFolderType {
  type: typeof UPDATE_FOLDER;
  payload: {
    folder: Folder | null;
  };
}

const updateFolderAction = ({
  folder,
}: {
  folder: Folder | null;
}): UpdateFolderType => {
  return {
    type: UPDATE_FOLDER,
    payload: {
      folder,
    },
  };
};

interface SetChildFolderTypes{
    type: typeof SET_CHILD_FOLDER,
    payload:{
        childFolders: Folder[]
    }
}
const setChildFolderAction=({childFolders}:{childFolders:Folder[]}):SetChildFolderTypes=>{
    return{
        type: SET_CHILD_FOLDER,
        payload:{
            childFolders
        }
    }
}

type ActionType = SelectFolderType | UpdateFolderType | SetChildFolderTypes;

function reducer(state: State, action: ActionType): State {
  if (action.type === SELECT_FOLDER) {
    return {
      folderId: action.payload.folderId,
      folder: action.payload.folder,
      childFiles: [],
      childFolders: [],
    };
  }
  if (action.type === UPDATE_FOLDER) {
    return {
      ...state,
      folder: action.payload.folder,
    };
  }
  if(action.type === SET_CHILD_FOLDER){
      return{
          ...state,
          childFolders: action.payload.childFolders
      }
  }
  return state;
}

const useFolder = (
  folderId: stringOrNull = null,
  folder: Folder | null = null
): State => {
  const { currentuser } = useAuthContext();
  const [state, dispatch] = useReducer<Reducer<State, ActionType>>(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch(selectFolderAction({ folderId: folderId, folder: folder }));
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId === null) {
      return dispatch(updateFolderAction({ folder: ROOT_FOLDER }));
    }
    database.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        if (doc.data()) {
          const data: Omit<Folder, "id"> = doc.data() as Omit<Folder, "id">;

          const formattedDoc: Folder = {
            id: doc.id,
            ...data,
          };
          return dispatch(updateFolderAction({ folder: formattedDoc }));
        }
      })
      .catch((e) => {
        console.log(e);
        return dispatch(updateFolderAction({ folder: ROOT_FOLDER }));
      });
  }, [folderId]);

  useEffect(() => {
   return database.folders
      .where("parentId", "==", folderId ? folderId : "")
      .where("userId", "==", currentuser?.uid).orderBy("createdAt")
      .onSnapshot(snaphot=>{
          dispatch(setChildFolderAction({childFolders:snaphot.docs.map(doc=>{
          const data: Omit<Folder, "id"> = doc.data() as Omit<Folder, "id">;
              return{
                id: doc.id,
                ...data,
              }
          })}))
      });
  }, [folderId, currentuser]);

  

  return state;
};

export default useFolder;
