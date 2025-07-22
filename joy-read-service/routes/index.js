import express from 'express'
import DeviceDetector from "node-device-detector";
import DeviceHelper from "node-device-detector/helper.js";
import db from '../models/index.js'
import { articlesIndex } from '../utils/meilisearch.js';

const { Article, User } = db

const router = express.Router()
const deviceDetector = new DeviceDetector()

router.get('/', (req, res) => {
  const userAgent = req.headers['user-agent'];
  console.log('userAgent:', userAgent);

  const device = deviceDetector.detect(userAgent);
  const deviceType = DeviceHelper.getDeviceType(device);
  const clientType = DeviceHelper.getClientType(device);
  const ret = {
    device,
    deviceType,
    clientType,
  }
  
  res.send(ret)
})

router.get('/search', async (req, res) => { 
  // const articles = await Article.findAll({attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt']});

  // await articlesIndex.addDocuments(articles);

  res.send('ok, success')

})

export default router
