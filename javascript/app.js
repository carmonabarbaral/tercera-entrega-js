/* Inicio lógica de la anidación del menu */

const menu = document.querySelector(".iconCarrito");
const nav = document.querySelector(".nav");
const listaCarrito = document.querySelector(".nav__list");
const btnFinalizar = document.querySelector("#btn-finalizar");

menu.addEventListener("click", animateBars);

function animateBars() {
	nav.classList.toggle("active");
}

/* Inicio lógica del carrito */

// Creamos los objetos que van a representar a la base de datos con materias
const materias = [
	{
		id: 1,
		nombre: "Matemática",
		img: "https://img.freepik.com/vector-premium/matematicas_23-2148178218.jpg?w=2000",
		grado: " Curso : primero",
		descripcion: "Aprende matemática de una forma dinámica y divertida que recordarás para siempre",
		precio: 1000,
	},
	{
		id: 2,
		nombre: "Lengua",
		grado: " Curso : segundo",
		img: "https://img.freepik.com/vector-gratis/nina-haciendo-tarea-libros-sobre-fondo-blanco_1308-104637.jpg?w=740&",
		descripcion: "Aprende el maravilloso arte del lenguaje y todas sus utilidades",
		precio: 1200,
	},
	{
		id: 3,
		nombre: "Ciencias sociales",
		grado: " Curso : primero",
		img: "https://img.freepik.com/vector-gratis/gente-trabajo-equipo-piezas-rompecabezas_24877-54950.jpg?w=740&",
		descripcion: "Descubrí todo lo que podés aprender sobre nuestro territorio y organización del territorio",
		precio: 1400,
	},
	{
		id: 4,
		nombre: "Ciencias naturales",
		grado: " Curso : tercero",
		img: "https://img.freepik.com/vector-gratis/fondo-educacion-cientifica-dibujado-mano_23-2148499325.jpg?w=740",
		descripcion: "Aprendé experimentando",
		precio: 1600,
	},
	{
		id: 5,
		nombre: "Historia",
		grado: " Curso : cuarto",
		img: "https://img.freepik.com/vector-gratis/dibujado-mano-ilustracion-dia-patrimonio-mundial_23-2149312521.jpg?w=740",
		descripcion: "Hace un recorrido por nuestra historia y descubrí nuestros origenes ",
		precio: 1800,
	},
	
	{
		id: 6,
		nombre: "Geografia",
		grado: "Curso: quinto",
		img: "https://img.freepik.com/vector-gratis/ilustracion-mapa-ninos-dibujados-mano_23-2149562332.jpg?w=740",
		descripcion: "Aprendé todo sobre territorios nacionales e internacionales a través de juegos",
		precio: 2000,
	},
	{
		id: 7,
		nombre: "Bellas artes ",
		grado: "Curso: todos",
		img: "https://img.freepik.com/vector-gratis/diseno-cuadros-ninos-haciendo-obras-arte_1308-70990.jpg?w=740",
		descripcion: "Desarrolla tus habilidades y percepción y dejá volar tu imaginación",
		precio: 2000,
	},
	{
		id: 8,
		nombre: "Música",
		grado: " Curso : segundo",
		img: "https://img.freepik.com/vector-gratis/doodle-ninos-instrumento-musical-melodia_1308-108012.jpg?w=740",
		descripcion: "Conocé y práctica el uso de diferentes instrumentos y desarrolla tu voz",
		precio: 2000,
	},
	{
		id: 9,
		nombre: "Ajedrez",
		grado: "Curso: todos",
		img: "https://img.freepik.com/vector-gratis/ninos-jugando-tablero-ajedrez-aula_1308-117073.jpg?w=900",
		descripcion: "Desplegá tu inteligencia y talento en estrategias de juego",
		precio: 2000,
	},{
		id: 10,
		nombre: "Programación",
		grado: "Curso: todos",
		img: "https://img.freepik.com/vector-gratis/ilustracion-concepto-abstracto-campamento-programacion-informatica_335657-3921.jpg?w=740",
		descripcion: "Conocé y práctica la carrera del futuro",
		precio: 2000,
	},
	{
		id: 11,
		nombre: "Taller literario",
		grado: "Curso: tercero",
		img: "https://img.freepik.com/vector-gratis/pegatinas-libros-deslumbrantes_23-2149587241.jpg?w=740",
		descripcion: "Sumergite en el maravillos mundo de la literatura",
		precio: 2000,
	},
	{
		id: 12,
		nombre: "Yoga",
		grado: "Curso: Todos",
		img: "https://img.freepik.com/vector-gratis/actividades-yoga-ninos_1308-32100.jpg?w=740",
		grado: "primero",
		descripcion: "Probá y disfruta desde pequeño sus beneficios",
		precio: 2000,
	},
];

// Creo una constante que va a guardar mi contenedor de materias
const contenedorMaterias = document.getElementById("materias__container");

// Creo una constante que va a mostrar el numero de productos en el carrito
const countCarrito = document.getElementById("countCarrito");

// Creo la variable carrito en el storage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Recorro mi array de materias con un forEach y los imprimo en la pantalla

function mostrarProductos() {
	materias.forEach((materia) => {
		// Por cara materia voy a llenar internamente mi contenedor de materias con innerHTML
		contenedorMaterias.innerHTML += `<div class="card">
        <h3>${materia.nombre}</h3>
        <img src="${materia.img}" alt="" />
        <p>${materia.descripcion}</p>
		<p>${materia.grado}</p>
        <p>$${materia.precio}</p>
        <a href="#" class="boton-comprar" id='${materia.id}'>Comprar</a>
      </div>`;
	});

	comprar(materias);
}

// Llamamos a la funcion.
mostrarProductos();

// Creo la funcion que va comprar el id del boton de la card de la materia con la mataria en el el array de objetos materias
function comprar(materias) {
	const btnComprar = document.querySelectorAll(".boton-comprar");

	btnComprar.forEach((btn) => {
		btn.onclick = (e) => {
			e.preventDefault();
			const materiaSeleccionada = materias.find(
				(mat) => mat.id === parseInt(btn.id)
			);
			// Aca creamos un objeto igual a la materia seleccionada y le agregamos la propiedad cantidad
			const materiaCarrito = { ...materiaSeleccionada, cantidad: 1 };
			const indexCarrito = carrito.findIndex(
				(mat) => mat.id === materiaCarrito.id
			);

			// Luego de comparar pusheamos al carrito la materia
			if (indexCarrito === -1) {
				carrito.push(materiaCarrito);
			} else {
				// Si la materia existe sumamos 1 a la cantidad
				carrito[indexCarrito].cantidad++;
			}

			// Guardamos en el localStorage el carrito y llamamos a las funciones que actualizan el valor e imprime el carrito
			localStorage.setItem("carrito", JSON.stringify(carrito));
			actualizarCarrito();
			imprimirCarrito();
		};
	});
}

// Creamos la funcion que va a actualizar el valor del incono del carrito
function actualizarCarrito() {
	countCarrito.innerHTML = carrito.length;
}

// Creamos la funcion que va a imprimir el carrito en la lista
function imprimirCarrito() {
	listaCarrito.innerHTML = "";
	carrito.forEach((item) => {
		listaCarrito.innerHTML += `<li><div><img src="${item.img}" /> ${
			item.nombre
		} x ${item.cantidad}</div> <div>$${
			item.cantidad * item.precio
		}<i class='bx bxs-trash' data-id='${item.id}'></i></div></li>`;
	});

	// Creamos un boton para eliminar la materia seleccionada de la misma forma, comparando el data-id con el id de la materia del carrito
	if (carrito !== []) {
		const btnEliminar = document.querySelectorAll(".bxs-trash");
		btnEliminar.forEach((btn) => {
			btn.onclick = (e) => {
				const materiaId = e.target.getAttribute("data-id");
				carrito = carrito.filter((mat) => mat.id != materiaId);
				localStorage.setItem("carrito", JSON.stringify(carrito));
				actualizarCarrito();
				imprimirCarrito();
			};
		});
	}
	// llamamos a la funcion q crea el total o muestra que el carrito esta vacio
	crearTotal();
}
let sumatotal = 0;
crearTotal();
actualizarCarrito();
imprimirCarrito();

// Creamos a la funcion va a crear el total
function crearTotal() {
  // Iniciamos la variable sumatotal en 0 y reccorremos el carrito multiplicando la cantidad por el precio de cada producto y vamos sumando el valor.
	
	carrito.forEach((producto) => {
		sumatotal += producto.precio * producto.cantidad;
	});
	const total = document.querySelector("#total");
// dependiendo si el valor de sumatotal es 0  ejecutamos la funcion que corresponda
	sumatotal !== 0 ? carritoLleno() : carritoVacio();
}

// Creamos una funcion que va a imprimir el total en el html en el caso de que exista y hacemos aparecer el boton de finalizar
function carritoLleno() {
	total.innerHTML = `<span>El total es de $${sumatotal}</span>`;
	btnFinalizar.style.display = "block";
}

// Creamos una funcion que va a imprimir el texto informando que el carrito esta vacio y desaparecemos el boton para finalizar compra
function carritoVacio() {
	total.innerHTML = `El carrito esta vacio`;
	btnFinalizar.style.display = "none";
}
const boton = document.querySelector("#boton");
boton.addEventListener("click", ()=>{
	Swal.fire('Cursada seleccionada')
});

