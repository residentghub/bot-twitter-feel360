var express = require("express")
var path = require('path')
var app     = express()
var port    = process.env.PORT || 5000

app.get("/", function(req, res) {
  res.send("Node JS Bot to search a specific word to reply a comment. Feel 360.");
});

app.listen(port);

console.log("Bot ready!");
console.log();

var fs = require('fs')

var Twit = require("twit");
var config = require("./config");

console.log(config);
console.log();

var T = new Twit(config);

function searchPhraseOrHashtag(images) {    
    
    //var TWITTER_SEARCH_PHRASE = 'gripa OR resfriado OR me quiere dar gripa OR gripa y yo en el trabajo OR maldita gripa';
    var TWITTER_SEARCH_PHRASE = 'gripa OR resfriado';
    // Set up your search parameters
    var params = {      
      q: TWITTER_SEARCH_PHRASE,
      count: 12,
      result_type: 'recent',
      lang: 'es',
      //place_country: 'ISO 3166-2:MX',
      geocode: '19.3910036,-99.2840424,1000km', //Comentar para hacer pruebas de proximidad      
    }

    // Initiate your search using the above paramaters
    T.get('search/tweets', params, function(err, data, response) {
      // If there is no error, proceed
      if(!err){        

        // Loop through the returned tweets
        for(let i = 0; i < data.statuses.length; i++){
          // Get the tweet Id from the returned data
          let id = { id: data.statuses[i].id_str }
          // Try to Favorite the selected Tweet
          T.post('favorites/create', id, function(err, response){
            // If the favorite fails, log the error message
            if(err){
              //console.log(err[0].message);
              console.log("No recent twitter");
            }
            // If match is successful, send tweet response
            else{

              let username  = response.user.screen_name;
              let tweetId   = response.id_str;
              let tweetText = response.text;

              console.log('Text: ' + tweetText);
              console.log();
              console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`);              

              var image_path,
                  b64content;

              var randomIndexText = "";              

              console.log('Opening an gif...');

              if (tweetText.includes("dar")) {
                console.log("DAR");
                console.log();

                var imagesFolderDar = [
                  path.join(__dirname, '/images/dar/' + '01.gif'),
                  path.join(__dirname, '/images/dar/' + '02.gif'),
                  path.join(__dirname, '/images/dar/' + '03.gif'),
                  path.join(__dirname, '/images/dar/' + '04.gif')
                ];

                var randomIndexImageDar = Math.floor(Math.random()*imagesFolderDar.length);
                image_path = imagesFolderDar[randomIndexImageDar];
                
                var textArrayDar = [
                  '¿Dijiste gripa? Aquí te va un tip para convertir tu odio en bienestar. #TeOdiamosGripa',
                  '¿Gripa? Lánzate a la farmacia por un Feel 360 para que mañana puedas decir:',
                  '¿Estás malito? Aquí te va el remedio para la gripa. #TeOdiamosGripa',
                  '¿Gripa? Haz match con Feel 360 y convierte tu odio en bienestar. #TeOdiamosGripa'
                ];                

                var randomIndexTextDar = Math.floor(Math.random()*textArrayDar.length);
                randomIndexText = textArrayDar[randomIndexTextDar];

              } else if(tweetText.includes("trabajo")) {                
                console.log("TRABAJO");
                console.log();
                
                var imagesFolderTrabajo = [
                  path.join(__dirname, '/images/trabajo/' + '05.gif'),
                  path.join(__dirname, '/images/trabajo/' + '06.gif'),
                  path.join(__dirname, '/images/trabajo/' + '07.gif'),
                  path.join(__dirname, '/images/trabajo/' + '08.gif')
                ];

                var randomIndexImageTrabajo = Math.floor(Math.random()*imagesFolderTrabajo.length);
                image_path = imagesFolderTrabajo[randomIndexImageTrabajo];

                b64content = fs.readFileSync(image_path, { encoding: 'base64' });

                var textArrayTrabajo = [
                  '¿Con gripa en el trabajo? Feel 360 se rifa el tiro con la gripa por ti. #TeOdiamosGripa',
                  'No permitiré que la gripa arruine tu día laboral. Aquí te va el remedio. #TeOdiamosGripa',
                  'No necesitas un doble, necesitas un antigripal efectivo como Feel 360. #TeOdiamosGripa',
                  '¿Trabajando con gripa? Acá te va un remedio efectivo para la gripa. #TeOdiamosGripa'
                ];

                var randomIndexTextTrabajo = Math.floor(Math.random()*textArrayTrabajo.length);
                randomIndexText = textArrayTrabajo[randomIndexTextTrabajo];

              } else if (tweetText.includes("maldita")) {
                console.log("MALDITA");
                console.log();
                
                var imagesFolderMaldita = [
                  path.join(__dirname, '/images/maldita/' + '09.gif'),
                  path.join(__dirname, '/images/maldita/' + '10.gif'),
                  path.join(__dirname, '/images/maldita/' + '11.gif'),
                  path.join(__dirname, '/images/maldita/' + '12.gif')
                ];

                var randomIndexImageMaldita = Math.floor(Math.random()*imagesFolderMaldita.length);
                image_path = imagesFolderMaldita[randomIndexImageMaldita];

                b64content = fs.readFileSync(image_path, { encoding: 'base64' });

                var textArrayMaldita = [
                  'Bájale a tu odio por la gripa y lánzate por un Feel 360. #TeOdiamosGripa',
                  '¿Odio por la gripa? Convierte tu odio en bienestar con Feel 360. #TeOdiamosGripa',
                  '¿De malas por la gripa? Checa este tip. #TeOdiamosGripa',
                  'La gripa no se quita con un tuit. Lánzate a la farmacia por un Feel 360. #TeOdiamosGripa'
                ];

                var randomIndexTextMaldita = Math.floor(Math.random()*textArrayMaldita.length);
                randomIndexText = textArrayMaldita[randomIndexTextMaldita];

              } else {
                console.log("GRIPA");
                console.log();

                var imagesFolder = [
                  path.join(__dirname, '/images/' + '01.gif'),
                  path.join(__dirname, '/images/' + '02.gif'),
                  path.join(__dirname, '/images/' + '03.gif'),
                  path.join(__dirname, '/images/' + '04.gif')
                ];

                var randomIndexImage = Math.floor(Math.random()*imagesFolder.length);
                image_path = imagesFolder[randomIndexImage];

                b64content = fs.readFileSync(image_path, { encoding: 'base64' });

                var textArrayGripa = [
                  '¿Dijiste gripa? Aquí te va un tip para convertir tu odio en bienestar. #TeOdiamosGripa',
                  '¿Gripa? Lánzate a la farmacia por un Feel 360 para que mañana puedas decir:',
                  '¿Estás malito? Aquí te va el remedio para la gripa. #TeOdiamosGripa',
                  '¿Gripa? Haz match con Feel 360 y convierte tu odio en bienestar. #TeOdiamosGripa'
                ];                

                var randomIndexTextGripa = Math.floor(Math.random()*textArrayGripa.length);
                randomIndexText = textArrayGripa[randomIndexTextGripa];                
                                
              }

              T.post('media/upload', { media_data: b64content }, function (err, data, response) {
                if (err){
                  console.log('ERROR:');
                  console.log(err);
                } else {
                  console.log('Image uploaded!');
                  console.log('Now tweeting it...');                  

                  var status = {
                        in_reply_to_status_id: tweetId,
                        status: "@" + username + " " + randomIndexText,
                        media_ids: new Array(data.media_id_string)
                  };

                  T.post('statuses/update', status, function (err, tweet, response){

                        if (err) {
                            reject(err);
                        } else {
                            console.dir("exit");                            
                        }

                  });
                  
                }
              });


            }
          });
        } //End for      

      } else {
        console.log(err);
      }
    })

}

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);          
        }
      });
    });    

  });
};

setInterval(function(){
      
  walk(__dirname + '/images', function(err, results) {
    if (err) throw err;
    console.log(results);
    searchPhraseOrHashtag(results);
  });

}, 29*60*1000);

/*fs.readdir(__dirname + '/images', function(err, files) {
  if (err){
    console.log(err);
  } else {
    var images = [];
    files.forEach(function(f) {
      images.push(f);
    });

    // run the function every 29 minutos. Heroku's free count condition
    setInterval(function(){
      searchPhraseOrHashtag(images)    
    }, 29*60*1000);
  }
});*/