import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import UserContext from "../util/UserContext";
import { colors } from "../util/theme";


window.$name = "";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, width: 1000, bgcolor : colors["AVAILABLE"] }}>
         
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}



const Basic = () => {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Logged in as: 
        </Typography>
      </CardContent>
    </Card>
  );
};



const MyInfo = () => {
  const [name, setName] = useState ("");
  const EditInfoo = () => {

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

    


    const handleClick = () => {
    setName(state.fullName);
  };

    return (
      <div className="App">
        <header>
          <div className="container">
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
                  <div className="control">
                    <button 
                      type="submit"
                      value="Submit"
                      className="button is-primary"
                      onClick={handleClick}
                    >submit</button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  };
  const [mode, setMode] = useState("look");

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color = {colors["AVAILABLE"]} gutterBottom>
            My Info
          </Typography>
          <Typography sx={{fontSize: 25}} component="div">
            Name: {name}
          </Typography>

          <Typography sx={{fontSize: 20}} >
            Role:
            <br />
            {'"Student/Teacher"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setMode(["editing"])}>
            Edit Info
          </Button>
        </CardActions>
      </Card>
      <div>
        {mode[0] === "looking" && <MyInfo />}
        {mode[0] === "editing" && <EditInfoo />}
      </div>
    </div>
  );
};

const MyDescription = () => {
  const [name, setName] = useState ("");
   const EditInfoo = () => {

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

    


    const handleClick = () => {
    setName(state.fullName);
  };

    return (
      <div className="App">
        <header>
          <div className="container">
          </div>
        </header>
        <div className="container">
          <div className="columns">
            <div className="column is-9">
              <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">My Info</label>
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
                  <div className="control">
                    <button 
                      type="submit"
                      value="Submit"
                      className="button is-primary"
                      onClick={handleClick}
                    >submit</button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  };
  const [mode, setMode] = useState("look");
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Typography sx={{ fontSize: 20 }} color = {colors["AVAILABLE"]} gutterBottom>
            My description
          </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          About Me: {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setMode(["editing"])}>
          Edit Info
          </Button>
      </CardActions>
      <div>
        {mode[0] === "looking" && <MyInfo />}
        {mode[0] === "editing" && < EditInfoo/>}
      </div>
    </Card>
  );
};

const MyContacts = () => {
  const [mode, setMode] = useState("look");
  const [mail, setMail] = useState ("");
  const [number, setNumber] = useState ("");
  const [socials, setSocials] = useState ("");
   const EditInfoo = () => {

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
      const mail = target.mail;
      const socials = target.socials;
      const number = target.number;
  
      setState((state) => ({
        ...state,
        [mail]: value.mail,
        [number]: value.number,
        [socials]: value.socials
        
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(state);
    };

    const handleClick = () => {
    setMail(state.mail);
    setNumber(state.number);
    setSocials(state.socials);
  };

    return (
      <div className="App">
        <header>
          <div className="container">
          </div>
        </header>
        <div className="container">
          <div className="columns">
            <div className="column is-9">
              <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Phone number</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="number"
                      value={state.number}
                      onChange={handleChange}
                    />
                  </div>
                  <label className="label">E-mail</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="mail"
                      value={state.mail}
                      onChange={handleChange}
                    />
                  </div>
                  <label className="label">Socials</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="socials"
                      value={state.soacials}
                      onChange={handleChange}
                    />
                  </div>
                </div>
  

                  
                <div className="field">
                  <div className="control">
                    <button 
                      type="submit"
                      value="Submit"
                      className="button is-primary"
                      onClick={handleClick}
                    >submit</button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Typography sx={{ fontSize: 20 }} color = {colors["AVAILABLE"]} gutterBottom>
            My contacts
          </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          E-mail: {mail}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color = "text.secondary">
          Phone Number: {number}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary">
          Socials: {socials}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setMode(["editing"])}>Edit Info</Button>
      </CardActions>
       <div>
        {mode[0] === "looking" && <MyInfo />}
        {mode[0] === "editing" && < EditInfoo/>}
      </div>
    </Card>
  );
};

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const { user } = useContext(UserContext); // get user for which the profile page is opened (Note: currently can only see profile page of oneself, in the future, when viewing the profile page, the user's id should be encoded in the route)

  let currentUser; // the current user for which we retreive the profile data - all of the data of the user will be availabe in this object
  // //* Fetching logic
  useEffect(() => {
    console.log("Use Effect has triggered!");

    // fetching user from backend
    // Note: Since this (Profile.js) component is independent from the user type, i.e. we use the same component for teacher or student, here I check with an if whether we have a student or teacher, to fetch the correct API Endpoint
    let resStatus;
    if (user[0] == "Teacher") {
      fetch(`http://localhost:5000/api/teachers/${user[1]}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((data) => {
          // if response failed
          if (resStatus === 500) {
            throw new Error(data.message);
            return;
          }
          console.log("Successfully fetched teacher");
          console.log(data.teacher);
          currentUser = data.teacher;
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (user[0] == "Student") {
      fetch(`http://localhost:5000/api/students/${user[1]}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          resStatus = res.status;
          return res.json();
        })
        .then((data) => {
          // if response failed
          if (resStatus === 500) {
            throw new Error(data.message);
            return;
          }
          console.log("Successfully fetched student");
          console.log(data.student);
          currentUser = data.student;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Basic />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="My Info" {...a11yProps(0)} />
          <Tab label="My Description" {...a11yProps(1)} />
          <Tab label="My Contacts" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <MyInfo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyDescription />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyContacts />
        </TabPanel>
      </Box>
    </div>
  );
}

// export default function Profile() {
//   //const [user, setUser] = useState(["Teacher", TEACHERID]); // state contains user type and user ID
//   return (
//     <div className="Profile">
//       {/* <UserContext.Provider value={{ user, setUser }}> */}
//         {" "}
//         {/*the user type and user ID will now be globaly available with useContext*/}
//         <nav>
//           <Box sx = {{height: "30px", display: "flex", alignItems: "center"}}>
//             <button onClick={() => setUser(["Student", STUDENTID])}>
//               Student
//             </button>
//             <button onClick={() => setUser(["Teacher", TEACHERID])}>
//               Teacher
//             </button>
//             <h5>{user[0]}</h5>
//           </Box>
//         </nav>
//         <div>
//           {user[0] === "Student" && <StudentApp />}
//           {user[0] === "Teacher" && <TeacherApp />}
//         </div>
//       {/* </UserContext.Provider> */}
//     </div>
//   );
// }