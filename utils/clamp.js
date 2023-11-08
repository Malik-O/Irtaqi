export default function (number, min, max) {
	"worklet";
	return Math.max(min, Math.min(number, max));
}
