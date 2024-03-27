const selectProduct = document.getElementById("select-products");
const selectPage = document.getElementById("select-page");
let pageQueryValue;

selectProduct.addEventListener('change', async () => {
    atualizarLinks(selectProduct.value, 'http://localhost:8080/products');
    console.log("teste");
    
});

selectPage.addEventListener('click', async(event) => {
    atualizarLinks(selectProduct.value, 'http://localhost:8080/products');


});

   


function atualizarLinks(limit, baseUrl) {
    // Seleciona todos os elementos da paginação
    let elementosPaginacao = document.querySelectorAll('.page-item ');

    // Itera sobre cada elemento
    for (let i = 0; i < elementosPaginacao.length; i++) {
        // Obtém o valor da página do atributo 'value'
        let pagina = elementosPaginacao[i].getAttribute('value');

        // Cria a nova URL
        let novaUrl = baseUrl + '?limit=' + limit + '&page=' + pagina;

        // Obtém o link dentro do item de paginação
        let link = elementosPaginacao[i].querySelector('a');

        // Atualiza o atributo 'href' do link
        link.setAttribute('href', novaUrl);
        console.log(novaUrl);
    }
}

// Uso da função




