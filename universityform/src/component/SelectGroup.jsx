import React, { useState } from "react";

const SelectGroup = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  // error,
  isOpen, 
  onToggle
}) => {

  // 1. New state for the search text
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (selectedValue) => {
    const fakeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };

    onChange(fakeEvent);
    onToggle();
    setSearchTerm(""); // Reset search after selection
  };

  // 2. Filter logic: ignores case and matches label
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="form-group">
      <label>{label}:</label>

      <div className="custom-select-container">
        {/* The Trigger Box */}
        <div className="select-trigger" onClick={onToggle}>
          {selectedOption ? selectedOption.label : placeholder}
          <span className="arrow">{isOpen ? "▲" : "▼"}</span>
        </div>

        {/* The Dropdown List */}
        {isOpen && (
          <div className="options-list">
            {/* 3. The Search Bar Input */}
            <div className="search-box-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus // Automatically focus when dropdown opens
                onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when clicking input
              />
            </div>

            {/* 4. Display Filtered Options */}
            <div className="options-scroll-area">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`option-item ${value === option.value ? "selected" : ""}`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="no-results">No matches found</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>} */}
    </div>
  );
};

export default SelectGroup;


{
  /* <div className="form-input-number">
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
            </div> */
}

{
  /* country section  */
}
{
  /* <div className="form-row">
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
            </div> */
}

{
  /* coursese section  */
}
{
  /* <div className="form-row">
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
            </div> */
}
