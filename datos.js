document.getElementById('buscarDatos').addEventListener('click', buscarDatos)
document.getElementById('cards').hidden = true
var data = []

function cambiaSeleccion() {
    document.getElementById('btnConfirmar').hidden = true
    let movie = new Array ('Elige una Opción', 'Título Película', 'Actor')
    let song = new Array ('Elige una Opción', 'Nombre Canción', 'Nombre Albúm', 'Artista')
    let book = new Array ('Elige una Opción', 'Título Libro', 'Escritor')
    let opciones = [
        [],
        movie,
        song,
        book
    ]
    let buscarPor = document.getElementById('buscarPor').value
    if (buscarPor != 0) {
        misOpciones = opciones[buscarPor]
        cantidadOpciones = misOpciones.length
        document.getElementById('opcionBusqueda').length = cantidadOpciones
        for (i = 0; i < cantidadOpciones; i++) {
            document.getElementById('opcionBusqueda').options[i].value = misOpciones[i]
            document.getElementById('opcionBusqueda').options[i].text = misOpciones[i]
        }
    } else {
        document.getElementById('buscarPor').length = 1
        document.getElementById('opcionBusqueda').options[0].value = 'Elige una Opción'
        document.getElementById('opcionBusqueda').options[0].text = 'Elige una Opción'
    }
}

function buscarDatos() {
    let busqueda = document.getElementById('opcionBusqueda').value
    let valorBusqueda = document.getElementById('valor').value
    if (valorBusqueda == null || valorBusqueda.length == 0 || busqueda == 'Elige una Opción') {
        alert('Debe completar los campos')
    } else {
        switch (busqueda) {
            case 'Título Película' :
                axios.get('https://imdb-api.com/es/API/SearchMovie/XXXXXXX/' + valorBusqueda + '')
                    .then(function(response) {
                        let datos = response.data.results
                        muestraPeliculaTitulo(datos)
                    })
                    .catch(function(error) {
                        console.log(error.name)
                        console.log(error.message)
                    })
                break
            case 'Actor' :
                axios.get('https://imdb-api.com/es/API/SearchName/XXXXXXX/' + valorBusqueda + '')
                    .then(function(response) {
                        let datos = response.data.results
                        muestraActor(datos)
                    })
                    .catch(function(error) {
                        console.log(error.name)
                        console.log(error.message)
                    })
                break
            case 'Nombre Canción' :
                axios.get('http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + valorBusqueda + '&api_key=XXXXXXX&format=json')
                    .then(function(response) {
                        let datos = response.data.results.trackmatches.track
                        muestraCancion(datos)
                    })
                    .catch(function(error) {
                        console.log(error.name)
                        console.log(error.message)
                    })
                break
            case 'Nombre Albúm' :
                axios.get('http://ws.audioscrobbler.com/2.0/?method=album.search&album=' + valorBusqueda + '&api_key=XXXXXXX&format=json')
                    .then(function(response) {
                        let datos = response.data.results.albummatches.album
                        muestraAlbum(datos)
                    })
                    .catch(function(error) {
                        console.log(error.name)
                        console.log(error.message)
                    })
                break
            case 'Artista' :
                axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + valorBusqueda + '&api_key=XXXXXXX&format=json')
                    .then(function(response) {
                        let datos = response.data.results.artistmatches.artist
                        muestraArtista(datos)
                    })
                    .catch(function(error) {
                        console.log(error.name)
                        console.log(error.message)
                    })
                break
            case 'Título Libro' :
                axios.get ('http://openlibrary.org/search.json?title=' + valorBusqueda + '')
                    .then(function(response) {
                        let datos = response.data.docs
                        muestraLibros(datos)
                    })
                    .catch(function(error) {
                        console.log(error.name)
                        console.log(error.message)
                    })
                break
            case 'Escritor' :
                axios.get ('http://openlibrary.org/search.json?author=' + valorBusqueda + '')
                    .then(function (response) {
                        let datos = response.data.docs
                        muestraAutor(datos)   
                    })
                    .catch(function (error) {
                        console.log(error.name)
                        console.log(error.message)
                    })
                break
            default :
                console.log ('Sale por default')
        }
    }
}

function muestraPeliculaTitulo(datos) {
    let myModal = document.getElementById('modalContenido')
    let modal = bootstrap.Modal.getOrCreateInstance(myModal)
    modal.show()
    document.getElementById('tituloModal').innerHTML += 'Películas por Título'
    document.getElementById('cabeceraTabla').innerHTML += 
    '<tr>' +
        '<th scope="col">Imagen</th>' +
        '<th scope="col">Título</th>' +
        '<th scope="col">Descripción</th>' +
        '<th scope="col">Acción</th>' +
    '</tr>'
    datos.forEach(element => {
        document.getElementById('contenidoTabla').innerHTML +=
        '<tr>' +
            '<td>' + '<img src="' + element.image + '" width="125"></img>' + '</td>' +
            '<td class="align-middle">' + element.title + '</td>' + 
            '<td class="align-middle">' + element.description + '</td>' +
            '<td class="align-middle">' + 
            '<button class="btn btn-primary" id="agregaCarrito" onclick="agregaCarrito(\''+ element.image + '\',\'' + element.title + '\',\'' + element.description + '\',\'' + element.id + '\')"><i class="bi bi-cart4"></i></button>' + '</td>' +
        '</tr>'       
    })
    document.getElementById('buscarPor').selectedIndex = 0
    document.getElementById('valor').value = ''
    document.getElementById('opcionBusqueda').selectedIndex = 0 
}

function muestraActor(datos) {
    let myModal = document.getElementById('modalContenido')
    let modal = bootstrap.Modal.getOrCreateInstance(myModal)
    modal.show()
    document.getElementById('tituloModal').innerHTML += 'Datos del Actor/Actriz'
    document.getElementById('cabeceraTabla').innerHTML += 
    '<tr>' +
        '<th scope="col">Imagen</th>' +
        '<th scope="col">Nombre</th>' +
        '<th scope="col">Datos</th>' +
    '</tr>'
    datos.forEach(element => {
        document.getElementById('contenidoTabla').innerHTML +=
        '<tr>' +
            '<td>' + '<img src="' + element.image + '" width="125"></img>' + '</td>' + 
            '<td class="align-middle">' + element.title + '</td>' +
            '<td class="align-middle">' + element.description + '</td>' +
        '</tr>'       
    })
    document.getElementById('buscarPor').selectedIndex = 0
    document.getElementById('valor').value = ''
    document.getElementById('opcionBusqueda').selectedIndex = 0
}

function muestraCancion(datos) {
    let myModal = document.getElementById('modalContenido')
    let modal = bootstrap.Modal.getOrCreateInstance(myModal)
    modal.show()
    document.getElementById('tituloModal').innerHTML += 'Datos de la Canción'
    document.getElementById('cabeceraTabla').innerHTML += 
    '<tr>' +
        '<th scope="col">Canción</th>' +
        '<th scope="col">Artista</th>' +
        '<th scope="col">Escuchala</th>' +
    '</tr>'
    datos.forEach(element => {
        document.getElementById('contenidoTabla').innerHTML +=
        '<tr>' +
            '<td class="align-middle">' + element.name + '</td>' + 
            '<td class="align-middle">' + element.artist + '</td>' +
            '<td class="aling-middle">' + '<a class="btn btn-primary" href="' + element.url + '" role="button" target="_blank">Link</a>' + '</td>' +
        '</tr>'       
    })
    document.getElementById('buscarPor').selectedIndex = 0
    document.getElementById('valor').value = ''
    document.getElementById('opcionBusqueda').selectedIndex = 0
}

function muestraAlbum(datos) {
    let myModal = document.getElementById('modalContenido')
    let modal = bootstrap.Modal.getOrCreateInstance(myModal)
    modal.show()
    document.getElementById('tituloModal').innerHTML += 'Discos por Título'
    document.getElementById('cabeceraTabla').innerHTML += 
    '<tr>' +
        '<th scope="col">Imagen</th>' +
        '<th scope="col">Nombre</th>' +
        '<th scope="col">Artista</th>' +
        '<th scope="col">Acción</th>' +
    '</tr>'
    datos.forEach(element => {
        document.getElementById('contenidoTabla').innerHTML +=
        '<tr>' +
            '<td>' + '<img src="' + element.image['1']['#text'] + '" width="125"></img>' + '</td>' +
            '<td class="align-middle">' + element.name + '</td>' + 
            '<td class="align-middle">' + element.artist + '</td>' +
            '<td class="align-middle">' + 
            '<button class="btn btn-primary" id="agregaCarrito" onclick="agregaCarrito(\''+ element.image['3']['#text'] + '\',\'' + element.name + '\',\'' + element.artist + '\',\'' + element.mbid + '\')"><i class="bi bi-cart4"></i></button>' + '</td>' +
        '</tr>'       
    })
    document.getElementById('buscarPor').selectedIndex = 0
    document.getElementById('valor').value = ''
    document.getElementById('opcionBusqueda').selectedIndex = 0
}

function muestraArtista(datos) {
    let myModal = document.getElementById('modalContenido')
    let modal = bootstrap.Modal.getOrCreateInstance(myModal)
    modal.show()
    document.getElementById('tituloModal').innerHTML += 'Datos del Artista'
    document.getElementById('cabeceraTabla').innerHTML += 
    '<tr>' +
        '<th scope="col">Imagen</th>' +
        '<th scope="col">Artista</th>' +
        '<th scope="col">Escuchá</th>' +
    '</tr>'
    datos.forEach(element => {
        document.getElementById('contenidoTabla').innerHTML +=
        '<tr>' +
            '<td>' + '<img src="' + element.image['1']['#text'] + '" width="125"></img>' + '</td>' + 
            '<td class="align-middle">' + element.name + '</td>' +
            '<td class="aling-middle">' + '<a class="btn btn-primary" href="' + element.url + '" role="button" target="_blank">Link</a>' + '</td>' +
        '</tr>'       
    })
    document.getElementById('buscarPor').selectedIndex = 0
    document.getElementById('valor').value = ''
    document.getElementById('opcionBusqueda').selectedIndex = 0
}

function muestraLibros(datos) {
    let myModal = document.getElementById('modalContenido')
    let modal = bootstrap.Modal.getOrCreateInstance(myModal)
    modal.show()
    document.getElementById('tituloModal').innerHTML += 'Libros por Título'
    document.getElementById('cabeceraTabla').innerHTML += 
    '<tr>' +
        '<th scope="col">Imagen</th>' +
        '<th scope="col">Título</th>' +
        '<th scope="col">Autor</th>' +
        '<th scope="col">Acción</th>' +
    '</tr>'
    datos.forEach(element => {
        if (!element.isbn) {
            document.getElementById('contenidoTabla').innerHTML +=
            '<tr>' +
                '<td class="align-middle">' + '</td>' +
                '<td class="align-middle">' + element.title + '</td>' + 
                '<td class="align-middle">' + element.author_name['0'] + '</td>' +
                '<td class="align-middle">' + 
                '<button class="btn btn-primary" id="agregaCarrito"><i class="bi bi-cart4"></i></button>' + '</td>' +
            '</tr>'
        } else {   
            document.getElementById('contenidoTabla').innerHTML +=
            '<tr>' +
                '<td>' + '<img src="https://covers.openlibrary.org/b/isbn/' + element.isbn['0'] + '-M.jpg" width="125"></img>' + '</td>' +
                '<td class="align-middle">' + element.title + '</td>' + 
                '<td class="align-middle">' + element.author_name['0'] + '</td>' +
                '<td class="align-middle">' + 
                '<button class="btn btn-primary" id="agregaCarrito" onclick="agregaCarrito(\''+ '0' + '\',\''+ element.author_name['0'] + '\',\'' + element.title + '\',\'' + element.isbn['0'] + '\')"><i class="bi bi-cart4"></i></button>' + '</td>' +
            '</tr>'
        }
    })
    document.getElementById('buscarPor').selectedIndex = 0
    document.getElementById('valor').value = ''
    document.getElementById('opcionBusqueda').selectedIndex = 0
}

function muestraAutor(datos) {
    let myModal = document.getElementById('modalContenido')
    let modal = bootstrap.Modal.getOrCreateInstance(myModal)
    modal.show()
    document.getElementById('tituloModal').innerHTML += 'Libro recomendado del Autor'
    document.getElementById('cabeceraTabla').innerHTML += 
    '<tr>' +
        '<th scope="col">Autor</th>' +
        '<th scope="col">Libro</th>' +
    '</tr>'
    datos.forEach(element => {
        document.getElementById('contenidoTabla').innerHTML +=
            '<tr>' +
                '<td class="align-middle">' + element.author_name['0'] + '</td>' + 
                '<td class="align-middle">' + element.title + '</td>' +
            '</tr>'
    })
    document.getElementById('buscarPor').selectedIndex = 0
    document.getElementById('valor').value = ''
    document.getElementById('opcionBusqueda').selectedIndex = 0
}

function cleanModal() {
    document.getElementById('tituloModal').innerHTML = ''
    document.getElementById('cabeceraTabla').innerHTML = ''
    document.getElementById('contenidoTabla').innerHTML = ''
}

function agregaCarrito(imagen,nombre,descripcion,id) {
    document.getElementById('cards').hidden = false
    document.getElementById('btnConfirmar').hidden = false
    if (imagen === '0') {
        valor = id
        document.getElementById('elemento').innerHTML +=
            '<div class="card mb-3" style="max-width: 500px;" id="'+ id +'">' +
                '<div class="row">' +
                    '<div class="col-md-4">' +
                        '<img src="https://covers.openlibrary.org/b/isbn/' + valor + '-M.jpg" class="img-fluid rounded-start">' +
                    '</div>' +
                    '<div class="col-md-8">' +
                        '<div class="card-body">' +
                            '<h4 class="card-title">' + descripcion + '</h4>' +
                            '<p class="card-text">' + nombre + '</p>' +
                            '<button class="btn btn-danger" id="eliminaCard" onclick="eliminaCard(\'' + id + '\')"><i class="bi bi-trash"></i></button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
    } else {
        document.getElementById('elemento').innerHTML += 
        '<div class="card mb-3" style="max-width: 500px;" id="'+ id +'">' +
                '<div class="row">' +
                    '<div class="col-md-4">' +
                        '<img src="' + imagen + '" class="img-fluid rounded-start">' +
                    '</div>' +
                    '<div class="col-md-8">' +
                        '<div class="card-body">' +
                            '<h4 class="card-title">' + nombre + '</h4>' +
                            '<p class="card-text">' + descripcion + '</p>' +
                            '<button class="btn btn-danger" id="eliminaCard" onclick="eliminaCard(\'' + id + '\')"><i class="bi bi-trash"></i></button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
        '</div>'
    }    
    let carrito = {
        id : id,
        nombre : nombre,
        descripcion : descripcion
    }
    data.push(carrito)
}

function eliminaCard(id) {
    let element = document.getElementById(id)
    let indice = data.findIndex(carrito => carrito.id === id)
    data.splice(indice,1)
    element.parentNode.removeChild(element)
    if (data.length === 0) document.getElementById('btnConfirmar').hidden = true
}

function realizarPedido(usuario) {
    if (document.getElementById('usuario').value === '') {
        document.getElementById('usuario').focus()
    } else {
        axios
            .get('http://localhost:3000/pedidos')
            .then(function (response) {
                ultimoID = 0
                response.data.forEach((element) => {if (element.id > ultimoID) ultimoID = element.id})
                axios.post('http://localhost:3000/pedidos', {
                    id: ultimoID + 1, usuario: usuario})
                axios.post('http://localhost:3000/contenidoCarrito', {
                    id: ultimoID + 1, contenido: data})
            })
    }
}
