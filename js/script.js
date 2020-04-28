const btn = document.getElementById('btn--generate');
const selectList = document.getElementById('nav__select');
const apiUrl = 'https://api.chucknorris.io/jokes/';
let msgCount = 1;


fetchCategories();
btn.addEventListener('click', fetchJoke);
async function fetchCategories() {
  const response = await fetch(apiUrl + '/categories');
  const obj = await response.json().then(categories => {

    categories.forEach(category => {
      const option = document.createElement('option');
      const selectText = document.createTextNode(category);

      option.value = category;
      option.appendChild(selectText);

      selectList.appendChild(option);

      optionValue = option.value;
    })

  });
}

async function fetchJoke() {
  const currentCategory = selectList.selectedOptions[0].value;

  const response = await fetch((currentCategory === 'all') ? `${apiUrl}/random` : `${apiUrl}/random?category=${currentCategory}`);

  const obj = await response.json().then(joke => {
    const div = document.createElement('div');
    div.className = 'board__message';
    const divText = document.createTextNode(joke.value);
    div.appendChild(divText);

    const i = document.createElement('i');
    i.className = 'fab fa-twitter-square';
    div.appendChild(i);

    if (msgCount % 2 === 0) {
      div.className = 'board__message board__message--blue';
    } else {
      div.className = 'board__message board__message--green';
    }


    document.querySelector('.board').appendChild(div);

    i.addEventListener('click', function () {
      var url = "http://google.com";
      var text = joke.value;
      window.open('http://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    });

    msgCount++;
  });
}