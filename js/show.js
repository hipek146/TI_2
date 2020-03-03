show = (json) => {
    const div = document.getElementById('notki');
    if(!json.data || !json.data.length){
        div.innerHTML = "<b>Nie masz jeszcze żadnych notatek</b>";
        return;
    }

    div.innerHTML = json.data.reverse().map(el => 
        "<div class='notka'>" + Object.keys(el).map(key => 
                "<div class='"+key+"'>" + el[key] + "</div>"
            ).join("") + "</div>"
    ).join("");
}