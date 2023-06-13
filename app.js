//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import "ejs";
import _ from "lodash";

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const posts = [
  {title: "Test", content:""},
  {title: "The Force?", 
  content:"What!? The Force is strong with this one. I have you now. Hokey religions and ancient weapons are no match for a good blaster at your side, kid. Look, I can take you as far as Anchorhead. You can get a transport there to Mos Eisley or wherever you're going. I need your help, Luke. She needs your help. I'm getting too old for this sort of thing. What!? I find your lack of faith disturbing. You are a part of the Rebel Alliance and a traitor! Take her away! You don't believe in the Force, do you? You mean it controls your actions? Don't underestimate the Force. Leave that to me. Send a distress signal, and inform the Senate that all on board were killed. Hokey religions and ancient weapons are no match for a good blaster at your side, kid."},
  {title: "Hello King Arthur", 
  content: "I don't want to talk to you no more, you empty-headed animal food trough water! I fart in your general direction! Your mother was a hamster and your father smelt of elderberries! Now leave before I am forced to taunt you a second time! The Lady of the Lake, her arm clad in the purest shimmering samite, held aloft Excalibur from the bosom of the water, signifying by divine providence that I, Arthur, was to carry Excalibur. That is why I am your king."}
];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {homeContent: homeStartingContent, posts: posts});
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/posts/:postTitle", function(req, res) {
  const requestedTitle = _.kebabCase(req.params.postTitle);

  posts.forEach(function(post) {
    if (_.kebabCase(post.title) === requestedTitle) {
      res.render("post", {title: post.title, content: post.content});
    };
  })});

app.post("/compose", function(req, res) { 
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  };

  posts.push(post);

  res.redirect("/");
});












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
