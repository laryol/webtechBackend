/* fetch('GET http://localhost/')

const form = document.querySelector('form')

const login = async(email,password) => {
    const loginUrl = `${BASE_URL}/login`

    const result = await fetch(loginUrl, {
        method: 'Post',
        mode:'cors',
        body: JSON.stringify({email,password})
        })
}
form.addEventListener('submit', (event)=> {
    event.preventDefault();

    login(email.value, password.value)
        .then(wasSuccessfulLogin => {
            if(wasSuccessfulLogin) {
                console.log('it worked');
            }
        })
})

*/
