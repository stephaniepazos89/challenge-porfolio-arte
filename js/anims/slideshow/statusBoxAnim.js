function getStatusBox() {
	const tabla = getElementById("status-box");
	const fila = tabla.getElementsByTagName("tr")[0];
	return fila.getElementsByTagName("td");
}

const getCeldaActiva = () => document.getElementById("status-cell-active");

function getCeldaByIndex(index) {
	const statusBox = getStatusBox();
	return statusBox[index].firstElementChild;
}

async function animCelda(celda, options) {
	const duration = 50; //ms

	celda.animate(options.animation, {
		fill: options.fill,
		easing: "linear",
		duration,
	});

	await sleep(duration);
}

async function animPopOutCelda(celda) {
	const animOptions = {
		animation: [{ transform: "scale(1)" }, { transform: "scale(0)" }],
		fill: "backwards",
	};

	await animCelda(celda, animOptions);

	// Remove active status from the cell
	getElementById("status-cell-active").removeAttribute("id");
	celda.style.transform = "scale(1)";
}

async function animPopUpCelda(celda) {
	// Set active status to the cell
	celda.id = "status-cell-active";

	const animOptions = {
		animation: [{ transform: "scale(0)" }, { transform: "scale(1)" }],
		fill: "forwards",
	};

	await animCelda(celda, animOptions);
}

async function animChangeActiveStatusBox(indexSiguienteCelda) {
	await animPopOutCelda(getCeldaActiva());
	await animPopUpCelda(getCeldaByIndex(indexSiguienteCelda));
}
