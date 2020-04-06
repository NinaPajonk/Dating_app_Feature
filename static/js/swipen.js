// get ellements van html
const main = document.getElementsByTagName('main')[0];
const people = main.getElementsByTagName('li');
const likeButtons = document.querySelectorAll('.likebut');
const dislikeButtons = document.querySelectorAll('.dislikebut');

let i = 0;

// functie liken en disliken
function ratePerson() {
        if (i < (people.length)) { // show next person
            this.closest('li').style.display = 'none';
            i++;

            let node = event.target;

            if (node.classList.contains('dislikebut')) {
                let id = node.dataset.id;

                var res = new XMLHttpRequest();
                res.open('DELETE', '/' + id);
                res.onload = onload;
                res.send();

                function onload() {
                    if (res.status !== 200) {
                        throw new Error('Probeer het opnieuw!');
                    }

                window.location = '/';
            }
        }
    } 
}

// eventlisteners klikken
for (let i = 0; i < likeButtons.length; i++){
    likeButtons[i].addEventListener('click', ratePerson);
    dislikeButtons[i].addEventListener('click', ratePerson);
}