
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() })
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            
        }


    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = (event.target.value)

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true 
    
    fetch(url)
    .then( (res) => { return res.json() })
    .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            
        }

            citySelect.disabled = false

    } )
}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)
    

//itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedElement)

}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedElement(event) {

    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem items selecionados, se sim pegar os items selecionados
    
    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId
        return itemFound
    })

    
    //se n tiver selecionado adicionar a selecao, se tiver tirar 

    if( alreadySelected != -1){
        const fielteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = fielteredItems
    } else {
        selectedItems.push(itemId)
    }

    console.log(selectedItems)


    
    // atualizar o campo escondido com os itens selecionados

    collectedItems.value = selectedItems

}
