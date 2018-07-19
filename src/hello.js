export default (name) => console.log(`Hello there, ${name}!`);

fetch("http://localhost:1313/index.html/db.json")
    .then(function(db){
    return db();
    });