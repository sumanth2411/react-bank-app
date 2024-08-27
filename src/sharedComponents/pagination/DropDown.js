
import React from "react";
import './DropDown.css'
const Dropdown = (props) => {
    const options=()=>{
        const sizes=[]
        for(let i=1;i<=props.data.totalElements;i++){
            
            sizes.push(
                <option value={i}>{i}</option>
            )
        }
        return sizes;
        
    }
    const handleChange = (e) => {
        props.setSize(e.target.value); 
      };
    
      return (
        <div>
          <select className="form-select" aria-label="Default select example" onChange={handleChange}>
            <option value="" disabled selected>
              page size
            </option>
            {options()}
          </select>
        </div>
      );
    };
    
    export default Dropdown;