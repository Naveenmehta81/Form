import React from "react";

const Checkbox = ({legend, onChange, option, value}) => {
  return (
    <div className="form-group">
      <fieldset className="doucment-fieldset">
        <legend>{legend}</legend>
        <div className="checkbox-group">
          {option.map((option) => (
            <label key={option.name} className="checkbox-label">
              <input
                type="checkbox"
                name={option.name}
                onChange={onChange}
                checked={value[option.name] || false}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default Checkbox;



  // make this code reusable and optimized 

//  <div className="form-row">
//               <div className="form-group">
//                 <fieldset className="document-fieldset">
//                   <legend>Documents Provided</legend>

//                   <div className="checkbox-group">
//                     <label className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         name="marksheet10"
//                         checked={formData.marksheet10}
//                         onChange={handelcheckbox}
//                       />
//                       10th Marksheet
//                     </label>

//                     <label className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         name="marksheet12"
//                         checked={formData.marksheet12}
//                         onChange={handelcheckbox}
//                       />
//                       12th Marksheet
//                     </label>

//                     <label className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         name="BCA"
//                         checked={formData.BCA}
//                         onChange={handelcheckbox}
//                       />
//                       BCA Degree
//                     </label>

//                     <label className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         name="MCA"
//                         checked={formData.MCA}
//                         onChange={handelcheckbox}
//                       />
//                       MCA Degree
//                     </label>
//                   </div>
//                 </fieldset>
//               </div>
//             </div> 