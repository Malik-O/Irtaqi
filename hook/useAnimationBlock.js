export default function (animationList = []) {
	function addAnimationBlock(animationName, duration = 300, delay = 0) {
		const prevDuration =
			(animationList.at(-1)?.duration || 0) +
			(animationList.at(-1)?.delay || 0);
		const newAnimation = {
			// name: animationName,
			duration,
			delay: prevDuration + delay,
		};
		animationList.push(newAnimation);
		return animationName.duration(duration).delay(newAnimation.delay);
	}
	return { addAnimationBlock, animationList };
}
