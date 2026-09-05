var contador = 0;

function cellclick(celda) {
    if(window.getComputedStyle(celda).backgroundImage === "none" || window.getComputedStyle(celda).backgroundImage === "") {         
            
        if (contador < 8) {
            celda.style.backgroundImage = "url('./img/reina.png')";
            celda.style.backgroundSize = "25px";
            celda.style.backgroundRepeat = "no-repeat";
            celda.style.backgroundPosition = "center";
            contador++;
            document.getElementById("reinasContador").innerHTML = `Reinas Colocadas: ${contador}`;
            bloquear(celda);

            if(contador === 8) {
                document.getElementById("pganador").innerHTML = "¡Felicidades! Has colocado todas las reinas.";
            }
        } 
        
    } else {
        celda.style.backgroundImage = "none"; 
        contador--;
        document.getElementById("reinasContador").innerHTML = `Reinas Colocadas: ${contador}`;
        document.getElementById("pganador").innerHTML = "";
        
        reiniciarBloqueo(celda);
    }
}

function cambiar(r, c) {
  const tablero = document.getElementById("tablero");

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i === r || j === c || Math.abs(i - r) === Math.abs(j - c)) {
        tablero.rows[i].cells[j].style.backgroundColor = "red";
      }
    }
  }
}
 

function reinicio(){
    var celda=document.getElementsByTagName("td");
    for (let i = 0; i < celda.length; i++) {
        celda[i].style.backgroundColor="";
    }
}


function bloquear(celda){
    const row = celda.parentNode.rowIndex;
    const col = celda.cellIndex;
    const tablero = document.getElementById("tablero");

    /*Bloqueamos la columna y la fila */
    for(let i=0; i<8; i++){           /*El let solo es nivel de bloque*/
        if(i !== col){ /*horizontal */
            tablero.rows[row].cells[i].onclick = null;
        }

        if(i !== row){ /*vertical */
            tablero.rows[i].cells[col].onclick = null;
        }
    }    

    /*Bloqueamos las diagonales */
    for(let i = -7; i <= 7; i++){
        if(row + i >= 0 && row + i < 8 && col + i >= 0 && col + i < 8 && i !== 0){ /*Diagonal principal  \ */
            tablero.rows[row + i].cells[col + i].onclick = null; 
        }
    
        if(row + i >= 0 && row + i < 8 && col - i >= 0 && col - i < 8 && i !== 0){ /*Diagonal principal  / */
            tablero.rows[row + i].cells[col - i].onclick = null;
        }
    }
}



function reiniciarBloqueo(celda){
    const row = celda.parentNode.rowIndex;
    const col = celda.cellIndex;
    const tablero = document.getElementById("tablero");

    /*Desbloqueamos columnas y filas */
    for(let i = 0; i < 8; i++){
        tablero.rows[row].cells[i].onclick = function(){
            cellclick(this);
        }

        tablero.rows[i].cells[col].onclick = function(){
            cellclick(this);
        }
    }



    /*Desbloqueamos las diagonales */
    for(let i = -7; i <= 7; i++){
        if (row + i >= 0 && row + i < 8 && col + i >= 0 && col + i < 8 && i !== 0){ /*Diagonal principal  \ */
            tablero.rows[row + i].cells[col + i].onclick = function(){
                cellclick(this);
            };
        }
    
        if (row + i >= 0 && row + i < 8 && col - i >= 0 && col - i < 8 && i !== 0){ /*Diagonal secundario  / */
            tablero.rows[row + i].cells[col - i].onclick = function(){
                cellclick(this);
            };
        }
    }
}