import https from 'node:https';
https.get('https://images.unsplash.com/random/1920x1080/?dairy,farm', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers.location);
}).on('error', (e) => {
  console.error(e);
});
