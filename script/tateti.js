const jugador1 = 'x';
const jugador2 = 'o';
const jugador1UpperCase = jugador1.toUpperCase()
const jugador2UpperCase = jugador2.toUpperCase()

const items = document.querySelectorAll('[data-item]')
const itemsArray = [...items]
const botonReiniciar = document.getElementById('boton-reiniciar')

const jugadorH2 = document.getElementById('jugador-turno')
const ganadorH2 = document.getElementById('mensaje-ganador')

const mensajeJugador = ['Turno del Jugador ' + jugador1UpperCase, 'Turno del jugador ' + jugador2UpperCase]
const ganadorJugador = ['El ganador es el jugador ' + jugador1UpperCase, 'El ganador es el jugador ' + jugador2UpperCase, 'Empate']

const sonidoClick = document.getElementById('sonido-click')
const sonidoHoverMouse = document.getElementById('sonido-hover')
const sonidoClickBoton = document.getElementById('sonido-click-boton')
const sonidoVictoria = document.getElementById('sonido-victoria')

let turnoCirculo

for (let i = 0; i < items.length; i++) {
  const element = items[i];
  element.classList.add("text-5xl")
}

const movimientosLimite = items.length
const n = Math.sqrt(movimientosLimite)
const itemsMatrix = nodeListToMatrix(n, items)
let movimientosHechos = 0

function nodeListToMatrix(n, items) {
  let nodeMatrix = new Array(n)
  for (let i = 0; i < n; i++) {
    nodeMatrix[i] = []
    for (let j = 0; j < n; j++) {
      nodeMatrix[i][j] = items[n * i + j]
    }
  }
  return nodeMatrix
}

comenzar()

// Eventos Boton
botonReiniciar.addEventListener('click', comenzar)
botonReiniciar.addEventListener('click', () => {
  sonidoClickBoton.play()
})
botonReiniciar.addEventListener('mouseover', () => {
  sonidoHoverMouse.play()
})

// Funciones
function comenzar() {
  turnoCirculo = false
  ganadorH2.textContent = ''
  movimientosHechos = 1
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.textContent = ''
    item.style.cursor = 'pointer'
    item.removeEventListener('click', clickMouse)
    item.addEventListener('click', clickMouse, { once: true })
  }
  mostrarTurnoJugadorH2(turnoCirculo)
}

function clickMouse(evento) {
  const item = evento.target
  const posicion = itemsArray.indexOf(item)
  if (posicion === undefined) {
    console.log("posicion " + posicion)
    return
  }
  const fila = Math.floor(posicion / n)
  const columna = posicion % n

  item.style.cursor = 'not-allowed'
  let turnoJugador

  if (!turnoCirculo) {
    item.innerText = jugador1
    turnoJugador = jugador1
  } else {
    item.innerText = jugador2
    turnoJugador = jugador2
  }

  sonidoClick.play()

  if (esVictoria(turnoJugador, fila, columna)) {
    let i = turnoCirculo ? 1 : 0
    ganadorH2.innerText = ganadorJugador[i]
    sonidoVictoria.play()
    desabhilitarEventoClick()
    return
  }

  if (esEmpate()) {
    ganadorH2.innerText = ganadorJugador[2]
    return
  }

  movimientosHechos++
  turnoCirculo = !turnoCirculo
  mostrarTurnoJugadorH2(turnoCirculo)
}

function esVictoria(turnoJugador, fila, columna) {

  for (let i = 0; i < n; i++) {
    if (turnoJugador !== itemsMatrix[i][columna].innerText) {
      break;
    }
    if (i === (n - 1)) {
      return true
    }
  }

  for (let i = 0; i < n; i++) {
    if (turnoJugador !== itemsMatrix[fila][i].innerText) {
      break;
    }
    if (i === (n - 1)) {
      return true
    }
  }

  if (fila === columna) {
    for (let i = 0; i < n; i++) {
      if (turnoJugador !== itemsMatrix[i][i].innerText) {
        break;
      }
      if (i === (n - 1)) {
        return true
      }
    }
  }

  if (fila + columna === (n - 1)) {
    for (let i = 0; i < n; i++) {
      if (turnoJugador !== itemsMatrix[i][n - i - 1].innerText) {
        break;
      }
      if (i === (n - 1)) {
        return true
      }
    }
  }
  return false
}

function esEmpate() {
  if (movimientosLimite === movimientosHechos) {
    return true
  }
  return false
}

function mostrarTurnoJugadorH2(turnoCirculo) {
  if (!turnoCirculo) {
    jugadorH2.textContent = mensajeJugador[0]
  } else {
    jugadorH2.textContent = mensajeJugador[1]
  }
}

function desabhilitarEventoClick() {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.removeEventListener('click', clickMouse)
  }
}
