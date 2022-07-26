const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', event => {

    const main = document.querySelector("main");

    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(data => renderTrainers(data));


    function renderTrainers(data){
        const trainers = data.data;
        trainers.forEach(trainer => {
            renderTrainer(trainer, data.included);
        })
    }
    
    function renderTrainer(trainer, included) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute("data-id", trainer.id);
        card.innerHTML = `
            <p>${trainer.attributes.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        `
        const ul = document.createElement('ul');
        renderPokemons(trainer, included, ul);
        card.appendChild(ul);
        main.appendChild(card);
    }

    function renderPokemons(trainer, included, ul) {
        const pokemons = included.filter(pokemon => {
            return pokemon.relationships.trainer.data.id === trainer.id;
        });
        pokemons.forEach(pokemon => {
            const li = document.createElement('li');
            li.innerHTML = `
            ${pokemon.attributes.nickname} (${pokemon.attributes.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release
            `
            ul.appendChild(li);
        })
    }

    document.querySelector('main').addEventListener('click', event => {
        if (event.target.matches('button.release')){
            let pokemonLi = event.target.parentElement;
            let pokemonId = event.target.dataset.pokemonId;

            const configObj = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };
    
            fetch(`${POKEMONS_URL}/${pokemonId}`, configObj)
                .then(response => response.json())
                .then(data => {
                    pokemonLi.remove();
                });
        } else if(event.target.matches('button')){
            const ul = event.target.parentElement.querySelector('ul');
            if (Array.from(ul.querySelectorAll('li')).length >= 6){
                window.alert('Too many pokes bruv. Think again!');
            } else {
                const trainerId = event.target.dataset.trainerId;

                fetch (`${TRAINERS_URL}/${trainerId}/newpoke`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        ul.innerHTML = '';
                        renderPokemons(data.data, data.included, ul);
                    });

            }
        }
    })


});

