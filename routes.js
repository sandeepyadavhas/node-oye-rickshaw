const router = require("express").Router();
const { getDB } = require("./db");

const DB = getDB();

async function setRickshawLocation(req, res) {
    request_data = req.body;
    if (!request_data || request_data.rickshaw_id == null || request_data.latitude == null || request_data.longitude == null) {
        return res.status(400).json({
            "status": false,
            "message": "longitude, latitude and rickshaw_id field required",
            "data": null
        })
    }

    loc = {
        "type": "Point",
        "coordinates": [request_data.longitude, request_data.latitude]
    }
    await DB.collection("rickshaw").updateOne({"_id": request_data.rickshaw_id}, {"$set": {"location": loc}})
    return res.status(200).json({
        "status": true,
        "message": "Coordinates of rickshaw successfully updated",
        "data": null
    })
}

async function getNearbyRickshaw(req, res) {
    request_data = req.query;
    if (!request_data || request_data.latitude == null || request_data.longitude == null) {
        return res.status(400).json({
            "status": false,
            "message": "longitude and latitude field required",
            "data": null
        })
    }

    maxDistance = parseInt(request_data.max_distance_in_meters || 200);
    ls = await DB.collection("rickshaw").find({"location": {"$near": {
        "$geometry": { "type": "Point",  "coordinates": [parseFloat(request_data.longitude), parseFloat(request_data.latitude)] },
        "$maxDistance": maxDistance
    }}}).toArray()
    return res.status(200).json({
        "status": true,
        "message": `Rickshaws in nearby ${maxDistance} meters`,
        "data": ls
    })
}

async function addBulkRandomRickshaws(req, res) {
    const uuid = require("uuid")
    await DB.collection("rickshaw").deleteMany({})
    ls = []
    for (let i=0;i<1000;i++) {
        // Setting up random gurgaon coordinates
        loc = {
            "type": "Point",
            "coordinates": [
                randomInteger(770132248, 770311825)/10000000,
                randomInteger(284487046, 285382714)/10000000,
            ]
        }
        ls.push({
            "_id": uuid.v4(),
            "name": makeid(5),
            "location": loc
        })
    }
    await DB.collection("rickshaw").insertMany(ls)
    await DB.collection("rickshaw").createIndex({"location": "2dsphere"})

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return res.status(200).json({
        "status": true,
        "message": "Dummy data added in DB",
        "data": ls
    })
}

router.post("/rickshaw-location", setRickshawLocation);
router.get("/nearby-rickshaws", getNearbyRickshaw);
router.post("/add-bulk-random-rickshaws", addBulkRandomRickshaws);

module.exports = router;
