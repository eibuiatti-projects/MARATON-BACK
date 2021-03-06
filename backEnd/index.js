/*
    Backend E-commerce

    Nota del cliente: 
    "Necesito un servicio RESTFul que me permita registrar un listado de productos comprados, precio, identificador de cliente y metodo de pago"

    Modelo de datos : 
    {
        "id": string,
        "clientId": string,
        "products": Array[], (Se guarda el identificador de producto, string)
        "amount": number,
        "paymentMethod": "Credit Card" | "Cash" | "Bitcoin"
    }

    Ejemplo:
    {
        "id": "adkjfh",
        "clientId": "1000",
        "products": ["100","300","400","500","600","700","800"],
        "amount": 10000,
        "paymentMethod": "Credit Card"
    }
*/

/*

MARATON BACKEND

1) Completar el servicio API REST, está incompleto.
2) Crear pruebas utilizando POSTMAN para todas las rutas (GET/POST/PUT/DELETE).
3) Validar en la carga/modificación (POST/PUT) que recibimos todos los datos necesarios. Sino, informar error de request.
4) Agregar al modelo de datos el atributo: createdAt (Date). Se debe cargar la fecha actual.  
5) BONUS: Crear un front-end simple que permita hacer una carga de datos desde un formulario. Respetando el modelo de datos.
6)  Elegí algún ejercicio de la maratón, e intenta encontrar una nueva forma de resolución, que sea distinta a la primera. 
7) Si fueses mentor/a, y tuvieses que pensar un ejercicio para la maratón, ¿Cuál sería? Te proponemos inventar un ejercicio 
nuevo que implique poner en práctica los conocimientos vistos hasta acá sobre Backend. 

Para finalizar:
A cada estudiante le tocará corregir el código de algún compañero/a. Tendrán que darle una devolución por escrito, marcando 
los aciertos y desaciertos, y las cosas que se pueden mejorar. Tengan en cuenta, a la hora de escribir, que el mensaje sea 
lo más organizado posible, para que el texto tenga claridad a la hora de leerse. Además, entendiendo que tendrán que juzgar 
el trabajo de un compañero/a, trabajen desde la empatía, para lograr una evaluación constructiva.
*/


const express = require("express");
const cors = require("cors");
const moment = require("moment")
const morgan = require("morgan");
const uniqid = require("uniqid");

const app = express();
const PORT = 3001;

//////////////////// Aplico Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

///////////////////// Init Array de Compras. (Simulo una Base de datos)
const compras = [
  {
    id: "0",
    clientId: "1000",
    products: ["100","300","400","500","600","700","800"],
    amount: 10000,
    paymentMethod: "Credit Card",
    createdAt:"" 
  },
  {
    id: "1",
    clientId: "1001",
    products: ["10","30","40","50","60","70","80"],
    amount: 2000,
    paymentMethod: "Cash",
    createdAt:"" 
  },
  {
    id: "2",
    clientId: "1000",
    products: ["100","300","400","500","600","700","800"],
    amount: 10000,
    paymentMethod: "Credit Card",
    createdAt:"" 
  },
  {
    id: "3",
    clientId: "1001",
    products: ["10","30","40","50","60","70","80"],
    amount: 2000,
    paymentMethod: "Cash",
    createdAt:"" 
  }

];

//////////////////// Defino Rutas, me baso en el modelo REST
app.get("/compras", function (req, res) {
  res.status(200).send({ compras });
});
/*
// Alternativa para el metodo GETbyId
app.get("/compras/:id", function (req, res) {
  const id = req.params.id;
  let compraEncontrada = undefined;
  compras.forEach(function(compra){
    if(compra.id == id) {
      compraEncontrada = compra;
      return 
    }
  });
  (compraEncontrada !== undefined)? res.status(200).send({"compra":compraEncontrada}) : res.status(404).send({"error":"compra no encontrada"});
}); 
*/

app.get("/compras/:id", function (req, res) {
  const id = req.params.id;
  let compraEncontrada = compras.filter(compra => compra.id == id);
  (compraEncontrada.length !== 0)? res.status(200).send({"compra":compraEncontrada}) : res.status(404).send({"error":"compra no encontrada"});
}); 

app.post("/compras", function (req, res) {
  if(req.body.id || !req.body.clientId || !req.body.products || !req.body.amount || !req.body.paymentMethod){
    res.status(404).send({"error":"peticion erronea"});
  }else{
    let nuevaCompra = {
      id: uniqid(),
      clientId: req.body.clientId,
      products: req.body.products,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    compras.push(nuevaCompra);
    res.status(200).send({"nuevaCompra":nuevaCompra})
  }
});

app.put("/compras/:id", function (req, res) {
  if(!req.body.clientId || !req.body.products || !req.body.amount || !req.body.paymentMethod){
    res.status(404).send({"error":"peticion erronea"});
  }else{
    const id = req.params.id;
    let indice;
    compras.forEach(function (compra,index) {
      if (index == id){
        indice = index;
        return;
      }  
    });
    if (indice){
      let nuevaCompra = {
        id: id,
        clientId: req.body.clientId,
        products: req.body.products,
        amount: req.body.amount,
        paymentMethod: req.body.paymentMethod
      }
      compras.splice(indice, 1, nuevaCompra);
      res.status(200).send({"nuevaCompra":nuevaCompra})
    }else{
      res.status(404).send({"error":"id erroneo"});
    }
  }
});

app.delete("/compras/:id", function (req, res) {
  const id = req.params.id;
  let indice;
  compras.forEach(function (compra,index) {
    if (index == id){
      indice = index;
      return;
    }  
  });
  if (indice){
    idCompraEliminada = compras[indice].id;
    compras.splice(indice, 1);
    res.status(200).send({"Id de compra eliminada ":idCompraEliminada})
  }else{
    res.status(404).send({"error":"id erroneo"});
  }
});

/* 
// En vez de utilizar uniqid podría utilizar esta funcion 
function getNextId(){
  let compraIdMax = compras.reduce((acc, compra)=> (acc.id>compra.id)? acc.id : compra.id);
  return parseInt(compraIdMax) + 1;
}
*/

//////////////////// Ahora que tengo todo definido y creado, levanto el servicio escuchando peticiones en el puerto
app.listen(PORT, function () {
  console.log(`Maraton Guayerd running on PORT: ${PORT}\n\n`);
});
