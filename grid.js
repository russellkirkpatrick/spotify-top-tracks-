const client_id = '98352c812c794fed91730c51103d5fed';
const client_secret = '55339878ccd346a4a1bc9a1de9d7f419';
let access_token = '';
localStorage.setItem('client_id', client_id);
localStorage.setItem('client_secret', client_secret);

let arr  = [];

let count = 0;

const redirect_uri = 'https://russellkirkpatrick.github.io/gridify/';
const authorize = 'https://accounts.spotify.com/authorize';
const toplong = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0';
const scope = 'user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-read-email user-read-private user-library-modify user-library-read';

let but1 = document.getElementById("short");
let but2 = document.getElementById("med");
let but3 = document.getElementById("long");

function checkLength(){
  let queryStringLength = window.location.hash.length;
  if(queryStringLength > 0){
    getAccessToken();
  }
}

function giveAccess(){
  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  window.location.replace(url);
}

function getAccessToken(){
  if(window.location.hash.length > 0){
    let hash = window.location.hash.substr(14);
    let token = hash.substr(0, hash.length - 34);
    localStorage.setItem('access_token', token);
    access_token = localStorage.getItem('access_token');
    getApiReq('short_term');
  }
}
 
  


function getApiReq(range){
  fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=50&offset=0`, {
    method: 'GET', headers: {
        'Authorization': 'Bearer '  + access_token 
    }
})
   



    .then((response) => response.json())
    .then((data) => {
      //  console.log(data)
      var imgs = document.getElementsByClassName("grid-items");
      for(let i = 0; i < 50; i++){
        arr[i] = {
          'song': data.items[i].name,
          'artist': data.items[i].artists[0].name,
          'image': data.items[i].album.images[1].url
        }
        imgs[i].src = arr[i].image;
      }
      console.log(arr)  
     
    
    }); 

    //change button color
    if(range === 'short_term')
      changer1();
    if(range === 'medium_term')
      changer2();
    if(range === 'long_term')
      changer3();

    
}




function changer1(){
  but1.style.background = '#7fac71';
  but1.style.color = 'white';

  but2.style.background = 'white';
  but2.style.color = 'black';

  but3.style.background = 'white';
  but3.style.color = 'black';

}

function changer2(){
  but1.style.background = 'white';
  but1.style.color = 'black';

  but2.style.background = '#7fac71';
  but2.style.color = 'white';

  but3.style.background = 'white';
  but3.style.color = 'black';
}

function changer3(){
  but1.style.background = 'white';
  but1.style.color = 'black';

  but2.style.background = 'white';
  but2.style.color = 'black';

  but3.style.background = '#7fac71';
  but3.style.color = 'white';
}








//https://codepen.io/okawa-h/pen/OJLOarZ hover data
