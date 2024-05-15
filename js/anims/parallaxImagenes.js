// Cuanto se desea que se note el parallax
const AMPLITUD_EFECTO = 20;

const rotacion = (event, elementos) => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const mouseX = event.clientX;
	const mouseY = event.clientY;

	const mitadVentanaWidth = width / 2;
	const mitadVentanaHeight = height / 2;

	const posHorizontal = mouseX - mitadVentanaWidth;
	const posVertical = mitadVentanaHeight - mouseY;

	const rotacionHorizontal = (posHorizontal / mitadVentanaWidth) * AMPLITUD_EFECTO;
	const rotacionVertical = (posVertical / mitadVentanaHeight) * AMPLITUD_EFECTO;

	[...elementos].forEach((elemento) => {
		elemento.style.transform =
			"perspective(550px) rotateY(" +
			rotacionHorizontal +
			"deg) rotateX(" +
			rotacionVertical +
			"deg)";
	});
};

const setupParallaxImagenes = async () => {
	const imagenes = getElementsByClassName("js-foto");
	const primera = imagenes[0];

	primera.style.perspective = "10px";

	document.addEventListener(
		"mousemove",
		(event) => {
			rotacion(event, imagenes);
		},
		false
	);
};
