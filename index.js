require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'application/octet-stream', limit: '50mb' }));

app.use(async (req, res, next) => {
  const domain = req.get('host');
  console.log(`${req.method} ${domain}${req.url}`);
  //console.log(`Headers: ${JSON.stringify(req.headers)}`);
  if (req.method === "POST") {
    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        console.log(`Body: ${JSON.stringify(req.body)}`);
    } else if (req.headers["content-type"] === "application/octet-stream") {
        console.log(`Body [first 50 bytes as hex] (size of ${req.body.length} bytes): ${req.body.toString('hex').slice(0,100)}`);
    } else {
        console.warn(`Unhandled content-type on post request! ${req.headers["content-type"]}`)
    }
  }
  next();
});

// bpgapiv2.heroku/system/whatever
/* Sales sorted in order of how they are found in the game's xml files */
let sales={
    status: true,
    code: 20000,
    data: {
        sales: {
            rods: [
                // coins
                {itemId: "rod_icon_wood", purchaseCost: 0},
                {itemId: "rod_icon_red", purchaseCost: 25},
                {itemId: "rod_icon_blue", purchaseCost: 100},
                {itemId: "rod_icon_purple", purchaseCost: 250},
                {itemId: "rod_icon_bamboo", purchaseCost: 500},
                {itemId: "rod_icon_spoon", purchaseCost: 750},
                {itemId: "rod_icon_snowflake", purchaseCost: 1000},
                {itemId: "rod_icon_bone", purchaseCost: 1500},
                // pearls
                {itemId: "rod_icon_furry", purchaseCost: 10},
                {itemId: "rod_icon_wand", purchaseCost: 10},
                {itemId: "rod_icon_key02", purchaseCost: 10},
                {itemId: "rod_icon_musicnote", purchaseCost: 10},
                {itemId: "rod_icon_golf", purchaseCost: 10},
                {itemId: "rod_icon_antenna", purchaseCost: 10},
                // coins
                {itemId: "rod_icon_vine", purchaseCost: 4000},
                // pearls
                {itemId: "rod_icon_catteaser", purchaseCost: 10},
                {itemId: "rod_icon_scarybranch", purchaseCost: 10},
                {itemId: "rod_icon_candycane", purchaseCost: 10},
                {itemId: "rod_icon_skeleton", purchaseCost: 5},
                {itemId: "rod_icon_green", purchaseCost: 2},
                {itemId: "rod_icon_sniper", purchaseCost: 5},
            ],
            baits: [
                // coins
                {itemId: "bait_icon_bug01", purchaseCost: 15}, // WHY DOES THIS HAVE A PRICE YOU CANNOT BUY IT
                {itemId: "bait_icon_bug02", purchaseCost: 20},
                {itemId: "bait_icon_bug03", purchaseCost: 25},
                {itemId: "bait_icon_worm01", purchaseCost: 35},
                {itemId: "bait_icon_worm02", purchaseCost: 45},
                // pearls
                {itemId: "bait_icon_pellet01", purchaseCost: 2},
                {itemId: "bait_icon_pellet02", purchaseCost: 3},
                {itemId: "bait_icon_pellet03", purchaseCost: 4},
                {itemId: "bait_icon_pellet04", purchaseCost: 5}
            ],
            foods: [
                // coins
                {itemId: "food01", purchaseCost: 20},
                {itemId: "food02", purchaseCost: 30},
                {itemId: "food03", purchaseCost: 40},
                {itemId: "food04", purchaseCost: 45},
                {itemId: "food05", purchaseCost: 45},
                {itemId: "food06", purchaseCost: 45},
                {itemId: "food07", purchaseCost: 45},
                {itemId: "food08", purchaseCost: 45},
                {itemId: "food09", purchaseCost: 45},
                {itemId: "food10", purchaseCost: 45},
                {itemId: "food11", purchaseCost: 45},
                {itemId: "food12", purchaseCost: 45},
                {itemId: "food13", purchaseCost: 45},
                {itemId: "food14", purchaseCost: 45},
                {itemId: "food15", purchaseCost: 45},
                {itemId: "food16", purchaseCost: 45},
                {itemId: "food17", purchaseCost: 45},
            ],
            // this includes tank upgrades... idk why
            backgrounds: [
                // coins
                {itemId: "tank_upgrade01", purchaseCost: 500},
                // pearls
                {itemId: "tank_upgrade02", purchaseCost: 10},
                {itemId: "tank_upgrade03", purchaseCost: 10},
                {itemId: "tank_upgrade04", purchaseCost: 10},
                {itemId: "tank_upgrade05", purchaseCost: 15},
                {itemId: "tank_upgrade06", purchaseCost: 20},
                // coins
                {itemId: "tank_background01", purchaseCost: 0},
                {itemId: "tank_background05", purchaseCost: 500},
                {itemId: "tank_background02", purchaseCost: 1000},
                // pearls
                {itemId: "tank_background07", purchaseCost: 10},
                {itemId: "tank_background03", purchaseCost: 10},
                {itemId: "tank_background04", purchaseCost: 10},
                {itemId: "tank_background06", purchaseCost: 10},
                {itemId: "tank_background08", purchaseCost: 10},
                // coins
                {itemId: "tank_background09", purchaseCost: 2000},
                {itemId: "tank_background10", purchaseCost: 1500},
                {itemId: "tank_background11", purchaseCost: 2500},
                // pearls
                {itemId: "tank_background12", purchaseCost: 10},
                // coins
                {itemId: "tank_background13", purchaseCost: 5000},
                // pearls
                {itemId: "tank_background14", purchaseCost: 10},
                {itemId: "tank_background15", purchaseCost: 10},
                {itemId: "tank_background16", purchaseCost: 10},
            ]
        }
    }
}
let version={status: true, data: {version: {aqua_pets: "1.3.22"}}}, news={status: true, data: {}};

app.get("/sales.json", async (req, res, next) => {
  res.status(200).json(sales);
});

app.get("/system/version.json", async (req, res, next) => {
  res.status(200).json(version);
});

app.get("/system/news.json", async (req, res, next) => {
  res.status(200).json(news);
});

// bpgapiv2.heroku/client/whatever
let invites={status: true, data: {}}, gifts={status: true, data: {}}, sessions={status: false, data: {}}, users={status: true, data: {}}, friendlist={status: false, code: 60006, data: {friendlist:"[]"}};

app.get("/client/invites.json", async (req, res, next) => {
  res.status(200).json(news);
});

app.get("/client/gifts.json", async (req, res, next) => {
  res.status(200).json(gifts);
});

app.get("/client/friendlist.json", async (req, res, next) => {
  res.status(200).json(friendlist);
});

app.post("/client/sessions.json", async (req, res, next) => {
  // POST REQUEST
  res.status(200).json(sessions);
});

app.post("/client/users.json", async (req, res, next) => {
  // POST REQUEST
  res.status(200).json(users);
});

// bpgapiv2.keroku/aquapets/whatever
let messages={status: true, data: {}}, save={status: false, data: {}};

app.get("/aquapets/messages.json", async (req, res, next) => {
  res.status(200).json(messages);
});

app.post("/aquapets/save.json", async (req, res, next) => {
  // POST REQUEST
  res.status(200).json(save);
});

// bgpapiv2.heroku/time

app.get("/time/now.json", async (req, res, next) => {
	res.status(200).json({status: true, data: {timestamp: Date.now().valueOf()}});
})

// bionicpandagamesapi.heroku/client/tapjoy/check

app.get("/client/tapjoy/check", async (req, res, next) => {
  res.status(200).send("")
});

// data.flurry
app.post("/aap.do", async (req, res, next) => {
  res.status(200).send("")
});

// engage.pxladdicts - yes these are actually this big I hate it
/*
 * Available prompt codes:
 * 404 - App/API key not found.
 * 400 - App found, but no campaign Actions are setup.
 * 401 - Campaign is setup, but not on a testing device (testing devices can be specified in the dashboard).
 * 405 - Publishing for your app is paused.
 * 406 - No apps available to show. Try again later.
 * any - Unspecified error code <code>. Please upgrade your SDK version to get the latest server messages.
 */
let pxlreply={"result": {"prompt": 404}};
app.get("/engage/create/api_key/:api_key/identifier/:identifier/version/:version/osversion/:osversion/devicetype/:devicetype/devicemodel/:devicemodel/deviceproduct/:deviceproduct/bundle_id/:bundle_id/android_id/:android_id/mac_address/:mac_address/ip_address/:ip_address", async (req, res, next) => {
  res.status(200).json(pxlreply)
});

app.get("/engage/getpendingrewards/api_key/:api_key/identifier/:identifier/version/:version/osversion/:osversion/devicetype/:devicetype/devicemodel/:devicemodel/deviceproduct/:deviceproduct/bundle_id/:bundle_id/android_id/:android_id/mac_address/:mac_address/ip_address/:ip_address", async (req, res, next) => {
  res.status(200).json(pxlreply)
});

// public.pxladdicts
app.get("/track/login/app_bundle_id/:app_bundle_id/android_id/:android_id/open_udid/:open_udid/mac_address/:mac_address/ip_address/:ip_address/odin/:odin", async (req, res, next) => {
  res.status(200).json(pxlreply)
});

app.use(async (req, res, next) => {
  res.status(400).send("");
});

app.listen(PORT, () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});
