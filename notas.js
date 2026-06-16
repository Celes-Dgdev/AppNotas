const contenido = document.getElementById('contenido');
const btnAgregar = document.getElementById('btnAgregar');
const fechaNota = document.getElementById('fechaNota');
const prioridad = document.getElementById('prioridad');
const buscar = document.getElementById('buscar');

const notasHoy = document.getElementById('notasHoy');
const notasManana = document.getElementById('notasManana');

let notas = JSON.parse(localStorage.getItem("notas")) || [];

// render inicial
notas.forEach(nota => mostrarNota(nota));

function getFechaLocal(fecha = new Date()) {
  return fecha.toLocaleDateString("sv-SE");
}

// mostrar nota
function mostrarNota(nota) {

  const nuevaNota = document.createElement('div');
  nuevaNota.classList.add("nueva-nota");

  nuevaNota.innerHTML = `
    📅 ${nota.fechaFormateada}
    <br>🚦 ${nota.prioridad}
    <br><br>${nota.texto}
  `;

  // botón eliminar
  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = "Eliminar";
  botonEliminar.classList.add("btn-eliminar");

  nuevaNota.appendChild(botonEliminar);

  botonEliminar.addEventListener('click', () => {

    nuevaNota.remove();

    notas = notas.filter(n =>
      n.texto !== nota.texto || n.fecha !== nota.fecha
    );

    localStorage.setItem("notas", JSON.stringify(notas));
  });

  // fechas
  const hoy = getFechaLocal();

  const mananaDate = new Date();
  mananaDate.setDate(mananaDate.getDate() + 1);
  const fechaManana = getFechaLocal(mananaDate);

  if (nota.fecha === hoy) {
    notasHoy.appendChild(nuevaNota);
  } else if (nota.fecha === fechaManana) {
    notasManana.appendChild(nuevaNota);
  }
}

// agregar nota
btnAgregar.addEventListener("click", () => {

  if (contenido.value.trim() === "") {
    alert("Ingresa una nota");
    return;
  }

  const fecha = fechaNota.value;

  if (!fecha) {
    alert("Selecciona una fecha");
    return;
  }

  const fechaBonita = new Date(fecha);

  const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  const fechaFormateada = fechaBonita.toLocaleDateString("es-ES", opciones);

  const nota = {
    fecha: fecha,
    fechaFormateada: fechaFormateada,
    texto: contenido.value,
    prioridad: prioridad.value
  };

  notas.push(nota);
  localStorage.setItem("notas", JSON.stringify(notas));

  mostrarNota(nota);

  contenido.value = "";
  fechaNota.value = "";
});