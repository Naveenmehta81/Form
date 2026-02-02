import React, { use } from "react";
import { useState, useEffect } from "react";

//  const LOCAL_STORAGE_KEY = "collegeformdata";
//  const DBkey = "registered_students" ;

const UseForm = (intailvalue, validation) => {
  const [values, setValues] = useState(intailvalue);

  //   () => {
  //   try {
  //     const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  //     return saved ? JSON.parse(saved) : intailvalue;
  //   } catch (error) {
  //     return intailvalue;
  //   }
  // });

  const [error, setError] = useState({});

  // useEffect(() => {

  //   // impliment Debounce so not trigger on every keystroke
  //    const timeId = setTimeout(() => {
  //      console.log("Saving data to localStorage");
  //      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
  // }, 1000);
  //      return () => {
  //         clearTimeout(timeId);  // clear previous
  //      };
  //     },[values , LOCAL_STORAGE_KEY]);

  //  useEffect(() => {
  //   if (!values.email) return;

  //   const timer = setTimeout(() => {
  //     // Get the ONLY data store
  //     const existingData = localStorage.getItem(DB_KEY);
  //     const studentList = existingData ? JSON.parse(existingData) : [];

  //     // Check if email exists
  //     const isDuplicate = studentList.some(
  //       (student) => student.email === values.email
  //     );

  //     if (isDuplicate) {
  //       setError((prev) => ({
  //         ...prev,
  //         email: "This email is already registered!",
  //       }));
  //     } else {
  //       // If unique, clear the email error
  //       setError((prev) => {
  //         const newErrors = { ...prev };
  //         delete newErrors.email;
  //         return newErrors;
  //       });
  //     }
  //   }, 800); // 800ms debounce

  //   return () => clearTimeout(timer);
  // }, [values.email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const val = type === "checkbox" ? checked : value;

    // Firstname and Lastname: Only letters, max 20 characters
    if (name === "firstname" || name === "lastname") {
      const cleanValue = val.replace(/[^a-zA-Z]/g, "").slice(0, 20);
      setValues({ ...values, [name]: cleanValue });
    }
    // Fathername: Only letters and spaces, max 30 characters
    else if (name === "fathername") {
      const cleanValue = val.replace(/[^a-zA-Z\s]/g, "").slice(0, 30);
      setValues({ ...values, [name]: cleanValue });
    }

    // College Name: Only letters and spaces, max 50 characters
    else if (name === "bcacollgename" || name === "mcacollgename") {
      const cleanValue = val.replace(/[^a-zA-Z\s]/g, "").slice(0, 50);
      setValues({ ...values, [name]: cleanValue });
    } else if (name === "nation") {
      if (val !== "other ") {
        setValues({ ...values, nation: val, country: "" });
      } else {
        setValues({ ...values, nation: val });
      }
    } else if (name === "state_mode") {
      if (val !== "other") {
        setValues({ ...values, state_mode: val, state: "" });
      } else {
        setValues({ ...values, state_mode: val });
      }
    } else {
      setValues({ ...values, [name]: val });
    }

    // this clear errro when we start typing
    if (error[name] && name !== "email") {
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
    // localStorage.removeItem("collegeformdata"); // Delete from storage
    setError({});
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

// const validateName = (name, value) => {
//   if (!value.trim()) {
//     return `${name} is required`;
//   }
//   if (value.length < 3) {
//     return "Must be at least 3 characters";
//   }
//   return "";
// };
