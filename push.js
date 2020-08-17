var webPush = require('web-push');

const vapidKeys = {
    "publicKey":"BB5-Z49pVxPPE0IMOdRwQzMHlUPbqbbLXMivXX_KCu9UEJmGQSwZaFG17p_FH1ozggWRdFJG_-27AyYDsevjXlI",
    "privateKey":"t-2OG25J7wTPD9_WC3ZeLcc8Nz1EbMhxZ2YzZxY2eYw"
};

webPush.setVapidDetails(
    'mailto:akunpremium69@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cQzUyK2s4f0:APA91bEWBe2NDGLfulM2cB5XcP9d6sLBzsQmsRyU59oV8BFxALBsgkvu021fyydqz7JukAMqbSzwftYSfmWhEYNmgsg4cusJrE0Xz8iOLdCt-MXRJUwGuNpZjnmMwgbwLqFJakyjAXQ9",
    "keys":{
        "p256dh":"BIVuRJa/J58Qz25PEUnQF/IsbS0osftiN8OvA9HviVuzxImDcfjOyAJ5YNLHx8aQbFVSdI1RFGyAlMYwrf4uKXo=",
        "auth":"WKYF+sfoBsy6nu4B/K/RFw=="
    }
};

var payload = "Ini adalah push notifikasi!";

var option = {
    gcmAPIKey: '750359416753',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,payload,option
);