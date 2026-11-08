const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

let bodyNames = ["Buy Food", "Cook Food", "Eat Food"];
let activities  = [];


app.get("/", function(req, res){

 let today = new Date();
 const options = {
  weekday : "long",
  day :    "numeric",
  month : "long"
 };
  
 let main = today.toLocaleDateString("en-US", options);
 res.render("list", {current : main, myList : bodyNames})

}); 

app.post("/", function(req, res){
   
   let bodyName = req.body.input;
    let work = req.body.input;
   if (req.body.list === "work list") {
     activities.push(work);
     res.redirect("/work")
   }else{
    bodyNames.push(bodyName);
    res.redirect("/")
   }
   
});


app.get("/work", function(req, res){
   res.render("list", {current : "work list", myList : activities})
});

app.post("/delete", function(req, res){
  const submittedIndex = req.body.index;
  const index = Number(submittedIndex);

  let selectedList = bodyNames;
  let redirectRoute = "/";

  if (req.body.list === "work list") {
    selectedList = activities;
    redirectRoute = "/work";
  }

  if (
    typeof submittedIndex === "string" &&
    submittedIndex.trim() !== "" &&
    Number.isInteger(index) &&
    index >= 0 &&
    index < selectedList.length
  ) {
    selectedList.splice(index, 1);
  }

  res.redirect(redirectRoute);
});

app.listen(3000, function () {
  console.log("App is running at http://localhost:3000");
});