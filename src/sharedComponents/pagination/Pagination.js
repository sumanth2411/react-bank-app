import React from "react";
import './Pagination.css'
const Pagination = (props) => {
    const totalPages=props.data.totalPages
    const page = () => {
        const pages = [];
        for (let index = 1; index <= totalPages; index++) { 
          pages.push(
            <li key={index} className={`page-item ${props.data.page === index - 1 ? "active" : ""}`}>
              <p className="page-link" onClick={() => props.setPage(index - 1)}>
                {index}
              </p>
            </li>
          );
        }
        return pages;
      };
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <p className="page-link" onClick={()=>{
                if(props.data.page>=1){
                    props.setPage(props.data.page-1)
                }
            }
                
             }>
              Previous
            </p>
          </li>
          {page()}
          <li className="page-item">
            <p className="page-link" onClick={()=>{
                if(!props.data.last){
                    props.setPage(props.data.page+1)
                }
            } }>
              Next
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;