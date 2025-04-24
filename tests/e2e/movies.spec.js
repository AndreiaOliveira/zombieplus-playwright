const { test, expect } = require('../support/index') //extensão do playwrigth

const data = require('../support/fixtures/movies.json')


test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create


    //Logo na aplicação como admin, reutilizando o codigo 
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')


})