//responsive navbar
const logoMenu = document.querySelector('.logoMenuImg');
const contItems = document.querySelector('.contItems');
const arrItems = document.querySelectorAll('.items');

logoMenu.addEventListener('click', () => {

    if (contItems.className === 'contItems') {

        contItems.className += " responsive";
        logoMenu.style.width = "35px";
        logoMenu.src = 'ressources/close.svg';

    } else {

        contItems.className = "contItems";
        logoMenu.style.width = "30px";
        logoMenu.src = 'ressources/menu.svg';

    }

})

arrItems.forEach(item => {
    item.addEventListener('click', () => {

        contItems.className = "contItems";
        logoMenu.src = 'ressources/menu.svg';

    })

})

//comienza el formulario

function validarFormulario() {
    // Obtener los valores de los campos
    var nombres = document.getElementById("nombres").value;
    var ubicacion = document.getElementById("ubicacion").value;
    var correo = document.getElementById("correo").value;
    var nit = document.getElementById("nit").value;
    var nombreEmpresa = document.getElementById("nombreEmpresa").value;
    var tituloOferta = document.getElementById("tituloOferta").value;
    var fechaInicio = document.getElementById("fechaInicio").value;
    var fechaFin = document.getElementById("fechaFin").value;
    var costoPorPersona = parseFloat(document.getElementById("costoPorPersona").value);
    var fechaReserva = document.getElementById("fechaReserva").value;
    var personasPorReserva = parseInt(document.getElementById("personasPorReserva").value);

    // Simulación de validaciones (puedes personalizarlas)
    if (nombres.length < 10 || /\d/.test(nombres)) {
        mostrarError("El campo de nombres y apellidos debe tener mínimo 10 letras y no contener números.");
        return false;
    }

    if (ubicacion < 1 || ubicacion > 4) {
        mostrarError("La ubicación debe ser un número entre 1 y 4.");
        return false;
    }

    if (!validarCorreo(correo)) {
        mostrarError("El correo no es válido.");
        return false;
    }

    if (nit.length !== 10) {
        mostrarError("El campo NIT debe tener exactamente 10 dígitos.");
        return false;
    }

    if (nombreEmpresa.length > 30) {
        mostrarError("El nombre de la empresa no puede sobrepasar los 30 caracteres.");
        return false;
    }

    if (tituloOferta.length > 20) {
        mostrarError("El título de la oferta no puede sobrepasar los 20 caracteres.");
        return false;
    }

    if (!validarFechas(fechaInicio, fechaFin)) {
        mostrarError("La fecha de inicio no puede ser mayor que la fecha de fin.");
        return false;
    }

    if (!validarFormatoFecha(fechaInicio) || !validarFormatoFecha(fechaFin) || !validarFormatoFecha(fechaReserva)) {
        mostrarError("Todas las fechas deben tener el formato (DD/MM/YYYY).");
        return false;
    }

    if (costoPorPersona < 0) {
        mostrarError("El costo por persona no puede ser negativo.");
        return false;
    }

    if (personasPorReserva > 4) {
        mostrarError("El número de personas por reserva no puede ser mayor a 4.");
        return false;
    }

    // Calcular costoTotal y aplicar IVA
    var costoTotal = costoPorPersona * personasPorReserva;
    var iva = costoTotal * 0.19;
    costoTotal += iva;

    // Generar una clave única en localStorage
    var timestamp = new Date().getTime();
    var claveLocalStorage = "formularioData_" + timestamp;

    // Simular almacenamiento en localStorage
    var datos = {
        nombres: nombres,
        ubicacion: ubicacion,
        correo: correo,
        nit: nit,
        nombreEmpresa: nombreEmpresa,
        tituloOferta: tituloOferta,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        costoPorPersona: costoPorPersona,
        fechaReserva: fechaReserva,
        personasPorReserva: personasPorReserva,
        costoTotal: costoTotal
    };

    localStorage.setItem(claveLocalStorage, JSON.stringify(datos));

    mostrarExito("Formulario ingresado con exito, Felicidades!");
    return false;
}

function mostrarError(mensaje) {
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "<div class='error'>" + mensaje + "</div";
}

function mostrarExito(mensaje) {
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "<div class='exito'>" + mensaje + "</div>";
}

// Función para validar el formato de correo electrónico
function validarCorreo(correo) {
    var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo);
}

// Función para validar fechas (inicio no mayor que fin)
function validarFechas(fechaInicio, fechaFin) {
    var fechaInicioParts = fechaInicio.split("/");
    var fechaFinParts = fechaFin.split("/");

    var fechaInicioDate = new Date(
        fechaInicioParts[2],
        fechaInicioParts[1] - 1,
        fechaInicioParts[0]
    );
    var fechaFinDate = new Date(
        fechaFinParts[2],
        fechaFinParts[1] - 1,
        fechaFinParts[0]
    );

    return fechaInicioDate <= fechaFinDate;
}

// Función para validar el formato de fecha (DD/MM/YYYY)
function validarFormatoFecha(fecha) {
    var expresion = /^\d{2}\/\d{2}\/\d{4}$/;
    return expresion.test(fecha);
}


//termina el formulario
