let listaArchivo = [];

const objArchivo = {
    id: '',
    nombre: ''
}

let editando = false;
let editar;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#archivo');
const btnAgregar = document.querySelector('#btn-agregar');

const validarFormulario = (e) => {
    e.preventDefault();

    if (nombreInput.value == false) {
        alert('Obligatorio enviar documento');
        return;
    }

    if (editando) {
        editarArchivo();
        editando = false;
    } else {
        objArchivo.id = Date.now();
        objArchivo.nombre = nombreInput.value;

        agregarArchivo();
    }
}

formulario.addEventListener('submit', validarFormulario);

const agregarArchivo = () => {
    listaArchivo.push({ ...objArchivo });

    mostrarArchivo();

    formulario.reset();

    limpiarObjeto();
}

const limpiarObjeto = () => {
    objArchivo.id = '';
    objArchivo.nombre = '';
}

const mostrarArchivo = () => {

    limpiarHTML();

    const divArchivo = document.querySelector('#listado');

    listaArchivo.forEach(archivo => {
        const { id, nombre } = archivo;

        const lista = document.createElement('p');
        lista.textContent = `${id} <----------->  ${nombre}`;
        lista.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargaArchivo(archivo);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-sm', 'ml-2', 'm-2', 'btn-info');
        lista.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarArchivo(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-sm', 'ml-2', 'm-2', 'btn-danger');
        lista.append(eliminarBoton);

        divArchivo.appendChild(lista);
    })
}

const cargaArchivo = (archivo) => {
    const { id } = archivo;

    objArchivo.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

const editarArchivo = () => {

    listaArchivo.map(archivo => {

        //TODO: NO PUDE ACTUALIZAR EL ARCHIVO CON UN NUEVO ARCHIVO
        if (archivo.id === objArchivo.id) {
            archivo.id = objArchivo.id;
            archivo.nombre = objArchivo.nombre;
        }
    });

    limpiarHTML();
    mostrarArchivo();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

const eliminarArchivo = (id) => {
    listaArchivo = listaArchivo.filter(archivo => archivo.id !== id);

    limpiarHTML();
    mostrarArchivo();
}

const limpiarHTML = () => {
    const divArchivo = document.querySelector('#listado');
    while (divArchivo.firstChild) {
        divArchivo.removeChild(divArchivo.firstChild);
    }
}

