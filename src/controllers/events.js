const { InfluxDB, Point } = require('@influxdata/influxdb-client')
const app = require('../app');

const url = 'http://localhost:3001';
const token = 'E0Vp9-sbGMe76qcF5X22wOXGx_HTw1pqGW02xejwg97Gcm2IBI8krN_o40U3CtNoYjtlhI5vEf29uyDdmkhLdw==';
const org = 'example';
const bucket = 'example';

const influxDB = new InfluxDB({ url, token });
const writeClient = influxDB.getWriteApi(org, bucket, 'ns')

app.post('/user-event', async (req, res) => {
    const sessionId = req.sessionID;
    const { event, meta } = req.body;
    let point = new Point('user-clicks')
        .tag('sessionId', sessionId)
        .tag('event', event)
        .intField('clicks', 1);
    
    Object.entries((meta || {})).forEach(([k, v]) => point = point.tag(k.toString(), JSON.stringify(v)));
    
    writeClient.writePoint(point);
    writeClient.flush();

    res.type('application/json');
    res.send('{"status": "OK"}');
});
