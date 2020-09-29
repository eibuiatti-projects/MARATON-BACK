app.get('/bikes/:id',function(req,res){
    const id = req.params.id;
    let BikeEncontrado = undefined;
bikes.forEach(function(Bike){
if(Bike.id == id) {
    BikeEncontrado = Bike;
    return 
}
});
//Paso por aca.
if (BikeEncontrado !== undefined){
res.status(200).send({Bike:BikeEncontrado});
console.log(BikeEncontrado);
}else{
res.status(404).send({"message":"Bike Not Found - 404"});
}

}); 


/**
* 4- CreateBike
*/ 
//Create Bike

app.post('/bikes',function(req,res){
// SI NO ME VIENEN LOS DATOS COMO YO LOS QUIERO, LE TENGO QUE DECIR AL USUARIO!!!!
if(!req.body || !req.body.nombre || !req.body.marca || !req.body.precio){
return res.status(400).send({"message":"Bad Request"});
}
//req.body
const newBike = {
"id":getNextID(),
"nombre":req.body.nombre,
"marca":req.body.marca,
"precio":req.body.precio
}
bikes.push(newBike);
//201 ==> OK CREATED
console.log(newBike);
return res.status(201).send({"Bike":newBike});
//TODO DEBERIA ESTAR DENTRO DE UN TRY/CATCH BLOCK!!!!!!!
})

/**
* 5- DeleteBikeByID
*/
app.delete('/bikes/:id',function(req,res){
const ID = req.params.id;
let index = null;
bikes.forEach(function(Bike, i){
if(Bike.id == ID) { 
    index = i;
}
})
if(index!== null){
bikes.splice(index,1);
res.status(200).send({message:"Bike was deleted"});
}else{
res.status(404).send({message:"Bike was not founded"});
}
})


function getNextID(){
//BUSCAR POSTA EL ID MAXIMO Y A ESO SUMARLE UNO;
let bikeIdMax = bikes.reduce((a, b) => (a.id > b.id ? a : b));
return bikeIdMax.id+1;
}


app.listen('4200',function(){
console.log("Server Up And Running!");
});
