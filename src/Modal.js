import React from "react";
import './style.css'
import App from './App'

const Modal = () => {
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalLong"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Cropper
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span style={{width:'20px', height:'20px', marginTop:'0px', marginLeft:'0px' }} aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <App/>
                
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
