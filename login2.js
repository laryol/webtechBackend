fetch('GET http://localhost/')

const form = document.querySelector('form')

const email = document.querySelector('[name=email]')
const password = document.querySelector('[name=password]')

const loginError = document.querySelector('.error')

const BASE_URL = "https://webtechbackend.herokuapp.com/"

const login = async (email, password) => {
    const loginUrl = `${BASE_URL}`
// if email==huehne return true
    const result = await fetch(loginUrl, {
        method: 'Post',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    return result.status===200;
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(email.value)

    login(email.value, password.value)
        .then(wasSuccessfulLogin => {
            if (wasSuccessfulLogin) {
                console.log('it worked');
                loginError.classList.add('hidden')
            }
        })
})