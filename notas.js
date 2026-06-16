const contenido = document.getElementById('contenido');
const btnAgregar = document.getElementById('btnAgregar');
const fechaNota = document.getElementById('fechaNota');
const prioridad = document.getElementById('prioridad');
const buscar = document.getElementById('buscar');
const notasHoy = document.getElementById('notasHoy');
const notasManana = document.getElementById('notasManana');
let notas = JSON.parse(localStorage.getItem("notas")) || [];
const notasGuardadas = localStorage.getItem("notas");

notas.forEach(function(nota){
mostrarNota(nota);
});
function getFechaLocal(fecha = new Date()) {
  return fecha.toLocaleDateString("sv-SE");
}
//funcion para agregar las notas
function mostrarNota(nota){
//creamos un div para guardar las notas
   const nuevaNota = document.createElement('div');
   nuevaNota.classList.add("nueva-nota");
   //creamos comillas para mostar como texto el contemido del objeto de la nota
   nuevaNota.textContent = `
📅 ${nota.fechaFormateada}
🚦 ${nota.prioridad}

${nota.texto}
`;
//btnEliminar
const botonEliminar = document.createElement('button');

botonEliminar.textContent = 'eliminar';
botonEliminar.classList.add("btn-eliminar");
nuevaNota.appendChild(botonEliminar);
//elimina
botonEliminar.addEventListener('click',()=>{
    nuevaNota.remove();
    notas = notas.filter(unaNota => unaNota.texto !== nota.texto);
    localStorage.setItem("notas", JSON.stringify(notas));

});


   //comvertimos la fechca para que pueda comparar
const hoy = getFechaLocal();

const mananaDate = new Date();
mananaDate.setDate(mananaDate.getDate() + 1);
const fechaManana = getFechaLocal(mananaDate);
//logica parahoy y manana
if(nota.fecha === hoy){

    notasHoy.appendChild(nuevaNota);

}else if(nota.fecha === fechaManana){

    notasManana.appendChild(nuevaNota);
    

}

};
//funcion del boton agregar pendiente
btnAgregar.addEventListener("click", function(){
if(contenido.value === ""){
 alert('Ingresa una nota');
 return;
}
    // nuevas variables para que guarden la info obtenida.
    const fecha = fechaNota.value;
    //convertir texto del input fecha a fecha real
    const fechaBonita = new Date(fecha);
    //con localeDateString para comvertir fecha a texto (el que queremos)
   // queremos texto y y un llave el la funcion de mostrar nostas ewsta en rojopalabras el la fecha
    const opciones = {
  weekday: "long",
  day: "numeric",
  month: "long"
};
const fechaFormateada = fechaBonita.toLocaleDateString("es-ES", opciones);
const texto = contenido.value;
    const nivel = prioridad.value;
// cremos el objeto nota
const nota = {
    fecha: fecha,
    fechaFormateada: fechaFormateada,
    texto: texto,
    prioridad: nivel
};
notas.push(nota);
localStorage.setItem("notas", JSON.stringify(notas));
mostrarNota(nota);
contenido.value = "";
fechaNota.value = "";

});

