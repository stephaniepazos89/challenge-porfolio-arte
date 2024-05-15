async function animPanHaciaSlide(siguienteSlide) {
	let nuevaPosicion = "0%";
	switch (siguienteSlide) {
		case 0:
			nuevaPosicion = "0%";
			break;
		case 1:
			nuevaPosicion = "29%";
			break;
		case 2:
			nuevaPosicion = "58%";
			break;
		case 3:
			nuevaPosicion = "87%";
			break;
		case 4:
			nuevaPosicion = "118%";
			break;
	}

	const background = getElementById("slideshow");
	const posicionActual = background.style.backgroundPosition;
	const duration = 1500; //ms

	background.animate(
		[
			{ backgroundPosition: posicionActual },
			{ backgroundPosition: nuevaPosicion },
		],
		{
			fill: "forwards",
			easing: "linear",
			duration,
		}
	);

	return sleep(duration);
}
