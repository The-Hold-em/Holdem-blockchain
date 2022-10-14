const { ElectionTimer } = require("../services/timer");
exports.votes = [];
exports.voteListHash = [];
exports.electionTimer = new ElectionTimer();
exports.processStartTime = 0;
exports.processEndTime = 0;
exports.serverStatus = false;
