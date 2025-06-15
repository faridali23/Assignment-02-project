// const loadProduct=()=>{
//     fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
//     .then((res)=>res.json())
//     .then((data)=>{
//         display(data);
//     });

// };

// window.onload = () => {
//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
//     .then(res => res.json())
//     .then(data => display(data.drinks));
// }


// const display=(elements)=>{
//      console.log(elements);
//     const productContainer=document.getElementById("product-container");
   
//     elements.forEach(element => {
//         const div=document.createElement("div");
//         div.innerHTML=`
//         <img class="card-img" src=${product.image} alt="" />
//         <h5>${product.title.slice(0,50)}</h5>
//         <h3>${product.price}</h3>
//         <p>${product.description.slice(0,50)}</p>
//         <button onclick="singleProduct('${product.id}')" >Details</button>
//         <button onclick="handleAddtoCart('${product.title}', 
//         '${product.price}')">ADD To Cart</button>
// `
        
//     });
// }

window.onload = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")


  .then(res => res.json())
  .then(data => {
    if (data.drinks) {
      display(data.drinks);
    } else {
      document.getElementById("product-container").innerHTML = '<p>No drinks found.</p>';
    }
  });

}


const searchDrink=()=>{
  const searchvalue=document.getElementById("search-field").value.trim();
  const container=document.getElementById("product-container");
  container.innerHTML="";
  if(!searchvalue)
  {
    container.innerHTML="<p>Please Enter a Drink Name</p>";
    return ;
  }
   fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchvalue}`)
   .then(res=>res.json())
   .then(data=>{
    if(data.drinks)
    {
      display(data.drinks);
    }
    else{
      container.innerHTML="<h2>Your Searched Drink is not found</h2>";
    }
   })
   .catch(error=>{
    container.innerHTML="<p>Something went wrong</p>";

   });
   

  };




   document.getElementById("handleADD").addEventListener("click",(event)=>{
    const inputValue=document.getElementById("search-field").value;
    
    document.getElementById("search-field").value="";
})




const display = (elements) => {
  console.log(elements); // ✅ This will now work if the fetch is successful
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ''; // clear old results

  elements.forEach(element => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img class="card-img" src="${element.strDrinkThumb}" alt="${element.strDrink}" />
      <h5>${element.strDrink.slice(0, 50)}</h5>
      <h3>${element.strCategory}</h3>
      <p>${element.strInstructions.slice(0, 50)}</p>
      <button onclick="singleProduct('${element.idDrink}')">Details</button>
      <button onclick="handleAddtoCart('${element.strDrink}', '${element.strDrinkThumb}')">ADD To Cart</button>
    `;
    productContainer.appendChild(div);
  });
}

const handleAddtoCart = (name, image) => {
  const cartCount=document.getElementById("count").innerText;
  let convertCount=parseInt(cartCount);
  convertCount+=1;
  document.getElementById("count").innerText=convertCount;
  const container = document.getElementById("cart-container");
  const div = document.createElement("div");
  div.classList.add("cart-manage");

  div.innerHTML = `
  <p>${convertCount}</p>
    <img class="img-manage" src="${image}" alt="${name}" width="100" />
    <p>${name}</p>
  `;

  container.appendChild(div);
  if(convertCount==8)
  {
    alert();
  }
};

const singleProduct=(id)=>{
   fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then(res=>res.json())
  .then(data=>{
    const drink=data.drinks[0];
    document.getElementById("modal-title").innerText=drink.strDrink;
    document.getElementById("modal-img").src=drink.strDrinkThumb;
    document.getElementById("modal-category").innerText=`Category: ${drink.strCategory}`;
    document.getElementById("alco").innerText=`Alcoholic: ${drink.strAlcoholic}`;
    document.getElementById("modal-instruction").innerText=drink.strInstructions.slice(0,15);
    document.getElementById("product-modal").style.display="block";

  });

};
const closeModal=()=>{
  document.getElementById("product-modal").style.display="none";
}
