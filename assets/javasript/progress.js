/*This will make the Progess Ring  */
const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
/*stroke-dasharray -- This property is like border-style:dashed but
it let you define the width of the dashes and the gap btw them */
circle.style.strokeDasharray = circumference;
/*stroke-dashoffset -- Deacreasin strok-dasharray would
start ti reveal the shape.
Therefore, as the percen grows it will reduce the offset like we
see in the function setProgress()*/
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}
