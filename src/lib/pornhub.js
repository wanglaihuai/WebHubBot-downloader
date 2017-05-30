import superagent from 'superagent';
import cheerio from 'cheerio';
import _ from 'lodash';

const getBestQuality = (infoArr) => {
  let qs = [];
  let ins = [];
  for (const info of infoArr) {
    if (info.videoUrl.length > 0) {
      qs.push(info);
      ins.push(parseInt(info.quality, 10));
    }
  }
  const m = _.max(ins);
  if (m) {
    for (const info of infoArr) {
      if (m === parseInt(info.quality, 10)) {
        return info.videoUrl;
      }
    }
  } else {
    return '';
  }
};

exports.getDownloadUrlFromPageUrl = function (pageUrl) {
  const pm = new Promise((resolve, reject) => {
    // const pageUrl = `https://www.pornhub.com/view_video.php?viewkey=${key}`;
    superagent.get(pageUrl).end((err, res) => {
      const startIndex = res.text.indexOf('mediaDefinitions');
      const endIndex = res.text.indexOf('video_unavailable_country');
      let str = res.text.substring(startIndex, endIndex);
      str = str.substring(18, str.length - 2);
      try {
        const infoArr = JSON.parse(str);
        resolve(getBestQuality(infoArr));
      } catch (error) {
        reject(error);
      }
    });
  });
  return pm;
};