const textoCarga = getElementById("texto-carga");
const splashscreen = getElementById("splashscreen");
const slideshow = getElementById("slideshow");

async function setupSlideshow() {
	slideshow.style.backgroundImage = "url('assets/images/background.png')";
	activarVisibilidad(slideshow, true);

	const primerSlide = getElementsByClassName("slide")[0];
	mostrarElemento(primerSlide, true);
	primerSlide.style.opacity = "1";
	activarInteraccion(flechaSiguiente, true);

	await animFadeIn(slideshow);
}

textoCarga?.addEventListener("animationend", async () => {
	await sleep(1500); //ms

	await animFadeOut(splashscreen);
	splashscreen.remove();

	await setupSlideshow();
	await setupParallaxImagenes();
});
