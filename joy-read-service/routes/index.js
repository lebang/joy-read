import express from 'express'
import DeviceDetector from "node-device-detector";
import DeviceHelper from "node-device-detector/helper.js";

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

export default router
