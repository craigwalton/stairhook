
// anti-spam measure
function replaceWithEmail() {
	var element = document.getElementById('email-blank');
	if (element == null)
		return;
	var a = "craig.w";
	var b = "@";
	var c = "me.com";
	var address = a+b+c;
	var subject = "Stair Hook";
	element.innerHTML = address;
	element.href = "mailto:"+address+"?subject="+subject;
}