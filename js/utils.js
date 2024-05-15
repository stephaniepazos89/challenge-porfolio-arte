const getElementById = (id) => document.getElementById(id);
const getElementsByClassName = (className) =>
	document.getElementsByClassName(className);
const mostrarElemento = (elem, isVisible) =>
	(elem.style.display = isVisible ? "flex" : "none");
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const isVisible = (elem) => elem.style.visibility === "visible";
const activarVisibilidad = (elem, isVisible) =>
	(elem.style.visibility = isVisible ? "visible" : "hidden");

const activarInteraccion = (elem, enabled) =>
	(elem.style.pointerEvents = enabled ? "auto" : "none");
