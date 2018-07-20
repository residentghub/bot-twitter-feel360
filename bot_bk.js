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

function random_from_array(images){
  return images[Math.floor(Math.random() * images.length)];
}


function upload_random_image(images){
  console.log('Opening an image...');
  var image_path = path.join(__dirname, '/images/' + random_from_array(images)),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Uploading an image...');

  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log('ERROR:');
      console.log(err);
    }
    else{
      console.log('Image uploaded!');
      console.log('Now tweeting it...');

      T.post('statuses/update', {
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('ERROR:');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}


function searchPhraseOrHashtag(images) {

    /*Searching:
    me quiere dar gripa,
    gripa y yo en el trabajo,
    maldita gripa,    
    */
    
    //var TWITTER_SEARCH_PHRASE = 'gripa OR resfriado OR me quiere dar gripa OR gripa y yo en el trabajo OR maldita gripa';
    var TWITTER_SEARCH_PHRASE = 'gripa OR resfriado';
    // Set up your search parameters
    var params = {      
      q: TWITTER_SEARCH_PHRASE,
      count: 3,
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
              console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)

              /* Here TODO ALL */
              console.log('Opening an gif...');
              var image_path = path.join(__dirname, '/images/' + random_from_array(images)),
              b64content = fs.readFileSync(image_path, { encoding: 'base64' });                            

              var randomIndexText = "";
              var substringImagePath = image_path.slice(-6);

              switch(substringImagePath) {
                case "01.gif":
                    randomIndexText = "¿Dijiste gripa? Aquí te va un tip para convertir tu odio en bienestar. #TeOdiamosGripa";
                    break;
                case "02.gif":
                    randomIndexText = "¿Gripa? Lánzate a la farmacia por un Feel 360 para que mañana puedas decir:";
                    break;
                case "03.gif":
                    randomIndexText = "¿Estás malito? Aquí te va el remedio para la gripa. #TeOdiamosGripa";
                    break;
                case "04.gif":
                    randomIndexText = "¿Gripa? Haz match con Feel 360 y convierte tu odio en bienestar. #TeOdiamosGripa";
                    break;
                case "05.gif":
                    randomIndexText = "¿Con gripa en el trabajo? Feel 360 se rifa el tiro con la gripa por ti. #TeOdiamosGripa";
                    break;
                case "06.gif":
                    randomIndexText = "No permitiré que la gripa arruine tu día laboral. Aquí te va el remedio. #TeOdiamosGripa";
                    break;
                case "07.gif":
                    randomIndexText = "No necesitas un doble, necesitas un antigripal efectivo como Feel 360. #TeOdiamosGripa";
                    break;
                case "08.gif":
                    randomIndexText = "¿Trabajando con gripa? Acá te va un remedio efectivo para la gripa. #TeOdiamosGripa";
                    break;
                case "09.gif":
                    randomIndexText = "Bájale a tu odio por la gripa y lánzate por un Feel 360. #TeOdiamosGripa";
                    break;
                case "10.gif":
                    randomIndexText = "¿Odio por la gripa? Convierte tu odio en bienestar con Feel 360. #TeOdiamosGripa";
                    break;
                case "11.gif":
                    randomIndexText = "¿De malas por la gripa? Checa este tip. #TeOdiamosGripa";
                    break;
                case "12.gif":
                    randomIndexText = "La gripa no se quita con un tuit. Lánzate a la farmacia por un Feel 360. #TeOdiamosGripa";
                    break;                
              }


              /*T.post('media/upload', { media_data: b64content }, function (err, data, response) {
                if (err){
                  console.log('ERROR:');
                  console.log(err);
                }
                else{
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
              });*/


            }
          });
        } //End for      

      } else {
        console.log(err);
      }
    })

}


fs.readdir(__dirname + '/images', function(err, files) {
  if (err){
    console.log(err);
  }
  else{
    var images = [];
    files.forEach(function(f) {
      images.push(f);
    });

    // run the function every 12 hrs
    setInterval(function(){
      searchPhraseOrHashtag(images)
    //}, 720*60*1000);
    }, 1*60*1000);
  }
});