
// Array de figuras
let vegetables = [
    "aubergine.png", //0
    "banana.png", //1
    "carrots.png", //2
    "cherries.png", //3
    "dollar.png", //4
    "lemon.png", //5
    "orange.png", //6
    "peach.png", //7
    "potato.png", //8
    "tomato.png", //9
  ];
  
  //********* Elementos del DOM ************
  const container = document.querySelector(".container");
  // Botones
  const coins = document.getElementById("coins");
  const insert = document.getElementById("insertCoin");
  // Marcador
  const showCoins = document.getElementById("showCoin");
  // Vegetales tirada
  const figOne = document.querySelector(".figOne");
  const figTwo = document.querySelector(".figTwo");
  const figThree = document.querySelector(".figThree");
  const figsArray = [figOne, figTwo, figThree];
  let vegOne = document.createElement("img");
  let vegTwo = document.createElement("img");
  let vegThree = document.createElement("img");
  const vegsArray = [vegOne, vegTwo, vegThree];
  const history = document.createElement("ul");
  const historial = document.querySelector(".historial");
  historial.appendChild(history);
  
  // Saldo
  let cash = 0;

  /****** Funcionalidades Botones  ******/
  
  // Boton insertar dinero
  const printCoins = () => {
    if (coins.value > 0) {
      cash = parseInt(coins.value);
      showCoins.innerHTML = `<h1>${cash}</h1>`;
      insert.disabled = true;
      coins.value = 0;
      introducirMonedas = 1;
      if (introducirMonedas != 0){
        let thr0w = document.createElement("li");
        thr0w.innerText = `Has introducido monedas`;
        history.appendChild(thr0w);
        historial.scroll(0, 200);
      }
    } else {
      alert("Por favor, introduce monedas");
    }
  };
  

  
  //Funciones para bajar Y subir la palanca
   function bajarPalanca() {
    document.getElementById('palanca_img').src = "img/palancaDOWN.png";
   }
   
   function subirPalanca() {
    document.getElementById('palanca_img').src = "img/palancaUP.png";
   }
   


  //Boton tirar
  const play = () => {
    if (cash > 0) {
      --cash;
      let oldCash = cash;
      showCoins.innerHTML = "";
      showCoins.innerHTML = `<h1>${cash} </h1>`;
      const { results, numbers } = showVegetables();
      const prize = checkPrize(numbers);
      if (prize) {
        cash = cash + prize;
        showCoins.innerHTML = "";
        showCoins.innerHTML = `<h1>${cash}</h1>`;
      }
      insertVegetables(results);
      showHistory(prize, oldCash);
    } else {
      alert("Por favor, introduce monedas.");
    }
  };
  
  //Boton salir
  const exit = () => {
    alert(`Has conseguido un total de ${cash} monedas.`);

    sacarMonedas = 1;
    if (sacarMonedas != 0){
      let thr0w = document.createElement("li");
      thr0w.innerText = `Sacas todas las monedas`;
      history.appendChild(thr0w);
      historial.scroll(0, 200);
    }
    coins.value = `${cash}`;
    insert.disabled = false;
    showCoins.innerHTML = `<h1>0</h1>`;

    /* container.remove();
    let goodbye = document.createElement("div");
    goodbye.style.textAlign = "center"; */
    /* goodbye.innerHTML = `
                          <h1>Gracias por Jugar!!!</h1>
                          <br>
                          <button class="play-again" onclick="window.location.reload();">Volver a Jugar</button>
                      `;
    document.body.appendChild(goodbye); */
  };
  
  //Funcion para mostrar la tirada
  const showVegetables = () => {
    const results = [];
    const numbers = [];
    for (let x = 0; x < 3; x++) {
      let shot = Math.round(Math.random() * 9);
      results.push(vegetables[shot]);
      numbers.push(shot);
      document.getElementById("pingu1").style.display = "none";
      document.getElementById("pingu2").style.display = "none";
      document.getElementById("pingu3").style.display = "none";    
    }
    return { results, numbers };
  };
  //Funcion para realizar la tirada
  const insertVegetables = (vegetables) => {
    for (let x = 0; x < vegetables.length; x++) {
      vegsArray[x].src = `./img/${vegetables[x]}`;
      figsArray[x].appendChild(vegsArray[x]);
    }
    cash === 0 ? (insert.disabled = false) : (insert.disabled = true);
  };
  


  //Funcion para comprobar el premio
  const checkPrize = (numbers) => {
    //Comprobamos que ninguna casilla contiene monedas
    if (numbers[0] !== 4 && numbers[1] !== 4 && numbers[2] !== 4){
      // Si no son monedas pero hay tres hortalizas iguales
      if (numbers[0] === numbers[1] && numbers[2] === numbers[1]) {
        return 5;
      } else if (
        //Si no son monedas pero hay dos hortalizas iguales
        numbers[0] === numbers[1] ||
        numbers[1] === numbers[2] ||
        numbers[0] === numbers[2]
      ) {
        return 2;
      }
      
    }else {
      //Si hay alguna moneda en la tirada
      //Comprobamos las monedas que hay con el metodo .filter
      const dollar = numbers.filter((num) => num === 4);
      if (dollar.length === 1) {
        //Si hay una moneda
        // Y ademas las otras dos verduras son iguales
        if (
          numbers[0] === numbers[1] ||
          numbers[1] === numbers[2] ||
          numbers[0] === numbers[2]
        ) {
          return 3;
        } else {
          //Si hay una moneda y las otras dos verduras son diferentes
          return 1;
        }
      } else if (dollar.length === 2) {
        //Si hay dos monedas
        return 4;
      } else if (dollar.length === 3) {
        //Si hay tres monedas
        return 10;
      } else {
        //Si ninguna verdura es igual
        return 0;
      }
    }
  };


  //Funcion para mostrar el historial de tiradas
  /* const showHistory = ( prize, oldCash) => { */
    //Muestra en el historial un mensaje cuando inserto monedas.
   /*  if (insert.onclick) {
        let thr0w = document.createElement("li");
        thr0w.innerText = `Has introducido monedas.`;
        history.appendChild(thr0w);
        historial.scroll(0, 200);
    } */

  /*   if (prize) {
      let thr0w = document.createElement("li");
      thr0w.innerText = `${prize} + ${oldCash} = ${prize + oldCash} $`;
      history.appendChild(thr0w);
      historial.scroll(0, 200);
    } else {
      let thr0w = document.createElement("li");
      thr0w.innerText = `${oldCash} $`;
      history.appendChild(thr0w);
      historial.scroll(0, 200);
    }
  };
  

 */





   //Funcion para mostrar el historial de tiradas
    const showHistory = ( prize, oldCash) => {
    
    if (prize == 1) {
      let thr0w = document.createElement("li");
      thr0w.innerText = `¡UNA MONEDA! Ganas 1 moneda`;
      history.appendChild(thr0w);
      historial.scroll(0, 200);
    } else if (prize == 2){
      let thr0w = document.createElement("li");
      thr0w.innerText = `¡DOS IGUALES! Ganas 2 monedas`;
      history.appendChild(thr0w);
      historial.scroll(0, 200);
    } else if (prize == 3){
      let thr0w = document.createElement("li");
      thr0w.innerText = `¡UNA MONEDA Y DOS IGUALES! Ganas 3 monedas`;
      history.appendChild(thr0w);
      historial.scroll(0, 200);
    } else if (prize == 4){
      let thr0w = document.createElement("li");
      thr0w.innerText = `¡DOS MONEDAS! Ganas 4 monedas`;
      history.appendChild(thr0w);
      historial.scroll(0, 200);
    } else if (prize == 5){
      let thr0w = document.createElement("li");
      thr0w.innerText = `¡TRES IGUALES! Ganas 5 monedas`;
      history.appendChild(thr0w);
      historial.scroll(0, 200);
    } else if (prize == 10){
      let thr0w = document.createElement("li");
      thr0w.innerText = `¡TRES MONEDAS! Ganas 10 monedas`;
      history.appendChild(thr0w);
      historial.scroll(0, 200);
    }
    else {
      let thr0w = document.createElement("li");
      thr0w.innerText = `Gastas una moneda`;
      history.appendChild(thr0w);
      historial.scroll(0, 200);
    }
  }; 
  




//------------------ESTILOS Y EFECTOS PARA MEJORAR LA APARIENCIA--------------

//Efecto del H1
var h1 = document.querySelector("h1");

h1.addEventListener("input", function() {
    this.setAttribute("data-heading", this.innerText);
});







  
   