
//load more example
let currentPage = 1;
let totalPages;

function getUsers(page) {
    fetch('https://reqres.in/api/users?page=' + page, {
        method: 'GET'
    })
    .then(function(response) {
        if (response.status != 200) {
            throw response.status;
        }
        return response.json();
    })
    .then(function(responseData) {
        let fragment = document.createDocumentFragment();

        responseData.data.forEach(element => {
            let li = document.createElement('li');
            li.classList.add('li-item');

            let span = document.createElement('span');
            span.textContent = element.first_name;

            let img = document.createElement('img');
            img.src = element.avatar;
            img.classList.add('image-item');

            li.appendChild(img);
            li.appendChild(span);

            fragment.appendChild(li);
        });

        document.getElementById('list').innerHTML = '';
        document.getElementById('list').appendChild(fragment);

        totalPages = responseData.total_pages;
    })
    .catch(function(x) {
        if (x == 404) {
            let p = document.createElement('p');
            p.textContent = 'Server Error';
            document.getElementById('api').appendChild(p);
        } else {
            let p = document.createElement('p');
            p.textContent = 'Page Not Found';
            document.getElementById('api').appendChild(p);
        }
    })
}

document.getElementById('loadprev').addEventListener('click',function() {
    if (currentPage == 1) {
        return;
    }
    // currentPage++;
    // currentPage = currentPage + 1;
    currentPage -=1;
    getUsers(currentPage);
});


document.getElementById('loadnext').addEventListener('click', function() {
    if (currentPage == totalPages) {
        return;
    }
    currentPage +=1;
    getUsers(currentPage);
})

getUsers(currentPage);


// json.parse() - string -> Object
// json.stringify() - object -> string

// posts practice

let mainWrapper = document.getElementById('post-block-wraper');
let overlay = document.getElementById('overlay-post');
let closeOverlay = document.getElementById('closeOverlay');



function ajax() {
    let requist = new XMLHttpRequest();
    requist.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    requist.addEventListener('load', function() {
        // let data = requist.responseText;
        // let responseDataPosts = JSON.parse(data);

        let data = JSON.parse(requist.responseText);

        data.forEach(element => {
            createPost(element);
        })


        console.log(data);
    });
    requist.send();
}


//ფუნქცია რომლის საშუალებით შევქმნი პოსტს
function createPost(item) {
    let divWrapper = document.createElement('div');
    divWrapper.classList.add('posts');
    divWrapper.setAttribute('data-id', item.id);

    let h3Tag = document.createElement('h3');
    h3Tag.innerText = item.id;

    let h2Tag = document.createElement('h2');
    h2Tag.innerText = item.title;

    divWrapper.appendChild(h3Tag);
    divWrapper.appendChild(h2Tag);


    // კონკრეტული პოსტის დაჭერის დროს ამოვაგდოთ პოპაპი
    divWrapper.addEventListener('click', function(event) {
        let id = event.target.getAttribute('data-id');
        openOverlay(id);
    })

    mainWrapper.appendChild(divWrapper);

    console.log(divWrapper);
}


// ფუნქციის საშუალებით ამოვაგდებთ პოპაპს
function openOverlay(id) {
    overlay.classList.add('active');
    console.log(id);
}

// დავხურავთ პოპაპს
closeOverlay.addEventListener('click', function() {
    overlay.classList.remove('active');
});


ajax();