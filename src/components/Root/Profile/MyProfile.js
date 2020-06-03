import React, { useState, seEffect, useEffect } from "react";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import UserDashboard from "../Home/UserDashboard";
import { Redirect } from "react-router-dom";

const updateProfileToMongo = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Content-Type", "text/plain");

  var userObj = {
    firstName: data.firstname,
    lastName: data.lastname,
    phoneNumber: data.phonenumber,
    skillSet: data.skillset,
    unit: data.unit,
  };
  let x = data.userEmail;
  fetch(`http://localhost:5000/user/update/${x}`, {
    method: "put",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Updated data " + data);
    });
};

const MyProfile = (props) => {
  const [locationAPI, setlocationAPI] = useState(null);
  const [status, currentStatus] = useState(null);
  const [groupNo, setGroupNo] = useState(props.location.currentUser?.GroupNo);
  const [firstname, setfirstname] = useState(
    props.location.currentUser?.firstName
  );
  const [lastname, setlastname] = useState(
    props.location.currentUser?.lastName
  );
  const [phonenumber, setphonenumber] = useState(
    props.location.currentUser?.phoneNumber
  );
  const [skillset, setskillset] = useState(
    props.location.currentUser?.skillSet
  );
  const [unit, setunit] = useState(props.location.currentUser?.Unit);
  const [redirection, setredirection] = useState("");
  const [userEmail, setUserEmail] = useState(props.location.currentUser?.email);
  const [userlist, setUserlist] = useState(props.location.userlist);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((result) => {
        setlocationAPI(result);
      });

    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUserlist(data.response));
  }, []);

  if (redirection === "Group") {
    return (
      <Redirect
        to={{
          pathname: "/Group",
          userlist: userlist,
          currentUser: props.location.currentUser,
        }}
      />
    );
  } else if (redirection == "Students") {
    return (
      <Redirect
        to={{
          pathname: "/Students",
          userlist: userlist,
        }}
      />
    );
  }
  else {
    return (
      <div>
        <Form className="App">
          <h1 className="Cen">My Profile</h1>
          <h2 className="Cen">Enter Details</h2>
          <FormGroup>
            <label className="Cen">GroupNo</label>
            <Input
              className="Username"
              type="GroupNo"
              placeholder="GroupNo"
              value={props.location.currentUser?.groupNum}
              onChange={(event) => {
                setGroupNo(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">FirstName</label>
            <Input
              className="Username"
              type="FirstName"
              placeholder="FirstName"
              value={firstname}
              onChange={(event) => {
                setfirstname(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">LastName</label>
            <Input
              className="Username"
              type="LastName"
              placeholder="LastName"
              value={lastname}
              onChange={(event) => {
                setlastname(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">City</label>
            <Input
              className="Username"
              type="LastName"
              placeholder="LastName"
              value={locationAPI?.city}
              onChange={(event) => {
                setlastname(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">State</label>
            <Input
              className="Username"
              type="LastName"
              placeholder="LastName"
              value={locationAPI?.region}
              onChange={(event) => {
                setlastname(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">PhoneNumber</label>
            <Input
              className="Username"
              type="PhoneNumber"
              placeholder="PhoneNumber"
              value={phonenumber}
              onChange={(event) => {
                setphonenumber(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">Skillset</label>
            <Input
              className="Username"
              type="Skillset"
              placeholder="Skillset"
              value={skillset}
              onChange={(event) => {
                setskillset(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">Unit</label>
            <Input
              className="Username"
              type="Unit"
              placeholder="Unit"
              value={unit}
              onChange={(event) => {
                setunit(event.target.value);
              }}
            />
          </FormGroup>

          <Button
            onClick={() =>
              updateProfileToMongo({
                groupNo,
                firstname,
                lastname,
                phonenumber,
                skillset,
                unit,
                userEmail,
              })
            }
            className="block"
          >
            Update
          </Button>
          <Button onClick={() => setredirection("Group")} className="block">
            Group
          </Button>
          <Button onClick={() => setredirection("Students")} className="block">
            StudentsList
          </Button>
        </Form>
      </div>
    );
  }
};

export default MyProfile;
