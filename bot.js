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

              /*Searching:
                me quiere dar gripa,
                gripa y yo en el trabajo,
                maldita gripa,    
              */

              /*var finding_text_dar     = tweetText.search(/dar/i);
              var finding_text_trabajo = tweetText.search(/trabajo/i);
              var finding_text_maldita = tweetText.search(/maldita/i);*/  

              var image_path,
                  b64content;

              console.log('Opening an gif...');

              if (tweetText.includes("dar")) {
                image_path = path.join(__dirname, '/images/dar/' + random_from_array(images));
                b64content = fs.readFileSync(image_path, { encoding: 'base64' });
              } else if(tweetText.includes("trabajo")) {
                image_path = path.join(__dirname, '/images/trabajo/' + random_from_array(images));
                b64content = fs.readFileSync(image_path, { encoding: 'base64' });
              } else if () {

              } else {

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