let timeout;
export default function (cb, delay = 1000) {
	clearTimeout(timeout);
	timeout = setTimeout(cb, delay);
}
