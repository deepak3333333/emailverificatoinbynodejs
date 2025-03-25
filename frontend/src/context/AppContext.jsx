import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const AppContent = createContext();


export const AppContextProvider = (props) => {
  const bancendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  
const getUserData=async()=>{
  try{
    axios.defaults.withCredentials = true;
    const {data}=await axios.get(bancendUrl+'/api/user/data')
    data.success?setUserData(data.userData):toast.error(data.message)
  }catch(err){
    toast.error(err.message)
  }
  
}
const value = {
    bancendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData
  };
  useEffect(()=>{
    getUserData()
  },[])

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
