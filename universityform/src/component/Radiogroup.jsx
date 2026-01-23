import React from 'react'

const Radiogroup = ({label , name , options , onChange , value  , error  }) => {
  return (

        <div className="form-group">
                   <label  className="gender-label">{label}:</label>
                      <div className="gender-options">
                         {options.map((option) => (
                            <label key={option} className="radio-label">
                              <input
                               type='radio' 
                               name= {name}
                               value={option}
                               checked = {value === option}
                               onChange={onChange}
                               />
                               {option.charAt(0).toUpperCase() + option.slice(1)}
                               </label>
                        )) 
                    }
                         
                      </div>
                     {error && (
                            <span style={{ color: "red", fontSize: "12px", marginTop: "5px", display: "block" }}>
                       {error}
                                </span>
                     )}
                     
                </div>
     

  );                   
};

export default Radiogroup ; 
