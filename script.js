var cards = [
  "images/1.svg",
  "images/2.svg",
  "images/3.svg",
  "images/4.svg",
  "images/5.svg",
  "images/6.svg",
  "images/7.svg",
  "images/8.svg",
];

var frontCard = "images/frontcard.svg";
//var hintNumber = 3; //only 3 times for hint
var memory;

function getRandomInt(array, numberOfCards) {
  //max is number of images
  var newArray = []; //var x;
  for (var i = 0; i < numberOfCards; ) {
    var random = Math.floor(Math.random() * array.length);

    if (!newArray.includes(array[random])) {
      //if images not included in newArray then include
      newArray.push(array[random]);
      i++;
    }
  }
  return newArray;
}

function doubleRandom(array) {
  var newArray2 = [];
  var double = array.length * 2;

  for (var i = 0; i < double; ) {
    var random = Math.floor(Math.random() * array.length);
    var temp = newArray2.filter(function (e) {
      return e === array[random];
    }); //return array contain all elements that match condition: elements of new array contain only elemts that matched from array
    if (temp.length < 2) {
      //array contain only at most 2 of same image to match it
      newArray2.push(array[random]);
      i++;
    }
  }
  return newArray2;
}
var array3 = [];
var temp = null;

(function () {
  // array3 = doubleRandom(getRandomInt(cards, 8)); // create random from our 8 images to the doubled one to 16 random number
  // for (var i = 0; i < array3.length; i++) {
  //   document.getElementById("container").appendChild(createDiv(i)); //append card to container with index of i,, later be id
  // }
  newGame();
})();

function createDiv(index) {
  var div = document.createElement("div");
  div.style.backgroundImage = `url(${frontCard})`; //make a background image as frontCard to current card
  div.id = index; //set id of current div to image index
  div.innerHTML = frontCard; //set inner html to directory of the front face
  div.style.color = "transparent"; //to hide the text of image div
  div.addEventListener("click", function () {
    this.style.backgroundImage = `url(${array3[parseInt(this.id)]})`; //take the random array created for the 8 images as 16 (doubled images) and parse the id of the image because the id from html is a string "0"
    this.innerHTML = array3[parseInt(this.id)]; // save the identifier or directory of the image to check later if 2 images have same directory in html
    //console.log(array3[parseInt(this.id)])
    var t = this;
    //console.log(t)
    if (temp != null && temp != t) {
      //var t = this; //set timeout change the scope,,so set it to another variable to hold this of element
      //console.log(t)
      if (this.innerHTML === temp.innerHTML) {
        //check if image directory of previous card = to current card
        var y = setTimeout(function () {
          //this.style.display = temp.style.display = "none";
          t.style.visibility = "hidden"; ///matched!!!,, let current (this) set to hidden
          temp.style.visibility = "hidden"; ///matched!!!,, let current (this) set to hidden
          temp = null; ///set temp to null again
        }, 300);
      } else {
        //because setTime out change the scope of this,, so we set it before setTime out
        var x = setTimeout(function () {
          temp.style.backgroundImage = `url(${frontCard})`; /// return to the default image
          t.style.backgroundImage = `url(${frontCard})`; /// return to the default image
          temp.innerHTML = frontCard; /// return inner html to default front card
          t.innerHTML = frontCard; ///return inner html to default front card
          temp = null;
        }, 300);
      }
    } else {
      temp = this; //make temp equal to current element
    }
  });

  div.className = "card";
  return div;
}

document.getElementById("newGame").addEventListener("click", newGame);

function newGame() {
  document.getElementById("container").innerHTML = "";
  array3 = doubleRandom(getRandomInt(cards, 8)); // create random from our 8 images to the doubled one to 16 random number
  for (var i = 0; i < array3.length; i++) {
    document.getElementById("container").appendChild(createDiv(i)); //append card to container with index of i,, later be id
  }
}
