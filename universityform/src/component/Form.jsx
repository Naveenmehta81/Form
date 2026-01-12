import React, { useState } from "react";
import "./Form.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Countries from "./Countries"; // country data
import courses from "./Courses"; // courses data
import PhoneData from './Phonedata'  ;  // phonedata 

const Form = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    fathername: "",
    email: "",
    dob: "",
    address: "",
    gender: "",
    country: "",
    dialcode : "+91", 
    phone: "",
    pin: " ",
    courses: "",
  });

 

  const [valid, setValid] = useState(true);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleDialCode = (e) => {
     setFormData({ ...formData, dialCode: e.target.value });
  };

  const handlePhoneNumber = (value) => {
    setFormData({ ...formData, phone: value });
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phone) => {
    return phone && phone.length >= 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form Submitted Successfully!");
  };






  return (
    <div className="form-container">
      <div className="form-box">
        <h1>College Form</h1>
        <div className="from-data">
          <h2>Fill this detials</h2>

          <form className="from-field" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  required
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  required
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Father Name:</label>
                <input
                  type="text"
                  placeholder="enter father name"
                  name="fathername"
                  value={formData.fathername}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter email"
                required
                name="email"
                value={formData.email}
                onChange={handleInput}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  required
                  name="dob"
                  value={formData.dob}
                  onChange={handleInput}
                />
              </div>

              <div className="form-group">
                <label>Gender:</label>
                <div className="gender-options">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInput}
                  />{" "}
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInput}
                  />{" "}
                  Female
                  <input  
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={handleInput}
                  />{" "}
                  Other
                </div>
              </div>
            </div>


            <div className="form-row">
                <div className="form-group">
                  <label>Phone number</label>
                  <select
                   
                   value={PhoneData.dial_code}
                   id="dialCode"
                   name="dialCode"
                   value = {formData.dialcode}    
                   onChange={handleDialCode}
                   required
                  >
                   {
                    PhoneData.map((item , index) =>(
                          <option key={index} value={item.dial_code }  >
                            {item.flag} {item.name}

                          </option>
                    ))
                   }

                  </select>
                  <input 
                     type="number" 
                     name="phone"
                     placeholder="Mobile Number"
                
                     value={formData.phone}
                     onChange={handleInput}
                     required
                   />

                   
                </div>
            </div>


            <div className="form-row">
              <div className="form-group">
                <label>Phone Number:</label>
                <PhoneInput
                  country={"us"}
                  value={formData.phone}
                  onChange={handlePhoneNumber}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                />
                {!valid && <span className="error">Invalid Phone Number</span>}
              </div>

              

              <div className="form-group">
                <label htmlFor="country">Country:</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Country</option>
                  {Countries.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  placeholder="Enter full address"
                  name="address"
                  value={formData.address}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-group">
                <label>PIN code:</label>
                <input
                  type="text"
                  placeholder="PIN code"
                  name="pin"
                  value={formData.pin}
                  onChange={handleInput}
                  pattern="[0-9]{4}"
                  maxLength={6}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Courses:</label>
                <select
                  id="courses"
                  name="courses"
                  value={formData.courses}
                  onChange={handleInput}
                  required
                >
                  <option value="">select courses</option>
                  {courses.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form ;
