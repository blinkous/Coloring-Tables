let myTable = document.getElementsByTagName("table")[0];
let numRows = 1;
let numCols = 1;
let cellColor = "red";
let isEraserOn = false;

// Add Row
document.getElementById("addRowBtn").addEventListener("click", function(){
    let j = 0;
    do{
        AddRow();
        j++;
    } while(j < document.getElementById("addAmt").value);
});
function AddRow(){
    let tr = document.createElement("tr");
    for(let i = 0; i < numCols; i++){
        let td = document.createElement("td");
        tr.appendChild(td);
    }
    myTable.appendChild(tr);
    numRows++;
}

// Add Column
document.getElementById("addColBtn").addEventListener("click", function(){
    let j = 0;
    do{
        AddCol();
        j++;
    } while(j < document.getElementById("addAmt").value);
});
function AddCol(){
    let trs = document.getElementsByTagName("tr");
    let td = document.createElement("td");
    for(let i = 0; i < trs.length; i++){
        let td = document.createElement("td");
        trs[i].appendChild(td);
    }
    numCols++;
}

// Delete Column
document.getElementById("deleteColBtn").addEventListener("click", DeleteCol);
function DeleteCol(){
    if(numCols > 1){
        let trs = document.getElementsByTagName("tr");
        for(let i = 0; i < trs.length; i++){
            let tr = trs[i]
            tr.removeChild(tr.lastChild);
        }
        numCols--;
    }
}

// Delete Row
document.getElementById("deleteRowBtn").addEventListener("click", DeleteRow);
function DeleteRow(){
    if(numRows > 1){
        myTable.removeChild(myTable.lastChild);
        numRows--;
    }
}

document.getElementById("colorOptions").addEventListener("change", setColor);
// When a new color is selected, change the cell fill color
function setColor(){
    cellColor = colorOptions.options[colorOptions.selectedIndex].value;
}

// Adding the ability to color td cells
document.addEventListener("click", function(e){
    if(e.target.tagName=="TD"){
        ColorMe(e);
    }
});
function ColorMe(e){
    e.target.style.backgroundColor = cellColor;
    // e.target.style.borderColor = cellColor;
}

// Erase the fill of selected cells
document.getElementById("eraseFillBtn").addEventListener("click", EraseFill);
function EraseFill(){
    if(isEraserOn){
        setColor();
        isEraserOn = false;
        myTable.style.cursor = "default";
    }
    else{
        cellColor = "white";
        myTable.style.cursor = "pointer";
        isEraserOn = true;
    }
}

// Clear the fill of the entire table
document.getElementById("clearFillBtn").addEventListener("click", ClearFill);
function ClearFill(){
    $("td").css("background-color","white");
}

document.getElementById("resetBtn").addEventListener("click", ResetTable);
function ResetTable(){
    while(numCols > 1 || numRows > 1){
        if(numCols > 1){
            DeleteCol();
        }
        if(numRows > 1){
            DeleteRow();
        }
    }
    ClearFill();
}

// Accept only numbers in the number of rows/columns to add
document.getElementById("addAmt").addEventListener("keydown", event =>{
    if(!(event.keyCode > 0 && event.keyCode <= 57)){
        event.preventDefault();
    }
});

// Validating the hex color on keydown
let myHex = document.getElementById("hexColor");
myHex.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    ValidateHexColor(event);
    ChangeUseHexBtn();
});
function ValidateHexColor(event){
    // If this is not a hexadecimal color value, don't allow this keypress
    if(!(
        (event.keyCode > 0 && event.keyCode <= 57) || 
        (event.keyCode >= 65 && event.keyCode <= 90)      
        )){
        event.preventDefault();
    }
}

myHex.addEventListener("change", ChangeUseHexBtn);
myHex.addEventListener("blur", ChangeUseHexBtn);
myHex.addEventListener("keyup", ChangeUseHexBtn);
function ChangeUseHexBtn(){
    if(myHex.value.length == 6){
        document.getElementById("hexFillBtn").style.backgroundColor = "#" + myHex.value;
    }
    else{
        document.getElementById("hexFillBtn").style.backgroundColor = "#969696";
    }
}

// Use the hex color the user input
document.getElementById("hexFillBtn").addEventListener("click", UseHexColor);
function UseHexColor(){
    if(myHex.value.length == 6){
        cellColor = "#" + myHex.value;
    }
    ChangeUseHexBtn();
}