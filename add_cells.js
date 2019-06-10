let myTable = document.getElementsByTagName("table")[0];
let numRows = 1;
let numCols = 1;
let cellColor = "red";
let isEraserOn = false;

// Add Row
document.getElementById("addRowBtn").addEventListener("click", AddRow);
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
document.getElementById("addColBtn").addEventListener("click", AddCol);
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
        console.log("deleted col");
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
    // document.getElementsByTagName("td").style.backgroundColor = "white";
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
