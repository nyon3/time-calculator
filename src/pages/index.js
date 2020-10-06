
import React, { useState } from "react"
import Layout from "../components/layout"
import { Button } from '@material-ui/core';

import "./global.sass"

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

  //   make list for minutes
  const hours = [...Array(12)].map((_, i) => i + 10);

  const hoursList = hours.map((hour) => {
    const time = {};
    time.value = hour;
    time.label = hour;

    return (
      <option value={time.value} label={time.label}>
        {time.label}
      </option>
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

      <div className="section has-text-centered">
        <h1 className="test">Arrived at </h1>
        <br />
        <div class="select is-large">
          <select
            class="select is-large"
            value={arrivedHour}
            onChange={(e) => setArrivedHour(e.target.value)}
          >
            <option value="">Hour</option>
            {hoursList}
          </select>
        </div>
        <div class="select is-large">
          <select

            value={arrivedMinute}
            onChange={(e) => setArrivedMinute(e.target.value)}
          >
            <option value="">Minute</option>
            {minuteList}
          </select>
        </div>
        <br />
        <p>{`Leaving at ${currentHour} : ${currentMinute} `}</p>
        <br />
        <h1 className="is-size-2 has-text-weight-bold">{`Total ${hour} : ${minute} `}</h1>
        <br />
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >Submit
        </Button>
        <br />
      </div>
    </Layout>
  );
};

export default IndexPage
