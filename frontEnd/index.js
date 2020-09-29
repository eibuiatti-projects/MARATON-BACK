const clientId= document.querySelector("#clientId");
const howManyProducts= document.querySelector("#howManyProducts");
const amount= document.querySelector("#amount");
const paymentMethod= document.querySelector("#paymentMethod");
const agregarProductos= document.querySelector("#agregarProductos")

howManyProducts.addEventListener("blur", howManyProductsHandler =>{
    let productos="";
    
    for (let i=1; i<=howManyProducts.value; i++){
      productos += `<br><label for="producto">Producto ${i} </label><input type="text" name="producto" id="producto"><br><br>`;

    }
    agregarProductos.innerHTML = productos;
});


