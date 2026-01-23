import React from 'react'

const Textarea = ({name , value ,onChange , placeholder ,  maxWords = 200 , onlBur ,...props}) => {


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
        //   onlBur={onlBur}
          {...props}
          rows="5"
          style={{width:"100%" , padding:'8px'}}
        ></textarea> 
         <span style={{ fontSize: "12px", color: "#0c0404" }}>
              {getWordCount()}/{maxWords}
         </span>

         
      
    </div>
  )
}

export default Textarea ;

