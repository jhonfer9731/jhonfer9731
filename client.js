console.log("hello");

const form = document.querySelector('form');// toma toda la informacion del formulario
const loadingElement = document.querySelector('.loading');
const twittsElement = document.querySelector('.twitters');

const API_URL = 'http://localhost:5000/mews';



loadingElement.style.display = 'none';// hide the loading element



listAllTwitters();



form.addEventListener('submit', (event) => { // listener for the submit
    event.preventDefault();
    const formData = new FormData(form); // crea un objeto
    const name = formData.get('name');
    const content = formData.get('content');
    //console.log('form was submitted');
    const twitt = {
        name,
        content
    };
    console.log(twitt);

    form.style.display = 'none'; // esconde el formulario
    loadingElement.style.display = ''; // despliega la imagen de loading

    
    fetch(API_URL, { // send the data off to the json server
        method: 'POST', //especificaciones
        body: JSON.stringify(twitt),
        headers:{
            'content-type': 'application/json'
        }
    }).then(response  => response.json())
      .then(createdTwitt =>{
          console.log(createdTwitt);

    listAllTwitters();
    form.reset();
    setTimeout(() => {
        form.style.display  = '';
    }, 10000);
    loadingElement.style.display = 'none';
      });

    });


function listAllTwitters(){
    twittsElement.innerHTML = '';
    console.log("Entrando");
    fetch(API_URL)
        .then(response => response.json())
        .then(twitters =>{
            console.log(twitters);
        twitters.reverse();
        twitters.forEach(twitt => {

            const div = document.createElement('div');

            const header = document.createElement('h3');
            header.textContent = twitt.name;

            const contents = document.createElement('p');
            contents.textContent = twitt.content;

            const date = document.createElement('small');
            date.textContent = new Date(twitt.created);

            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);

            twittsElement.appendChild(div);
        });
        loadingElement.style.display = 'none';
        });
}