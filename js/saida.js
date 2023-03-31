const modalSaida = document.querySelector('.modal-saida-container')
const tbody = document.querySelector('tbody')
const qtdModal = document.querySelector('#m-quant')
const sProduto = document.querySelector('#m-produto')
const sQuantidade = document.querySelector('#m-quant')
const sMedida = document.querySelector('#m-unmedida')
const btnSalvar = document.querySelector('#salvar-saida')
const warning = document.querySelector('.aviso')


let itens /*var que vai armazenar os itens no nosso banco*/
let id /*var que vai armazenar os index, para fazermos a ação de edição(editar)*/

/*1- criado a função que vão buscar os itens do BD*/
/*2 - criado a função que vai setar os itens do (itens), da nossa var "itens" para dentro do nosso BD*/
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))


/**Função que vai ser executada assim que a tela for carregada */
function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

loadItens()

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.quantidade}</td>
        <td>${item.produto}</td>
        <td>${item.medida}</td>
        <td class='acao'>
            <a onclick='openModal(${index})' id="btnSaida">
                saída
            </a>
        </td>
    `
    tbody.appendChild(tr)
}

function openModal(index) {
    modalSaida.classList.add('open');
    id = index;
}

function closeModal() {
    modalSaida.classList.remove('open');
    qtdModal.value = "";
}


btnSalvar.addEventListener('click',(e) => {
    e.preventDefault();

    let modalValue = qtdModal.value;
    let itemValue = itens[id].quantidade;

    if (Number(modalValue) < 0) {
        warning.innerHTML = "valor menor que zero!"
    }

    if (Number(modalValue) > Number(itemValue)) {
        warning.innerHTML = "valor maior que o estoque!"
    }

    if (Number(modalValue) < Number(itemValue) && Number(modalValue) > 0) {
        itens[id].quantidade = (itemValue - modalValue);
        closeModal();
        qtdModal.value = "";
    }

    setItensBD();
    loadItens();
})
