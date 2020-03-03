import React, {Component} from "react";
import {Field} from "redux-form";


export default  ({input})=> {
    console.log(input);
    return (
        <div>
           <input {...input} />
        </div>
    )

};