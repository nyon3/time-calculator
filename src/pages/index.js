
import React, { useState } from "react"
import Layout from "../components/layout"

// Styling
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import "./global.sass"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const IndexPage = () => {
  const [arrivedHour, setArrivedHour] = useState(0);
  const [arrivedMinute, setArrivedMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();

  const classes = useStyles();

  //   make list for minutes
  const hours = [...Array(12)].map((_, i) => i + 10);

  const hoursList = hours.map((hour) => {
    const time = {};
    time.value = hour;
    time.label = hour;

    return (
      <MenuItem value={time.value} label={time.label}>
        {time.label}
      </MenuItem>
    );
  });

  const minutes = [...Array(60)].map((_, j) => j + 1);
  const minuteList = minutes.map((minute) => {
    const m = {};
    m.value = minute;
    m.label = minute;

    return (
      <option value={m.value} label={m.label}>
        {m.label}
      </option>
    );
  });

  const end = new Date(year, month, date, arrivedHour, arrivedMinute, 0);

  //   get current hour
  const handleSubmit = (e) => {
    e.preventDefault();

    //   calc difference time between start and end
    const diff = today.getTime() - end.getTime();
    let t2 = Math.round(diff / 1000);
    let h = Math.floor(t2 / 3600);
    let m = Math.floor((t2 - h * 3600) / 60);
    let s = Math.floor(t2 - h * 3600 - m * 60);
    console.log(h + "時間" + m + "分" + s + "秒"); //1時間1分0秒
    setHour(h);
    setMinute(m);
  };

  return (
    <Layout title="" description="">

      <div className="content">
        <div>
          <h2>Customer arrived at</h2>
          <br />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Hour</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={arrivedHour}
              onChange={(e) => setArrivedHour(e.target.value)}
              label="Hour"
            >
              <option value="">Hour</option>
              {hoursList}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Minute</InputLabel>
            <Select
              value={arrivedMinute}
              onChange={(e) => setArrivedMinute(e.target.value)}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Minute"
            >
              <option value="">Minute</option>
              {minuteList}
            </Select>
          </FormControl>
          <br />
          <p className="currentTime">{`Leaving at ${currentHour} : ${currentMinute} `}</p>
          <br />
          <h1>{`Total ${hour} : ${minute} `}</h1>
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >Submit
        </Button>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage
