// MOSTRAR JUEGOS DE SWITCH
const switchGamesContainer = document.getElementById("switchGamesContainer");
const listadoJuegosSwitch = "json/juegosSwitch.json";

fetch(listadoJuegosSwitch)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(juego => {
            switchGamesContainer.innerHTML += `
            <div class="card">
            <img src=${juego.imagen} alt="image-missing" class="card-img">
            <p class="game-info">${juego.nombre}</p>
            <p class="game-info">${juego.consola}</p>
            <p class="game-info">$${juego.precio}</p>
            <button class="buy-btn" id="boton${juego.id}">Agregar al Carritio</button>
            </div>`

            const boton = document.getElementById(`boton${juego.id}`);
            boton.addEventListener("click", () => {agregarAlCarritoSwitch(juego.id)})
            boton.addEventListener("click", () => {
                Swal.fire( {
                    title: "Producto agregado al carrito",
                    text: `${juego.nombre} ha sido agregado al carrito`,
                    confirmButtonText: "Ok"
                })
            })
            
        })
    })
    .catch(error => console.log(error))
    .finally( () => console.log("Juegos de switch correctamente cargados"))

const tresDsGamesContainer = document.getElementById("3dsGamesContainer");
const listadoJuegos3ds = "json/juegos3ds.json";


// MOSTRAR JUEGOS DE 3DS
fetch(listadoJuegos3ds)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(juego => {
            tresDsGamesContainer.innerHTML += `
            <div class="card">
            <img src=${juego.imagen} alt="image-missing" class="card-img">
            <p class="game-info">${juego.nombre}</p>
            <p class="game-info">${juego.consola}</p>
            <p class="game-info">$${juego.precio}</p>
            <button class="buy-btn" id="boton${juego.id}">Agregar al Carritio</button>
            </div>`

            const boton = document.getElementById(`boton${juego.id}`);
            boton.addEventListener("click", () => {agregarAlCarrito3ds(juego.id)})
            boton.addEventListener("click", () => {
                Swal.fire( {
                    title: "Producto agregado al carrito",
                    text: `${juego.nombre} ha sido agregado al carrito`,
                    confirmButtonText: "Ok"
                })
            })
        })
    })
    .catch(error => console.log(error))
    .finally( () => console.log("Juegos de 3ds correctamente cargados"))


// CARRITO
let carrito = [];


// FUNCIONES PARA AGREGAR AL CARRITO
const agregarAlCarritoSwitch = (id) => {
    fetch(listadoJuegosSwitch)
        .then(respuesta => respuesta.json())
        .then(datos => {
            const juego = datos.find((juego) => juego.id === id);
            const juegoEnCarrito = carrito.find((juego) => juego.id === id);
            if(juegoEnCarrito){
                juegoEnCarrito.cantidad++;
            }else {
                carrito.push(juego);
            }
        })
        calcularTotal();
}

const agregarAlCarrito3ds = (id) => {
    fetch(listadoJuegos3ds)
        .then(respuesta => respuesta.json())
        .then(datos => {
            const juego = datos.find((juego) => juego.id === id);
            const juegoEnCarrito = carrito.find((juego) => juego.id === id);
            if(juegoEnCarrito){
                juegoEnCarrito.cantidad++;
            }else {
                carrito.push(juego);
            }
        })
        calcularTotal();
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {mostrarCarrito()});


// FUNCIÓN PARA MOSTRAR EL CARRITO 
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((juego) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card">
            <img src=${juego.imagen} alt="image-missing" class="card-img">
            <p class="game-info">${juego.nombre}</p>
            <p class="game-info">${juego.consola}</p>
            <p class="game-info">$${juego.precio}</p>
            <p class="game-info">Cantidad: ${juego.cantidad}</p>
            <button class="buy-btn" id="eliminar${juego.id}">Quitar del carrito</button>
            </div>`

            contenedorCarrito.appendChild(card);
            const boton = document.getElementById(`eliminar${juego.id}`);
            boton.addEventListener("click", () => {
                eliminarDelCarrito(juego.id);
            })
    })
    calcularTotal();
}


// FUNCIÓN PARA SACAR UN PRODUCTO DEL CARRITO
const eliminarDelCarrito = (id) => {
    const juego = carrito.find((juego) => juego.id === id);
    const indice = carrito.indexOf(juego);
    carrito.splice(indice, 1);
    mostrarCarrito();
}


// FUNCIÓN PARA ELIMINAR TODO DEL CARRITO
const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
}

const total = document.getElementById("total");


// FUNCIÓN PARA CALCULAR EL TOTAL
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((juego) => {
        totalCompra += juego.precio * juego.cantidad;
    })
    total.innerHTML = `$${totalCompra}`;
}


// FINALIZAR COMPRA
const finalizarCompra = document.getElementById("finalizarCompra");
formContainer = document.getElementById("formContainer");

finalizarCompra.addEventListener("click", () => {
    formContainer.innerHTML = `
    <form action="" id="form">
        <label for="nombre" class="label">Nombre</label>
        <input type="text" class="input">

        <label for="apellido" class="label">Apellido</label>
        <input type="text" class="input">

        <label for="tarjeta" class="label">Provincia</label>
        <input type="text" class="input">

        <label for="tarjeta" class="label">Código Postal</label>
        <input type="number" class="input">

         <label for="tarjeta" class="label">Tarjeta de crédito</label>
        <input type="number" class="input">

        <label for="tarjeta" class="label">Fecha de Vencimiento</label>
        <input type="date" class="input">

         <label for="tarjeta" class="label">Código de Seguridad</label>
        <input type="number" class="input">
    </form>
    <button class="submit-button" id="confirmar">Confirmar compra</button>`

    const confirmar = document.getElementById("confirmar");
confirmar.addEventListener("click", () => {
    Swal.fire({
        title: "Finalizar Compra",
        text: "¿Está seguro de que desea comprar los productos seleccionados?",
        icon: "warning",
        confirmButtonText: "Confirmar compra",
        showCancelButton: true,
        cancelButtonText: "Cancelar"
    }).then((result) => {
        Swal.fire({
            title: "Compra realizada",
            text: `Su compra ha sido realizada con exito, a jugar!!`,
            icon: "success",
            confirmButtonText: "Aceptar"

        })
    })

    eliminarDelCarrito();
    limpiarFormulario();
});
});

const limpiarFormulario = () => {
    const formul = document.getElementById("form");
    formul.reset();
}
