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
		nombre: "matematica",
		img: "https://img.freepik.com/vector-premium/matematicas_23-2148178218.jpg?w=2000",
		grado: "primero",
		descripcion: "matetica es una materia",
		precio: 1000,
	},
	{
		id: 2,
		nombre: "lengua",
		grado: "segundo",
		img: "https://img.freepik.com/vector-premium/matematicas_23-2148178218.jpg?w=2000",
		grado: "primero",
		descripcion: "matetica es una materia",
		precio: 1200,
	},
	{
		id: 3,
		nombre: "ciencias sociales",
		grado: "primero",
		img: "https://img.freepik.com/vector-premium/matematicas_23-2148178218.jpg?w=2000",
		grado: "primero",
		descripcion: "matetica es una materia",
		precio: 1400,
	},
	{
		id: 4,
		nombre: "ciencias naturales",
		grado: "tercero",
		img: "https://img.freepik.com/vector-premium/matematicas_23-2148178218.jpg?w=2000",
		grado: "primero",
		descripcion: "matetica es una materia",
		precio: 1600,
	},
	{
		id: 5,
		nombre: "historia",
		grado: "primero",
		img: "https://img.freepik.com/vector-premium/matematicas_23-2148178218.jpg?w=2000",
		grado: "primero",
		descripcion: "matetica es una materia",
		precio: 1800,
	},
	{
		id: 6,
		nombre: "geografia",
		grado: "segundo",
		img: "https://img.freepik.com/vector-premium/matematicas_23-2148178218.jpg?w=2000",
		grado: "primero",
		descripcion: "matetica es una materia",
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

crearTotal();
actualizarCarrito();
imprimirCarrito();

// Creamos a la funcion va a crear el total
function crearTotal() {
  // Iniciamos la variable sumatotal en 0 y reccorremos el carrito multiplicando la cantidad por el precio de cada producto y vamos sumando el valor.
	let sumatotal = 0;
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
