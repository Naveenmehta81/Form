import React, { useState } from "react";
import "./Form.css";
import InputField from "./InputField"; // reusable componnet
import UseForm from "./useForm";
import Countries from "./Countries"; // country data
import courses from "./Courses"; // courses data
import PhoneData from "./Phonedata"; // phonedata

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

  // handle textarea max word limit
  // const handleAboutInput = (e) => {
  //   const { name, value } = e.target;

  //   const words = value.trim().split(/\s+/)
  //     .filter((word) => word !== "");

  //   if (words.length <= 200 || value.length < formData.about.length) {
  //     setFormData({ ...formData, [name]: value });
  //   } else {
  //     alert("Word limit exceeded! Maximum 200 words allowed.");
  //   }
  // };

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
    setError(validerrors);

    if (Object.keys(validerrors).length === 0) {
      console.log("form submitted", values);
      alert("form submitted");
      clearForm();
    } else {
      alert("error in form ");
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

              <label className="gender-lable">Gender:</label>
              <div className="gender-options">
                {["male", "female", "other"].map((g) => (
                  <label key={g}>
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={values.gender === g}
                      onChange={handleChange}
                    />{" "}
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </label>
                ))}
              </div>
              {error.gender && (
                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "50px",
                    position: "relative",
                    right: "245px",
                  }}
                >
                  {error.gender}
                </span>
              )}
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
                {item.flag} {item.dial_code}
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
          // We don't pass a label here because we handled it above
          error={error.phone} 
        />
      </div>
      
    </div>
  </div>
</div>

            {/* <div className="form-input-number">
                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handlephoneinput}
                  onBlur={handlephonecodevalidation}
                  required
                  style={{ borderColor: phonecodeerror ? "red" : "" }}
                />
                {phonecodeerror && (
                  <span style={{ color: "red ", fontSize: "12px" }}>
                    {phonecodeerror}
                  </span>
                )}
              </div>
            </div> */}

            {/* country section  */}
            {/* <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">Country:</label>

                <div className="custom-select-container">
                  <div
                    className="select-trigger"
                    onClick={() => setiscountryopen(!iscountropen)}
                  >
                    {formData.country
                      ? Countries.find((c) => c.value === formData.country)
                          ?.label
                      : "Select Country"}
                  </div>

                  {iscountropen && (
                    <div className="options-list">
                      {Countries.map((item) => (
                        <div
                          key={item.value}
                          className="option-item"
                          onClick={() => {
                            handleInput({
                              target: { name: "country", value: item.value },
                            });

                            setiscountryopen(false);
                          }}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div> */}

            {/* coursese section  */}
            {/* <div className="form-row">
              <div className="form-group">
                <label>Courses:</label>

                <div className="custom-select-container">
                  <div
                    className="select-trigger"
                    onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                  >
                    {formData.courses
                      ? courses.find((c) => c.value === formData.courses)?.label
                      : "Select Course"}
                  </div>

                  {isCoursesOpen && (
                    <div className="options-list">
                      {courses.map((item) => (
                        <div
                          key={item.value}
                          className="option-item"
                          onClick={() => {
                            handleInput({
                              target: { name: "courses", value: item.value },
                            });

                            setIsCoursesOpen(false);
                          }}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div> */}

            {/* <div className="form-row">
              <div className="form-group">
                <fieldset className="document-fieldset">
                  <legend>Documents Provided</legend>

                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="marksheet10"
                        checked={formData.marksheet10}
                        onChange={handelcheckbox}
                      />
                      10th Marksheet
                    </label>

                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="marksheet12"
                        checked={formData.marksheet12}
                        onChange={handelcheckbox}
                      />
                      12th Marksheet
                    </label>

                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="BCA"
                        checked={formData.BCA}
                        onChange={handelcheckbox}
                      />
                      BCA Degree
                    </label>

                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="MCA"
                        checked={formData.MCA}
                        onChange={handelcheckbox}
                      />
                      MCA Degree
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  name="about"
                  value={formData.about}
                  onChange={handleAboutInput}
                  placeholder="tell me about yourself in 200 word... "
                  rows="5"
                  style={{ width: "100%", padding: "8px" }}
                ></textarea>
                <span style={{ fontSize: "12px", color: "#0c0404" }}>
                  {getWordCount()}/200 words
                </span>
              </div>
            </div>
            
              <div className="form-row">
              <div className="form-group">
                <label>Gap year explanation:</label>
                <textarea
                  className="form-textarea"
                  name="gap"
                  value={formData.gap}
                  onChange={handleAboutInput}
                  placeholder="explain reason about your gap year... "
                  rows="5"
                  style={{ width: "100%", padding: "8px" }}
                ></textarea>
                <span style={{ fontSize: "12px", color: "#0c0404" }}>
                  {getWordCount()}/200 words
                </span>
              </div>
            </div>
 */}

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
 