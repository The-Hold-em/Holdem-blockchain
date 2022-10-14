const axios = require("axios");
const SignVoteList = require("../helpers/signdata");
const State = require("../helpers/state");
fs = require("fs");

exports.SendVoteList = () => {
  State.processStartTime = new Date().getTime();
  var data = State.votes;
  const sign = SignVoteList.sign_vote_list();
  const publicKey = process.env.POLLING_STATION_PUBLIC_KEY;
  State.votes = [];
  State.voteListHash = [];
  if (data && data !== null && data.length > 0) {
    console.log("Sending..");
    axios({
      method: "post",
      url: "http://localhost:5000/node/receiveVoteList",
      data: {
        pollingStationPublicKey: publicKey,
        signature: sign,
        votes: data,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
    })
      .then((res) => {
        console.log(
          "\n####################################################################\n"
        );
        console.log(`This vote list was successfully sended: ${res.status}`);
        State.processEndTime = new Date().getTime();
        console.log(
          "\n Process Time: " + (State.processEndTime - State.processStartTime)
        );
        console.log(
          "\n####################################################################\n"
        );
        fs.writeFileSync(
          "processTimes.txt",
          "Process time: " +
            (State.processEndTime - State.processStartTime) +
            "\n",
          { encoding: "utf8", flag: "a+" }
        );
      })
      .catch((error) => {
        console.error(error);
      });
    // axios
    //   .post("http://localhost:5000/node/receiveVoteList", {
    //     pollingStationPublicKey: publicKey,
    //     signature: sign,
    //     votes: data,
    //   })
    //   .then((res) => {
    //     console.log(`This vote list was successfully sended: ${res.status}`);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }
};
