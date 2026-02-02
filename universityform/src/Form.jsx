import React, { useState, useEffect } from "react";
import "./Form.css";
import InputField from "./component/InputField"; // reusable componnet
import Radiogroup from "./component/Radiogroup"; // resusable componet for radio
import UseForm from "./Customhook/UseForm";
import Countries from "./Data/Countries"; // country data
import courses from "./Data/Courses"; // courses data
import PhoneData from "./Data/Phonedata"; // phonedata
import Checkbox from "./component/Checkbox";
import Textarea from "./component/Textarea";
import SelectGroup from "./component/SelectGroup";
import States from "./Data/States";
import Ugccollegedata from "./Data/Ugccollegedata";
import useDebounce from "./Customhook/useDebounce"; // debounce hook

const validation = (values) => {
  let errror = {};

  //name validation
  if (!values.firstname) {
    errror.firstname = "First Name is required";
  } else if (values.firstname.length < 3) {
    errror.firstname = "Must be at least 3 characters";
  }

  if (!values.lastname) {
    errror.lastname = "Last Name is required";
  } else if (values.lastname.length < 3) {
    errror.lastname = "Must be at least 3 characters";
  }
  if (!values.fathername) {
    errror.fathername = "father name is reqiured";
  } else if (values.fathername.length < 3) {
    errror.fathername = "Must be at least 3 characters";
  }

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

  if (!values.address) {
    errror.address = "address required ";
  } else if (values.address.length < 10) {
    errror.address = "address  must be at least 10 characters";
  }

  //pin
  if (!values.pin) errror.pin = "pin required ";

  // phone validation
  //1 approch is like hardcoding but it take so if else if for all country code
  //2 approch is better we use regex for validation  but it is complex also
  // 3 i use like in phonedata add lenght and then handle it in form.jsx

  if (!values.phone || values.phone.trim() === values.dialcode) {
    errror.phone = "Phone number is required";
  } else {
    const contryData = PhoneData.find(
      (item) => item.dial_code === values.dialcode,
    );

    const registernumber = values.phone.replace(values.dialcode, "").trim();

    if (contryData) {
      if (registernumber.length != contryData.length) {
        errror.phone = `${contryData.name} phone number must be ${contryData.length} digits long `;
      } else {
        const length = PhoneData.map((item) => item.length);
        const minlength = Math.min(...length);
        const maxlength = Math.max(...length);

        if (
          registernumber.length < minlength + 1 ||
          registernumber.length > maxlength + 4
        ) {
          errror.phone = `Invalid phone number length. Must be between ${minlength} and ${maxlength} digits.`;
        }
      }
    }
  }

  // 1. About Section Validation
  if (!values.about || values.about.trim() === "") {
    errror.about = "about yourself required ";
  } else {
    const charCount = values.about.trim().length;
    if (charCount > 200) {
      errror.about = `characters limit exceeded (${charCount}/200)`;
    }
  }

  // 2. Gap Year Validation

  if (values.gap) {
    const gapcharCount = values.gap.trim().length;
    if (gapcharCount > 200) {
      errror.gap = `characters limit exceeded (${gapcharCount}/200)`;
    }
  }

  // nationlity & state
  if (!values.nation) errror.nation = "select nation";
  // if (!values.state) errror.state = "select state";
  // if (!values.country) errror.country = "select country";
  if (!values.courses) errror.courses = "select courses";

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
      phone: "",
      pin: "",
      courses: "",
      marksheet10: false,
      marksheet12: false,
      BCA: false,
      MCA: false,

      about: "",
      gap: "",
      nation: "",
      state_mode: "",
      bcacollgename: "",
      mcacollgename: "",
      gradebca: "",
      grademca: "",
      ugccollege: "",
    },
    validation,
  );

  const [isDialCodeOpen, setIsDialCodeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mathing, setMatching] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 1000);

  const toggleDropdown = (name) => {
    // If clicking the one already open, close it (set to null)
    // Otherwise, open the new one
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearch.trim().length > 0) {
      console.log("Searching DB for:", debouncedSearch); // Debug to prove it works

      const filtered = Ugccollegedata.filter((item) =>
        item.collegeName.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
      setMatching(filtered.slice(0, 3)); // Limit results
    } else {
      setMatching([]);
    }
  }, [debouncedSearch]);

  const handleDialCode = (newCode) => {
    const oldCode = values.dialcode;
    let currentPhone = values.phone;

    if (currentPhone.startsWith(oldCode)) {
      // Remove old code and add new code
      currentPhone = newCode + currentPhone.substring(oldCode.length);
    } else if (!currentPhone.startsWith("+")) {
      // If user typed "98765..." without code, prepend the new code
      currentPhone = newCode + currentPhone;
    }

    setValues({
      ...values,
      dialcode: newCode,
      phone: currentPhone,
    });
    setIsDialCodeOpen(false);
  };

  const sortedPhoneData = [...PhoneData].sort(
    (a, b) => b.dial_code.length - a.dial_code.length,
  );

  const handlephoneinput = (e) => {
    const { value } = e.target;

    const inputValue = value.replace(/[^\d+]/g, ""); // Allow only numbers and '+'

    const finalValue = inputValue.startsWith("+")
      ? "+" + inputValue.slice(1).replace(/\+/g, "")
      : inputValue.replace(/\+/g, "");

    // Check if the typed number starts with any known dial code
    const matchedCountry = sortedPhoneData.find((item) =>
      inputValue.startsWith(item.dial_code),
    );

    let nextvalue = {
      ...values,
      phone: finalValue,
    };

    if (matchedCountry) {
      nextvalue.dialcode = matchedCountry.dial_code;
    }

    setValues(nextvalue);
  };

  // final sumbit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validerrors = validation(values);

    //  const finalErrors = { ...error, ...validErrors };

    // setError(finalErrors);

    // // --- START: DUPLICATE CHECK LOGIC ---

    // // 1. Get the list of students who ALREADY submitted
    const existingData = localStorage.getItem("registered_students");
    const studentList = existingData ? JSON.parse(existingData) : [];

    // // 2. Check if current email exists in that list
    const isDuplicate = studentList.some(
      (student) => student.email === values.email,
    );

    if (isDuplicate) {
      // If found, add an error
      validerrors.email = "Data already present (Email registered)";
    }
    // // --- END: DUPLICATE CHECK LOGIC ---

    setError(validerrors);

    if (Object.keys(validerrors).length === 0) {
      const existingData = localStorage.getItem("registered_students");
      const studentList = existingData ? JSON.parse(existingData) : [];
      // 3. Success! Add to the "Database"
      const newItem = {
        id: Date.now(),
        ...values,
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

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>College Form</h1>
        <div className="from-data">
          <h2>Fill this details</h2>

          <form className="from-field" onSubmit={handleSubmit}>
            {/* name section firstname , lastname  space not include  */}
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
            {/* name section father name space include  */}
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

            {/* dob section  */}
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

              {/* gender section  */}
              <Radiogroup
                label="gender"
                name="gender"
                onChange={handleChange}
                value={values.gender}
                error={error.gender}
                options={["male", "female", "other"]}
              />
            </div>

            {/* address and pin section  */}
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

            <div
              className="form-row"
              style={{ zIndex: isDialCodeOpen ? 100 : 1 }}
            >
              <div className="form-group">
                <label>Phone Number</label>

                <div className="phone-wrapper">
                  {/* 1. Dropdown Section */}
                  <div className="custom-select-container phone-dialcode">
                    <div
                      className="select-trigger"
                      onClick={() => setIsDialCodeOpen(!isDialCodeOpen)}
                    >
                      {(() => {
                        const selectedCountry = PhoneData.find(
                          (item) =>
                            item.dial_code === (values.dialcode || "+91"),
                        );
                        return (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <span>{selectedCountry?.flag}</span>
                            {/* <span>{values.dialcode || "+91"}</span> */}
                          </span>
                        );
                      })()}

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
                              {item.dial_code}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Input Section */}
                  <div className="phone-input-box">
                    <InputField
                      name="phone"
                      placeholder="Enter phone number"
                      value={values.phone}
                      onBlur={handleblur}
                      onChange={handlephoneinput}
                      error={error.phone}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* documetn section  */}

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

            {/* text area about and gap year  */}
            <label>
              About Yourself:
              <div className="form-row">
                <Textarea
                  name="about"
                  value={values.about}
                  onChange={handleChange}
                  onBlur={handleblur}
                  placeholder="Tell us about yourself..."
                  maxChar={200}
                  error={error.about}
                />
              </div>
            </label>

            <label>
              Gap Year Explanation:
              <div className="form-row">
                <Textarea
                  name="gap"
                  value={values.gap}
                  onChange={handleChange}
                  onBlur={handleblur}
                  placeholder="Explain your gap year (if any)..."
                  maxChar={200}
                  error={error.gap}
                />
              </div>
            </label>

            {/* radio nationality and state  */}

            <div
              className={`form-row ${openDropdown === "country" ? "active-row" : ""}`}
            >
              <Radiogroup
                label="Nationality"
                name="nation"
                value={values.nation}
                onChange={handleChange}
                error={error.nation}
                options={["India", "Nepal", "other"]}
              />

              {values.nation === "other" && (
                <div className="fade-in-field" style={{ flex: 1 }}>
                  <SelectGroup
                    label="Country if other "
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    options={Countries}
                    placeholder="Select Country"
                    // error={error.country}
                    // 3. PASS CONTROL PROPS
                    isOpen={openDropdown === "country"} // Is this one open?
                    onToggle={() => toggleDropdown("country")} // Function to click
                  />
                </div>
              )}
            </div>

            <div
              className={`form-row ${openDropdown === "state" ? "active-row" : ""}`}
            >
              <Radiogroup
                label="state"
                name="state_mode"
                value={values.state_mode}
                onChange={handleChange}
                error={error.state_mode}
                options={["MP", "other"]}
              />

              {/*  state section  */}
              {values.state_mode === "other" && (
                <div className="fade-in-field" style={{ flex: 1 }}>
                  <SelectGroup
                    label="choose state if other :"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    options={States}
                    placeholder="Select State"
                    // error={error.state}
                    isOpen={openDropdown === "state"}
                    onToggle={() => toggleDropdown("state")}
                  />
                </div>
              )}
            </div>

            <div
              className={`form-row ${openDropdown === "courses" ? "active-row" : ""}`}
            >
              {/* 2. Course Select */}
              <SelectGroup
                label="Courses"
                name="courses"
                value={values.courses}
                onChange={handleChange}
                options={courses}
                placeholder="Select Course"
                error={error.courses}
                isOpen={openDropdown === "courses"}
                onToggle={() => toggleDropdown("courses")}
              />
            </div>

            {/* college name section  */}
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

            <div className="form-group">
              <label>Grade:</label>

              <div className="grade-container">
                <input
                  className="gardelist"
                  list="grade-list"
                  name="gradebca"
                  value={values.gradebca}
                  onChange={handleChange}
                  placeholder="Enter a Grade  BCA:"
                />
                <datalist id="grade-list">
                  <option>+A</option>
                  <option>A</option>
                  <option>+B</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>F</option>
                </datalist>

                <input
                  className="gardelist"
                  list="grade-list"
                  name="grademca"
                  value={values.grademca}
                  onChange={handleChange}
                  placeholder="Enter a Grade MCA:"
                />
                <datalist id="grade-list">
                  <option>+A</option>
                  <option>A</option>
                  <option>+B</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>F</option>
                </datalist>
              </div>

              <div className="form-group">
                <label>UGC Approved College Search:</label>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="search bar.."
                    name="ugccollege"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                  />
                </div>
                <ul>
                  {mathing &&
                    mathing.map((item, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            searchTerm(item.collegeName);
                          }}
                          className={
                            searchTerm === item.collegeName ? "selected" : ""
                          }
                        >
                          {item.collegeName}
                        </li>
                      );
                    })}
                </ul>
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
