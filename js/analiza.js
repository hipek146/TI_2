
drawHistogram = (json) => {
    var types = {};

    json.data.forEach(element => types[element.typ] = types[element.typ] ? types[element.typ] + 1 : 1);


    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");    

    const {width, height} = canvas;

    const array = Object.values(types);
    const max = Math.max(...array);

    if(!array.length) return;

    const side = width / (array.length * 2 - 1);

    const colors = ["#970005", "#4f28d6", "#1acab9", "#259738", "#e88419"];

    for(let i = 0; i < array.length; i++) {
        let x = side * i * 2;
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.rect(x, height - array[i] / max * height , side , height );
        ctx.fill();
        ctx.stroke();
    }

    var count = document.getElementById("ilosc");
    count.innerHTML = array.map(el => "<div style='width:"+side+"px;'>"+ el +"</div>").join("");

    var label = document.getElementById("etykieta");
    label.innerHTML = Object.keys(types).map((el, i) => "<div><div class='kolor' style='background:"+ colors[i] +";'></div>"+ el +"</div>").join("");
}

onError = (error) => {
    console.log(error);
}

window.onload = () => {
    fetchAPI(
        "http://pascal.fis.agh.edu.pl:11277/notki",
        {login: session_login, haslo: session_haslo, method: "GET"}, 
        {successful: drawHistogram, failure: onError, error: onError}
    );
}