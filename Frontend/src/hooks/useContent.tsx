import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);

  function refresh(){
    axios.get(`${BACKEND_URL}/api/v1/content`,{
    headers : {
        "Authorization" : localStorage.getItem("token")
    }
  })
  .then((response) => {
    setContents(response.data);
    setError(null);
  })
  .catch((error) => {
    console.error("Error fetching contents", error);
    setError(error.response.data.message);

  });
 }
 useEffect(() => {
  refresh();

  let interval = setInterval(()=>{
    refresh();
  }, 10 * 1000);

  return () => {clearInterval(interval)}; 
 }, []);

 return {contents, refresh, error};
}

