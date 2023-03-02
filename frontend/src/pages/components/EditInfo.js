import React, { useState, useContext, useEffect } from "react";

const App = () => {
    const [state, setState] = React.useState({
      fullName: "",
      surname: "",
      password: "",
      editor: "",
      message: "",
      terms: false,
      test: ""
    });
  
    const handleChange = (event) => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
  
      setState((state) => ({
        ...state,
        [name]: value
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
    };
  
    return (
      <div className="App">
        <header>
          <div className="container">
            <nav className="navbar">
              <div className="navbar-brand">
                <span className="navbar-item">Forms in React</span>
              </div>
            </nav>
          </div>
        </header>
        <div className="container">
          <div className="columns">
            <div className="column is-9">
              <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="fullName"
                      value={state.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
  
                <div className="field">
                  <label className="label">Surname</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="surname"
                      value={state.surname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                  
                <div className="field">
                  <div className="control">
                    <input
                      type="submit"
                      value="Submit"
                      className="button is-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="column is-3">
              <pre>
                <code>
                  <p>Full Name: {state.fullName}</p>
                  <p>Surname: {state.surname}</p>

                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default App
  