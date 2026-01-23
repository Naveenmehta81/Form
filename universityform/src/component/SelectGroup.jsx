import React, { useState } from "react";

const SelectGroup = ({ label, name, value, onChange, options, placeholder, error }) => {
  // 1. Internal state to handle open/close automatically
  const [isOpen, setIsOpen] = useState(false);

  // 2. Helper to send data back to Form.js
  const handleSelect = (selectedValue) => {
    // Create a fake event so your main handleChange works without changes
    const fakeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };
    
    onChange(fakeEvent); // Update the main form state
    setIsOpen(false);    // Close the dropdown immediately
  };

  // 3. Find the Label (e.g., turn "IN" into "India")
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="form-group">
      <label>{label}:</label>
      
      <div className="custom-select-container">
        {/* The Trigger Box */}
        <div 
          className="select-trigger" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </div>

        {/* The Dropdown List */}
        {isOpen && (
          <div className="options-list">
            {options.map((option) => (
              <div
                key={option.value}
                className="option-item"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <span style={{ color: "red", fontSize: "12px", marginTop: "5px", display: "block" }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default SelectGroup;




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