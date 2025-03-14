import React, { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Router.jsx";
import { DataContext } from "./components/DataProvider/DataProvider";
import { Type} from "./Utils/action.type.js"
import { auth } from "./Utils/firebase.js"

function App() {
  const {state,dispatch} =useContext(DataContext)
  const {user}=state
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        // console.log(authUser)
        dispatch({
          Type:Type.SET_USER,
          User:authUser
        })
      }else{
        dispatch({
          Type: Type.SET_USER,
          User: authUser,
      });
      }

     
      
    })
    

  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
