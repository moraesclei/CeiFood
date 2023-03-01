const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sProduto = document.querySelector('#m-produto')
const sQuantidade = document.querySelector('#m-quant')
const sMedida = document.querySelector('#m-unmedida')
const btnSalvar = document.querySelector('#btnSalvar')
const closeModal = document.querySelector('.close-modal')

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
            <button onclick='editItem(${index})'><i class='bx bx-edit'></i></button>
        </td>
        <td class='acao'>
            <button onclick='deleteItem(${index})'><i class='bx bx-trash'></i></button>
        </td>
    `
    tbody.appendChild(tr)
}

/**Função de edição */
function editItem(index) {

    openModal(true, index)
}

/**Função de deletar */
/**no splice - ele remove um item do index */
function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.classProduto.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if (edit) {
        sProduto.value = itens[index].produto
        sQuantidade.value = itens[index].quantidade
        sMedida.value = itens[index].medida
        id = index
    } else {
        sProduto.value = ''
        sQuantidade.value = ''
        sMedida.value = ''
    }
}

btnSalvar.onclick = e => {

    if (sProduto.value == '' || sQuantidade.value == '' || sMedida.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].produto = sProduto.value
        itens[id].quantidade = sQuantidade.value
        itens[id].medida = sMedida.value
    } else {
        itens.push({ 'produto': sProduto.value, 'quantidade': sQuantidade.value, 'medida': sMedida.value })
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
})


