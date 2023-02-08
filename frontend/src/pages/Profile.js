import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


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
        <Box sx={{ p: 3 }}>
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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

var Name = "Jessica";
var Surname = "White";

const Basic = () => {

  
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Logged in as: {Name} {Surname} 
        </Typography>
        </CardContent>
    </Card>
  );
}

const MyInfo = () => {
  const Edit = () => {
    
    return (
      <Card>
        <form>
          <label>
            Name: 
            <input type="text" name="name"  id = "Name" />
          </label>
          <label>
            Surname: 
            <input type="text" name="surname" />
          </label>
          <button type="submit" value="Submit">Submit</button>
        </form>
        </Card>
        );
  }

    const [mode, setMode] = useState ("look");
    const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>)
    return(
    <div>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          My Info
        </Typography>
        <Typography variant="h5" component="div">
          Name: {Name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Surname: {Surname}
        </Typography>
        <Typography variant="body2">
          Role:
          <br />
          {'"Student/Teacher"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setMode(["editing"])}>Edit Info</Button>
      </CardActions>
    </Card>
    <div>
    {mode[0] === "looking" && <MyInfo />}
    {mode[0] === "editing" && <Edit />}
    </div>
    </div>
    );
}


const MyDescription = () => {

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          About Me:
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit Info</Button>
      </CardActions>
    </Card>
  );
}

const MyContacts = () => {

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          E-mail:
        </Typography>
        <Typography variant="h5" component="div">
          Phone Number:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Socials:
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit Info</Button>
      </CardActions>
    </Card>
  );
}



export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div><Basic/>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="My Info" {...a11yProps(0)} />
        <Tab label="My Description" {...a11yProps(1)} />
        <Tab label="My Contacts" {...a11yProps(2)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        <MyInfo/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyDescription/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MyContacts/>
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