import mongoose from 'mongoose';
import downloader from './lib/downloader';
import pornhub from './lib/pornhub';
import Porn from './models/Porn';
import { NUM } from './config';

const task = async function () {
  try {
    const porns = await getPorns();
    for (const porn of porns) {
      const videoUrl = await pornhub.getDownloadUrlFromPageUrl(porn.link_url);
      console.log(videoUrl);
      const ok = await downloader.downloadFromUrl(videoUrl);
      if (ok !== true) {
        continue;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getPorns = () => {
  const pm = new Promise((resolve, reject) => {
    Porn.find({}).limit(NUM).exec((err, porns) => {
      if (err) {
        reject(err);
      }
      resolve(porns);
    });
  });

  return pm;
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PornHub');
const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
});
db.once('open', () => {
  task();
});