const PORT = 'http://localhost:3001/compras';

const clientId= document.querySelector("#clientId");
const howManyProducts= document.querySelector("#howManyProducts");
const amount= document.querySelector("#amount");
const paymentMethod= document.querySelector("#paymentMethod");
const addProducts= document.querySelector("#addProducts")
const form = document.querySelector("form");

howManyProducts.addEventListener("blur", howManyProductsHandler); 
form.addEventListener("submit", formHandler);

function howManyProductsHandler(){
    let showProducts="";
    for (let i=1; i<=howManyProducts.value; i++){
      showProducts += `<br><label for="producto${i}">Producto ${i} </label><input type="number" name="producto${i}" id="producto${i}"><br><br>`;
    }
    addProducts.innerHTML = showProducts;
}

function formHandler(e){
    e.preventDefault();
    let arrProducts = [];
    for (let i=1; i<=howManyProducts.value; i++){
      let product = document.querySelector (`#producto${i}`).value;
      arrProducts.push(product);
    }  
    let newCompra = {
      clientId: clientId.value,
      products: arrProducts,
      amount: amount.value,
      paymentMethod: paymentMethod.value
    }
    fetch(PORT,{
    method:'POST',
    body:JSON.stringify(newCompra),
    headers:{'Content-Type':'application/json'}
}).then((res)=>{
    return res.json()
}).then((res)=>{
    console.log("Compra Agregada",res)
    
})

}


