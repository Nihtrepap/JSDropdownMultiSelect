var list = [{key:"Portal", value:"Portal"},
{key:"Analys", value:"Analays"},
{key:"Admin", value:"Admin"},
{key:"Test", value:"Test"},
{key:"Test2", value:"Test2"}];
var listChosenItem;
var dropMain; 
var listElement; 

window.addEventListener('DOMContentLoaded', (event) => {
    listChosenItem = [];
    dropMain = document.getElementById("dropdown-main");
    dropMainArrow  = document.getElementById("dropdown-arrow");
    listElement = document.createElement("ul");
    listElement.classList.add("list-box");
    listElement.classList.add("hide");
    listElement.id = "list-box-main";

    dropMainArrow.addEventListener('click', onDropdownActiveBtnClicked);
    
    var okBtn = document.getElementById("accept-choices-button");
    okBtn.addEventListener('click', onOkButtonClicked);

    for (let index = 0; index < list.length; index++) {
            createLiElement(index);
    }

    dropMain.appendChild(listElement);
});

function onOkButtonClicked(){
    console.log('send list to whatever');
    console.log(listChosenItem);
}

function onDropdownActiveBtnClicked(){

    if(listElement.classList.contains("hide")){listElement.classList.remove("hide"); listElement.classList.add("active");}
    else{ listElement.classList.add("hide"); listElement.classList.remove("active");}

}

function onRemoveFromMultiSelectClick(e){

    var getListId = parseInt(e.target.getAttribute("Multi-Item"));

    createLiElement(getListId);
    removeFromArray(listChosenItem, list[getListId].value);

    var removeFromTop = document.getElementById(`${e.target.id}0`);
    removeFromTop.remove();
}


function onDropdownItemClick(e){

    addItemToMultiSelect(e);
    removeFromDropdownList(e.target);

}

function giveMultiListItemClickEvent(multiId){

    var removeItemFromMulti = document.getElementById(`multi-list-remove${multiId}`);
    removeItemFromMulti.addEventListener('click', onRemoveFromMultiSelectClick);
}

function addItemToMultiSelect(e){
    console.log(e.target);
    var multiId = e.target.id;
    var addToTop = document.getElementById("dropdown-show-chosen");
    var elToAdd = document.createElement("span");

    elToAdd.classList.add("dropdown-multi-select-view");
    elToAdd.id = `multi-list-remove${multiId}0`;
    elToAdd.setAttribute("Multi-Item",`${multiId}`);
    elToAdd.innerHTML = e.target.innerHTML + `  <span multi-item=${multiId}; id='multi-list-remove${multiId}' class="multi-list-x" style='background:white; color:red;'>&times;</span>`;
    addToTop.appendChild(elToAdd);
    listChosenItem.push(list[multiId]);

    giveMultiListItemClickEvent(multiId);
}

function removeFromDropdownList(el){

    el.remove();
}

function createLiElement(i){
    var listItem = document.createElement("li");

    listItem.classList.add("list-box-item-style");
    listItem.id = i;
    listItem.innerHTML = list[i].value;

    listElement.appendChild(listItem);
    listItem.addEventListener('click',onDropdownItemClick);

}

function removeFromArray(arr,value){
    
    arr.splice(arr.findIndex(item => item.value == value), 1);

}