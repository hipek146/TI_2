<script src="js/show.js"></script>
<script src="js/dodawanie.js"></script>

<div id="info">Wczytywanie...</div>

<div class='flexCenter'>
    <form class='formularz' onsubmit="dodawanie()">
        Treść: <textarea name="tresc" id="tresc"></textarea>    
        Data: <input type="date" name="data" id="data" />
        Godzina: <input type="time" name="godzina" id="godzina" />
        Typ: 
        <select name="typ" id="typ">
            <option>Święto</option>
            <option>Spotkanie</option>
            <option>Przyjęcie</option>
            <option>Zdrowie</option>
            <option>Inne</option>
        </select>
        <button class="button" type="submit" >Dodaj notkę</button>
    </form>
</div>

<div id = "zapisane" onload="update()"></div>