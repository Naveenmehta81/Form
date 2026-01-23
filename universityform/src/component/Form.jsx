import React, { useState } from "react";
import "./Form.css";
import InputField from "./InputField"; // reusable componnet
import Radiogroup from "./Radiogroup"; // resusable componet for radio
import UseForm from "./useForm";
import Countries from "./Countries"; // country data
import courses from "./Courses"; // courses data
import PhoneData from "./Phonedata"; // phonedata
import Checkbox from "./Checkbox";
import Textarea from "./Textarea";
import SelectGroup from "./SelectGroup";
import States from "./States";

const validation = (values) => {
  let errror = {};

  //name validation
  if (!values.firstname) errror.firstname = "First Name is required";
  if (!values.lastname) errror.lastname = "Last Name is required";
  if (!values.fathername) errror.fathername = "father name is reqiured";

  // email validation
  if (values.email) {
    const emailvaild = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailvaild.test(values.email)) {
      errror.email = "invalid email";
    }
  } else {
    errror.email = "email is required";
  }

  // DOB Validation (18+)
  if (values.dob) {
    const year = new Date(values.dob).getFullYear();
    const currentYear = new Date().getFullYear();
    if (currentYear - year < 18) errror.dob = "age should be  18+";
  } else {
    errror.dob = "Date of birth is required";
  }

  // gender
  if (!values.gender) errror.gender = "select gender";

  //adress
  if (!values.address) errror.address = "address required ";
  //pin
  if (!values.pin) errror.pin = "pin required ";

  // phone validation
  // ... inside validation function ...
  if (!values.phone) {
    errror.phone = "Phone number is required";
  } else if (values.phone.length < 8 || values.phone.length > 15) {
    errror.phone = "Phone number must be 8-15 digits";
  }

  // 1. About Section Validation
  if (!values.about) {
    const wordCount = values.about.trim().split(/\s+/).length;
    if (wordCount > 200) {
      errror.about = `Word limit exceeded (${wordCount}/200)`;
    }
  }

  // 2. Gap Year Validation
  if (values.gap) {
    const gapWordCount = values.gap.trim().split(/\s+/).length;
    if (gapWordCount > 200) {
      errror.gap = `Word limit exceeded (${gapWordCount}/200)`;
    }
  }

  // nationlity & state
  if (!values.nation) errror.nation = "select nation";
  if (!values.state) errror.state = "select state";

  // college verification
  if (!values.bcacollgename) errror.bcacollgename = "college  Name is required";
  if (!values.mcacollgename) errror.mcacollgename = "college  Name is required";

  return errror;
};

const Form = () => {
  const {
    values,
    setValues,
    error,
    setError,
    handleChange,
    handleblur,
    clearForm,
  } = UseForm(
    {
      firstname: "",
      lastname: "",
      fathername: "",
      email: "",
      dob: "",
      address: "",
      gender: "",
      country: "",
      dialcode: "+91",
      // code: "IN",
      phone: "+91",
      pin: "",
      courses: "",
      marksheet10: false,
      marksheet12: false,
      BCA: false,
      MCA: false,

      about: "",
      gap: " ",
      nation: " ",
      state: " ",
      bcacollgename: "",
      mcacollgename: " ",
    },
    validation,
  );

  const [isDialCodeOpen, setIsDialCodeOpen] = useState(false);

  const handleDialCode = (newcode) => {
    setValues({
      ...values,
      dialcode: newcode,
    });
    setIsDialCodeOpen(false);
  };

 

  // display count for word max 200
  // const getWordCount = () => {
  //   if (!formData.about) return 0;
  //   return formData.about
  //     .trim()
  //     .split(/\s+/)
  //     .filter((word) => word !== "").length;
  // };

  // // handle checkbox
  // const handelcheckbox = (e) => {
  //   const { name, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: checked,
  //   }));
  // };

  // handle phone number validation min 8 to 15
  // const handlephonecodevalidation = (e) => {
  //   const phonecode = e.target.value;
  //   const formatecoderegex = /^[0-9\s\-\+]*$/;

  //   if (!formatecoderegex.test(phonecode)) {
  //     setPhoneCodeError("invalid error");
  //     return;
  //   }

  //   const clearnumber = phonecode.replace(/[^0-9]/g, "");

  //   if (clearnumber.length < 8 || clearnumber.length > 15) {
  //     setPhoneCodeError("phone no must be  8 to 15 ");
  //   } else {
  //     setPhoneCodeError("");
  //   }
  // };

  // const handleDialCode = (e) => {
  //   const newcode = e.target.value;
  //   const oldcode = formData.dialcode;
  //   let currentphone = formData.phone;

  //   if (currentphone.startsWith(oldcode)) {
  //     currentphone = currentphone.substring(oldcode.length).trim();
  //   }

  //   setFormData({
  //     ...formData,
  //     dialcode: newcode,
  //     phone: newcode + currentphone,
  //   });
  // };

  //   const sortPhonedata = [...PhoneData].sort(
  //   (a, b) => b.dial_code.length - a.dial_code.length, // soting longest to shortest
  // );

  // const handlephoneinput = (e) => {
  //   // phone number ka change
  //   const inputvalue = e.target.value;
  //   const matchcontry = sortPhonedata.find((item) =>
  //     inputvalue.startsWith(item.dial_code),
  //   );

  //   setFormData((prev) => ({
  //     ...prev,
  //     phone: inputvalue,
  //     dialcode: matchcontry ? matchcontry.dial_code : prev.dialcode,
  //   }));
  // };

  // final sumbit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validerrors = validation(values);

    // --- START: DUPLICATE CHECK LOGIC ---
    
    // 1. Get the list of students who ALREADY submitted
    const existingData = localStorage.getItem("registered_students");
    const studentList = existingData ? JSON.parse(existingData) : [];

    // 2. Check if current email exists in that list
    const isDuplicate = studentList.some((student) => student.email === values.email);

    if (isDuplicate) {
        // If found, add an error
        validerrors.email = "Data already present (Email registered)";
    }
    // --- END: DUPLICATE CHECK LOGIC ---

    setError(validerrors);

    if (Object.keys(validerrors).length === 0) {
        // 3. Success! Add to the "Database"
        const newItem = {
             id: Date.now(),
             ...values
        };
        const updatedItems = [...studentList, newItem];
        localStorage.setItem("registered_students", JSON.stringify(updatedItems));
        
        console.log("Success data added");
        alert("Form Submitted Successfully");
        clearForm();
    } else {
        alert("Error in form");
    }
};

  // const validateName = (name, value) => {
  //   if (!value.trim()) {
  //     return `${name} is required`;
  //   }
  //   if (value.length < 3) {
  //     return "Must be at least 3 characters";
  //   }
  //   return "";
  // };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>College Form</h1>
        <div className="from-data">
          <h2>Fill this details</h2>

          <form className="from-field" onSubmit={handleSubmit}>
            <div className="form-row">
              <InputField
                label="Firstname Name "
                placeholder="enter your first name "
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                error={error.firstname}
              />

              <InputField
                label=" Last Name "
                placeholder="enter your last name "
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                error={error.lastname}
              />
            </div>
            <div className="form-row">
              <InputField
                label="Father Name"
                placeholder="enter your father name "
                name="fathername"
                value={values.fathername}
                onChange={handleChange}
                error={error.fathername}
              />
            </div>

            {/* email setction  */}

            <InputField
              label="Email"
              placeholder="xyz@gmail.com"
              name="email"
              onChange={handleChange}
              value={values.email}
              error={error.email}
              onBlur={handleblur}
            />

            <div className="form-row">
              <InputField
                label="Date of Birth"
                type="date"
                name="dob"
                onChange={handleChange}
                value={values.dob}
                error={error.dob}
                onBlur={handleblur}
              />

              <Radiogroup
                label="gender"
                name="gender"
                onChange={handleChange}
                value={values.gender}
                error={error.gender}
                options={["male", "female", "other"]}
              />
            </div>

            <div className="form-row">
              <InputField
                label=" Adress:"
                placeholder="enter your addres"
                name="address"
                onChange={handleChange}
                value={values.address}
                error={error.address}
              />
              <InputField
                label="PIN CODE:"
                placeholder="PINCODE"
                name="pin"
                onChange={handleChange}
                value={values.pin}
                error={error.pin}
                pattern="[0-9]{6}"
                maxLength={6}
              />
            </div>

            {/* phone number section  */}

            <div className="form-row">
              {/* Main Group to stack Label on top of the row */}
              <div className="form-group">
                <label>Phone Number</label>

                {/* Wrapper to put Dropdown and Input side-by-side */}
                <div className="phone-wrapper">
                  {/* 1. Dropdown Section */}
                  <div className="custom-select-container phone-dialcode">
                    <div
                      className="select-trigger"
                      onClick={() => setIsDialCodeOpen(!isDialCodeOpen)}
                    >
                      {values.dialcode || "+91"}
                    </div>

                    {isDialCodeOpen && (
                      <div className="options-list">
                        {PhoneData.map((item) => (
                          <div
                            key={item.code}
                            className="option-item"
                            onClick={() => {
                              handleDialCode(item.dial_code);
                            }}
                          >
                            {item.flag}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. Input Section */}
                  <div className="phone-input-box">
                    <InputField
                      name="phone"
                      placeholder="Enter phone number"
                      value={values.phone}
                      onBlur={handleblur}
                      onChange={handleChange}
                      error={error.phone}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <Checkbox
                legend="documetn provide"
                value={values}
                onChange={handleChange}
                option={[
                  { name: "marksheet10", label: "10th Marksheet" },
                  { name: "marksheet12", label: "12th Marksheet" },
                  { name: "BCA", label: "BCA Degree" },
                  { name: "MCA", label: "MCA Degree" },
                ]}
              />
            </div>

            <label>
              About Yourself:
              <div className="form-row">
                <Textarea
                  name="about"
                  value={values.about}
                  onChange={handleChange}
                  onlBur={handleblur}
                  placeholder="Tell us about yourself..."
                  maxWords={200}
                />
                {error.about && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {error.about}
                  </span>
                )}
              </div>
            </label>

            <label>
              Gap Year Explanation:
              <div className="form-row">
                <Textarea
                  name="gap"
                  value={values.gap}
                  onChange={handleChange}
                  onlBur={handleblur}
                  placeholder="Explain your gap year (if any)..."
                  maxWords={200}
                />
                {error.about && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {error.about}
                  </span>
                )}
              </div>
            </label>

            <div className="form-row">
              <Radiogroup
                label="Nationality"
                name="nation"
                value={values.nation}
                onChange={handleChange}
                error={error.nation}
                options={["India", "Nepal", "other"]}

              />
              <SelectGroup
                label="Country if other "
                name="country"
                value={values.country}
                onChange={handleChange}
                options={Countries} // Pass the entire list of countries
                placeholder="Select Country"
                error={error.country}
              />
             
            </div>
              <div className="form-row">
                   <Radiogroup
                label="state"
                name="state"
                value={values.state}
                onChange={handleChange}
                error={error.state}
                options={["MP", "other"]}
              />
              <SelectGroup
  label="choose state if other :"
  name="state"
  value={values.state}
  onChange={handleChange}
  options={States}
  placeholder="Select State"
  error={error.state}
/>
              </div>

            

            <div className="form-row">
              {/* 2. Course Select */}
              <SelectGroup
                label="Courses"
                name="courses"
                value={values.courses}
                onChange={handleChange}
                options={courses} // Pass the entire list of courses
                placeholder="Select Course"
                error={error.courses}
              />
            </div>

            <label>
              Enter your coollege name-
              <div className="form-row">
                <InputField
                  label=" BCA "
                  name="bcacollgename"
                  value={values.bcacollgename}
                  placeholder="Enter Your college Name:"
                  error={error.bcacollgename}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <InputField
                  label=" MCA "
                  name="mcacollgename"
                  value={values.mcacollgename}
                  placeholder="Enter Your college Name:"
                  error={error.mcacollgename}
                  onChange={handleChange}
                />
              </div>
            </label>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
