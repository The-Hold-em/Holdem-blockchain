import { generateVote } from "../services/helper.js";
import { getCandidates } from "../services/candidate.js";
import fs from "fs/promises";
import axios from "axios";
import throttledQueue from "throttled-queue";
const throttle = throttledQueue(1, 4); // 1 times per 3 ms

const startTest = (req, res) => {
  const candidates = [
    "da3021653728417b9fdea0d59b41d67e",
    "33c2b734856a4afbacf08f12148b92ff",
    "e77a7d4d0fb844158ab810e54320c271",
    "d9c7d1f1064a4d27a18aae7586faa68b",
    "14c6498bc6f143d8a026a6a49c0666d0",
    "9a09cd92038e4fdb85a52aaea055fc29",
    "0b9a9411edb149b98692b2e2e92e98b8",
    "bc77ba766210431abd7d5a336c3f30c7",
    "3e8c555cea7b48f6a361d8578b8e39ff",
    "3401e2dc7840483799db9806ef475191",
  ];
  const requests = [];
  for (let i = 0; i < req.body.reqcount; i++) {
    let candidate = candidates[Math.floor(Math.random() * candidates.length)];
    let vote = generateVote(candidate);
    throttle(() => {
      axios({
        method: "post",
        url: "http://localhost:3000/pollingstation/recevieVote",
        data: vote,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        maxContentLength: 100000000,
        maxBodyLength: 1000000000,
      })
        .then((res) => {
          console.log(vote);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
};

const fakePoint = (req, res) => {
  console.log(req.body);
  res.status(200).json({ success: true });
};

export default {
  startTest,
  fakePoint,
};
