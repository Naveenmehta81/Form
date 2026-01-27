import React from 'react'

const Textarea = ({name , value ,onChange , placeholder ,  maxWords = 200 , onBlur , error ,...props}) => {


    const getWordCount = () =>{
    if(!value) return 0 ; 
     return value.
                trim()
       .split(/\s+/)
      .filter((word) => word !== "").length;
             }

  return (
    <div className='form-group'>
        <textarea
          className='textarea'
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder} 
           onBlur={onBlur}
          {...props}
          rows="5"
          style={{width:"100%" , padding:'8px'}}
        ></textarea>
  <div    
          
          style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
        
        {/* 1. Error Message */}
        <span style={{ color: "red", fontSize: "12px" }}>
          {error}
        </span>

        {/* 2. Word Count (Always Visible) */}
        <span style={{ fontSize: "12px", color: "#0c0404" }}>
          {getWordCount()}/{maxWords} words
        </span>
        
      </div>
         
      
    </div>
  )
}

export default Textarea ;

