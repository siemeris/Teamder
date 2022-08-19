import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const SignUpPage = () => {

  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputName1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputName1" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName2"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputLastname1" className="form-label">
                    Lastname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputLastname2"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputAge1" className="form-label">
                    Age
                  </label>
                  <input
                    type="int"
                    className="form-control"
                    id="exampleInputAge3"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInpuGender1" className="form-label">
                    Gender
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInpuGender3"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </form>
            
            <div className="modal-footer m-auto">
              <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Cancel</button>
                <button
                  type="submit"
                  className="btn btn-info"
                  onClick={async () => {
                    await actions.signup({
                      email: email,
                      password: password,
                      name: name,
                      username: username,
                      lastname: lastname,
                      age: age,
                      gender: gender,
                    });
                  }}
                  data-bs-dismiss="modal"
                >
                  Sign Up!!
                </button>
            </div>
         
    </>
  );
};