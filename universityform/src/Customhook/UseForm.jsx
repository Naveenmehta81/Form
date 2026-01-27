import React from "react";
import { useState, useEffect } from "react";


const LOCAL_STORAGE_KEY = 'collegeformdata';

const UseForm = (intailvalue, validation) => {
  const [values, setValues] = useState(() => {
    const savedata = localStorage.getItem("LOCAL_STORAGE_KEY");

    return savedata ? JSON.parse(savedata) : intailvalue;
  });

  
   





  const [error, setError] = useState({});

  useEffect(() => {
    localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify(values));
    
  },[values]);
  console.log(values);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const val = type === "checkbox" ? checked : value;

    if (name === "firstname" || name === "lastname"  ) {
      const cleanValue = val.replace(/[^a-zA-Z]/g,"");
      setValues({ ...values, [name]: cleanValue });

    }else if(name === "fathername"){
           const cleanValue = val.replace(/[^a-zA-Z]s]/g, "");
           setValues({...values, [name]: cleanValue})
    } 
    else {
      setValues({ ...values, [name]: val });
    }

    // this clear errro when we start typing
    if (error[name]) {
      setError({ ...error, [name]: "" });
    }
  };



 


  const handleblur = (e) => {
    const { name } = e.target;

    const validationerror = validation(values);

    setError({
      ...error,
      [name]: validationerror[name],  
    });
  };

  const clearForm = () => {
    setValues(intailvalue); // Reset state to empty
    localStorage.removeItem("collegeformdata"); // Delete from storage
  };

  return {
    values,
    setValues,
    error,
    setError,
    handleChange,
    handleblur,
    clearForm,
  };
};

export default UseForm;
