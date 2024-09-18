let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];
let indexGastoModificando = -1;

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value.trim();
    let valorGasto = parseFloat(document.getElementById('valorGasto').value);
    let descripcionGasto = document.getElementById('descripcionGasto').value.trim();

    // Validación de campos
    if (!nombreGasto || isNaN(valorGasto) || valorGasto <= 0) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    if (valorGasto > 150) {
        alert('¡Alerta! El gasto supera los 150 Soles.');
    }

    if (indexGastoModificando >= 0) {
        // Modificar el gasto existente
        listaNombresGastos[indexGastoModificando] = nombreGasto;
        listaValoresGastos[indexGastoModificando] = valorGasto;
        listaDescripcionesGastos[indexGastoModificando] = descripcionGasto;
        indexGastoModificando = -1;
    } else {
        // Agregar un nuevo gasto
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcionesGastos.push(descripcionGasto);
    }

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];

        htmlLista += `<tr>
                        <td>${elemento}</td>
                        <td>S/. ${valorGasto.toFixed(2)}</td>
                        <td>${descripcionGasto}</td>
                        <td>
                            <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                            <button onclick="prepararModificacion(${posicion});">Modificar</button>
                        </td>
                      </tr>`;

        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function prepararModificacion(posicion) {
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion];

    indexGastoModificando = posicion;
}