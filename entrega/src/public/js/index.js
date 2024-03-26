const limitProduct=document.getElementById("search-product");
const limit=10;
const page=1;
const sort=-1;
const url=`/products?limit=${limit}&page=${page}&sort=${sort}`;

limitProduct.addEventListener('keyup', (e) => {
    console.log("keyup", e.key);
    if (e.key === 'Enter') {
        if (limitProduct.value.trim().length > 0) {
         
                limitProducts();     
        }
    }
});

// testando passar paramentros pelo front para definir limit
const limitProducts=async()=>{
       const response = await fetch(url, {
        method: 'get',
        headers: {
           'Content-Type': 'application/json',
        }
     });
      
     if (response.ok) {
        window.location.href =`/products?limit=${limitProduct.value}`;

     } else {
        console.error("Falha ao obter detalhes do produto. Status da resposta:", response.status);
     }

}
