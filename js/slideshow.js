const MIN_PASO = 0;
const MAX_PASO = 4;

let slideActual = 0;
const flechaAnterior = getElementById("arrow-back");
const flechaSiguiente = getElementById("arrow-next");

const slides = getElementsByClassName("slide");

activarVisibilidad(flechaAnterior, false);
activarInteraccion(flechaAnterior.parentElement, false);

function setNavegacion(estaActivo) {
	const statusBox = getElementById("status-box");
	activarInteraccion(flechaAnterior, estaActivo);
	activarInteraccion(flechaSiguiente, estaActivo);
	activarInteraccion(statusBox, estaActivo);
}

async function setVisibilidadFlechas(flecha, mostrarFlecha) {
	if (mostrarFlecha) {
		if (!isVisible(flecha)) {
			activarVisibilidad(flecha, true);
			activarInteraccion(flecha.parentElement, true);
			await animFadeIn(flecha);
		}
	} else {
		if (isVisible(flecha)) {
			await animFadeOut(flecha);
			activarVisibilidad(flecha, false);
			activarInteraccion(flecha.parentElement, false);
		}
	}
}

async function fadeOutArrows(nuevoSlide) {
	nuevoSlide === MIN_PASO && setVisibilidadFlechas(flechaAnterior, false);
	nuevoSlide === MAX_PASO && setVisibilidadFlechas(flechaSiguiente, false);
}

async function fadeInArrows(nuevoSlide) {
	nuevoSlide !== MIN_PASO && setVisibilidadFlechas(flechaAnterior, true);
	nuevoSlide !== MAX_PASO && setVisibilidadFlechas(flechaSiguiente, true);
}

async function moveToSlide(siguienteSlide) {
	// Deshabilitar navegacion con las flechas
	setNavegacion(false);

	// Se dispara con una promesa la animacion de fade out
	await Promise.all([
		animFadeOut(slides[slideActual]),
		animChangeActiveStatusBox(siguienteSlide),
		fadeOutArrows(siguienteSlide),
	]);

	//Trigger the pan animation
	await animPanHaciaSlide(siguienteSlide);

	//Hide the current slide
	mostrarElemento(slides[slideActual], false);

	//Update the slideActual value
	slideActual = siguienteSlide;

	// Se hace visible el siguiente slide
	mostrarElemento(slides[slideActual], true);

	//Trigger the fade in animation for the next slide
	await Promise.all([
		animFadeIn(slides[siguienteSlide]),
		fadeInArrows(siguienteSlide),
	]);

	// Habilitar navegacion con las flechas
	setNavegacion(true);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function stepSlide(pasos) {
	if (slideActual + pasos >= MIN_PASO && slideActual + pasos <= MAX_PASO) {
		await moveToSlide(slideActual + pasos);
	}
}

/*
  This is to avoid having to repeat the functions
  moveToSlide(1), moveToSlide(2) and so on on the html
*/

async function irASlideSeleccionado(celdaSeleccionada) {
	const numeroDeCelda = [...celdaSeleccionada.parentElement.children].indexOf(
		celdaSeleccionada
	);
	if (numeroDeCelda !== slideActual) {
		await moveToSlide(numeroDeCelda);
	}
}
