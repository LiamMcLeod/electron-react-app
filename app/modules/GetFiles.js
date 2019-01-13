import fs from 'fs';

export default function getFileAsync(id, cb) {
  var file = new Promise(resolve => {
    const path = __dirname + '\\tmp\\sims\\' + id;
    var json = getFile(id, JSON.parse(fs.readFileSync(path)));
    resolve(json);
    cb(json);
  });
  return file;
}

function getFile(id, file) {
  var date = new Date(0);
  date.setUTCSeconds(file.timestamp);
  // date = date.toLocaleDateString();
  date = date.toLocaleString();
  return {
    id: id,
    data: {
      name: file.sim.players[0].name,
      dps: Math.round(file.sim.players[0].collected_data.dps.mean),
      timestamp: file.timestamp,
      dateTime: date
    }
  };
}
