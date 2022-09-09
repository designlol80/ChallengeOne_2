var palabra='';
let lista=['DESCANSO','PERRO','CAMINAR','CANTAR','GONZALES'];

function empezar(){
    'use strict'
    //variable para almacenar la configuracion actual
    var juego=null;

    var $html={
        hombre:document.getElementById('hombre'),
        result:document.getElementById('resultado'),
        adivinado:document.querySelector('.adivinado'),
        errado:document.querySelector('.errado'),
    }

    var $imagen;
    $imagen=$html.result;
    var img=0;
    $imagen.src='./img/d' + img + '.png';

    function dibujar(juego){
        var $elem;
        //actualizamos la imagen hombre
        $elem=$html.hombre;
        var estado=juego.estado;
        $elem.src='./img/d' + estado + '.png';
        
        //creamos las letras adivinadas
        var palabra=juego.palabra;
        var adivinado=juego.adivinado;
        $elem=$html.adivinado;
        //borramos los elementos anteriores
        $elem.innerHTML='';

        for(let letra of palabra){
            let $span=document.createElement('span');
            let $txt=document.createTextNode('');
            if(adivinado.indexOf(letra) >= 0){
                $txt.nodeValue=letra;
            }
            $span.setAttribute('class','letra adivinada');
            $span.appendChild($txt);
            $elem.appendChild($span);
        }
        //creamos las letras de errado
        var errado=juego.errado;
        $elem=$html.errado;
        //borramos los elementos anteriores
        $elem.innerHTML='';

        for(let letra of errado){
            let $span=document.createElement('span');
            let $txt=document.createTextNode(letra);
            $span.setAttribute('class','letra errada');
            $span.appendChild($txt);
            $elem.appendChild($span);
        }
    }
    function adivinar(juego,letra){
        var estado=juego.estado;
        //si ya se ha perdido o ganado no hay nada que hacer
        if(estado===10||estado===0){
            return;
        }
        //si ya se hemos adivinado o errado la letra no hay nada que hacer
        var adivinado=juego.adivinado;
        var errado=juego.errado;
        //si ya hemos adivinado o errado la letra tampoco hay quenhacer nada
        if(adivinado.indexOf(letra)>=0 || errado.indexOf(letra)>=0){
            return;
        }
        var palabra=juego.palabra;
        //si la palabra contiene la letra significa que letra es efectivamente letra de la palabra
        if(palabra.indexOf(letra)>=0){
            let ganado=true;
            //debemos ver si lllegamos al estado ganado
            for(let l of palabra){
                if(adivinado.indexOf(l)< 0 && l !== letra){
                    ganado=false;
                    juego.previo=juego.estado;
                    break;
                }
            } 
            // agreagmos la letra a la lista de letras adivinadas
            adivinado.push(letra);
            //si ya se ha ganado debemos indicarlo
            if(ganado){
                $imagen.src='./img/d' + 11 + '.png';
            }    
        }else{
            //si no es letra de la palabra,acercamos al hombre un paso mas de su ahorca
            juego.estado++;
            errado.push(letra);
        }   
    }
    window.onkeypress=function adivinarLetra(e){
        var letra=e.key;
        letra=letra.toUpperCase();
        adivinar(juego,letra);
        var estado=juego.estado;
        if(estado===10){
            $imagen.src='./img/d' + 12 + '.png';
         }
        dibujar(juego);
    }
    window.nuevoJuego=function nuevoJuego(){
        var palabra=palabraAleatoria();
        juego={};
        juego.palabra=palabra;
        juego.estado=1;
        juego.adivinado=[];
        juego.errado=[];
        dibujar(juego);
    }
    function palabraAleatoria(){
        var index=~~(Math.random()*lista.length);
        return lista[index];
    }
    nuevoJuego();

    document.getElementById("idhombreahorcado").style.display="";////
    document.getElementById("hombre").style.display="show";
    document.getElementById("hombre").style.display="inline-block";
    document.getElementById("idletra1").style.display="";////////////
    document.getElementById("resultado").style.display="show";
    document.getElementById("resultado").style.display="inline-block";

    document.getElementById("idingreso").style.display="";

    document.getElementById("id_left").style.display="none";
    document.getElementById("input-texto").style.display="none";
    document.getElementById("btniniciar_juego").style.display="none";
    document.getElementById("btnagregar_palabra").style.display="none";

    document.getElementById("id_button").style.display="none";
    document.getElementById("id_button1").style.display="show";
    document.getElementById("id_button1").style.display="block";
}

function agregar_palabra(){
    document.getElementById("id_left").style.height="70%";
    document.getElementById("id_left").style.float="left";
    document.getElementById("input-texto").style.display="show";
    document.getElementById("input-texto").style.display="block";

    document.getElementById("btniniciar_juego").style.display="none";
    document.getElementById("btnagregar_palabra").style.display="none";

    document.getElementById("id_button").style.display="show";
    document.getElementById("id_button").style.display="block";

}

function guardaryempezar(){
    palabra=document.getElementById("input-texto").value.toUpperCase();
    lista.push(palabra);
    empezar(lista);
}

