import SignUp from "./SignUp";
import {BrowserRouter,Redirect,Route, Switch} from "react-router-dom"
import Dashboard from "./googleDrive/Dashboard";
import Login from "./Login";
import { useAuthContext } from "../context/AuthContext";

function App() {

  const data = useAuthContext();
  console.log(data)
  return (
    <main>
    <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          {(data && data.currentuser) ?
          <Route exact path="/" component={Dashboard}/>
          : <Redirect to="/login"/> }
             {(data && data.currentuser) ?
          <Route  path="/folder/:folderId" component={Dashboard}/>
          : <Redirect to="/login"/> }
          
        </Switch>
    </BrowserRouter>
    </main>
  );
}

export default App;
