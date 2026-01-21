import React, { useState } from "react";
import "./Form.css";

import Countries from "./Countries"; // country data
import courses from "./Courses"; // courses data
import PhoneData from "./Phonedata"; // phonedata

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
  });

  const [emailerror, setEmailerror] = useState("");
  const [iscountropen, setiscountryopen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [iscountycodeopen, setIScountrycodeopen] = useState(false);
  const [doberror, setDobError] = useState("");
  const [phonecodeerror, setPhoneCodeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState({});

  //hanlde input and gender validation
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "gender") {
      setGenderError("");
    }
  };

  // handle fistname and lastname validation using regex
  const handleFullname = (e) => {
    const { name, value } = e.target;
    const setinput = value.replace(/[^a-zA-Z]/g, "");

    setFormData((prev) => ({
      ...prev,
      [name]: setinput,
    }));

    if (error[name]) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // handle father name same only difference is space
  const handleFatherInput = (e) => {
    const { name, value } = e.target;
    const setinputfather = value.replace(/[^a-zA-Z ]/g, "");

    setFormData((prev) => ({
      ...prev,
      [name]: setinputfather,
    }));

    if (error[name]) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // handle email validation
  const handlEmailvalidation = (e) => {
    const email = e.target.value;
    const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !expression.test(email)) {
      setEmailerror("please enter valid email");
    } else {
      setEmailerror("");
    }
  };

  // handle textarea max word limit
  const handleAboutInput = (e) => {
    const { name, value } = e.target;

    const words = value
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "");

    if (words.length <= 200 || value.length < formData.about.length) {
      setFormData({ ...formData, [name]: value });
    } else {
      alert("Word limit exceeded! Maximum 200 words allowed.");
    }
  };

  // display count for word max 200
  const getWordCount = () => {
    if (!formData.about) return 0;
    return formData.about
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "").length;
  };

  // handle checkbox
  const handelcheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // handle validation of dob min age 18
  const handledateofbirth = (e) => {
    const inputvalue = e.target.value;

    if (!inputvalue) return;

    const currentyear = new Date().getFullYear();
    const birthyear = inputvalue.split("-")[0];
    const age = currentyear - parseInt(birthyear);
    if (age < 18) {
      setDobError("invalid dob");
    } else {
      setDobError("");
    }
  };

  const sortPhonedata = [...PhoneData].sort(
    (a, b) => b.dial_code.length - a.dial_code.length, // soting longest to shortest
  );

  // handle phone number validation min 8 to 15
  const handlephonecodevalidation = (e) => {
    const phonecode = e.target.value;
    const formatecoderegex = /^[0-9\s\-\+]*$/;

    if (!formatecoderegex.test(phonecode)) {
      setPhoneCodeError("invalid error");
      return;
    }

    const clearnumber = phonecode.replace(/[^0-9]/g, "");

    if (clearnumber.length < 8 || clearnumber.length > 15) {
      setPhoneCodeError("phone no must be  8 to 15 ");
    } else {
      setPhoneCodeError("");
    }
  };

  const handleDialCode = (e) => {
    const newcode = e.target.value;
    const oldcode = formData.dialcode;
    let currentphone = formData.phone;

    if (currentphone.startsWith(oldcode)) {
      currentphone = currentphone.substring(oldcode.length).trim();
    }

    setFormData({
      ...formData,
      dialcode: newcode,
      phone: newcode + currentphone,
    });
  };

  const handlephoneinput = (e) => {
    // phone number ka change
    const inputvalue = e.target.value;
    const matchcontry = sortPhonedata.find((item) =>
      inputvalue.startsWith(item.dial_code),
    );

    setFormData((prev) => ({
      ...prev,
      phone: inputvalue,
      dialcode: matchcontry ? matchcontry.dial_code : prev.dialcode,
    }));
  };

  // final sumbit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clikec");

    const newErrors = {};

    const firstNameError = validateName("First Name", formData.firstname);
    if (firstNameError) newErrors.firstname = firstNameError;

    const lastNameError = validateName("Last Name", formData.lastname);
    if (lastNameError) newErrors.lastname = lastNameError;

    const Fathernameerro = validateName(" Father name ", formData.fathername);
    if (Fathernameerro) newErrors.fathername = Fathernameerro;

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    if (!formData.gender) {
      setGenderError("Please select a gender");
      return;
    }
    console.log("Form Data Submitted:", formData);
    alert("Form Submitted Successfully!");
  };

  const validateName = (name, value) => {
    if (!value.trim()) {
      return `${name} is required`;
    }
    if (value.length < 3) {
      return "Must be at least 3 characters";
    }
    return "";
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>College Form</h1>
        <div className="from-data">
          <h2>Fill this details</h2>

          <form className="from-field" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleFullname}
                  style={{ borderColor: error.firstname ? "red" : "black" }}
                />
                {error.firstname && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {error.firstname}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleFullname}
                  style={{ borderColor: error.lastname ? "red" : "black" }}
                />
                {error.lastname && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {error.lastname}
                  </span>
                )}
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
                  onChange={handleFatherInput}
                  style={{ borderColor: error.lastname ? "red" : "black" }}
                />
                {error.lastname && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {error.lastname}
                  </span>
                )}
              </div>
            </div>

            {/* email setction  */}
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter email"
                required
                name="email"
                value={formData.email}
                onChange={handleInput}
                onBlur={handlEmailvalidation}
                style={{ borderColor: emailerror ? "red" : "" }}
              />
              {emailerror && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {emailerror}
                </span>
              )}
            </div>

            {/* dob section  */}
            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInput}
                  onBlur={handledateofbirth}
                  style={{ borderColor: doberror ? "red " : "" }}
                  required
                />
                {doberror && (
                  <span style={{ color: "red ", fontSize: "12px" }}>
                    {doberror}
                  </span>
                )}
              </div>

              {/* gender section  */}
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
                {genderError && (
                  <span
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    {genderError}
                  </span>
                )}
              </div>
            </div>

            {/* phone number section  */}
            <div className="form-row-phone">
              <div className="form-group-phone">
                <label htmlFor="phonedata">Phone number</label>
                <div className="custom-select-container">
                  <div
                    className="select-trigger"
                    onClick={() => setIScountrycodeopen(!iscountycodeopen)}
                  >
                    {formData.dialcode}
                  </div>
                  {iscountycodeopen && (
                    <div className="options-list">
                      {PhoneData.map((item) => (
                        <div
                          key={item.code}
                          className="option-item"
                          onClick={() => {
                            handleDialCode({
                              target: { value: item.dial_code },
                            });

                            setIScountrycodeopen(false);
                          }}
                        >
                          {item.flag} {item.dial_code}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-input-number">
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
            </div>

            {/* country section  */}
            <div className="form-row">
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
            </div>

            {/* adresss section  */}
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

              {/* pincode */}
              <div className="form-group">
                <label>PIN code:</label>
                <input
                  type="text"
                  placeholder="PIN code"
                  name="pin"
                  value={formData.pin}
                  onChange={handleInput}
                  pattern="[0-9]{6}"
                  maxLength={6}
                />
              </div>
            </div>

            {/* coursese section  */}
            <div className="form-row">
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
            </div>

            <div className="form-row">
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
                  placeholder="Type here ... "
                  rows="5"
                  style={{ width: "100%", padding: "8px" }}
                ></textarea>
                <span style={{ fontSize: "12px", color: "#0c0404" }}>
                  {getWordCount()}/200 words
                </span>
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

export default Form;
