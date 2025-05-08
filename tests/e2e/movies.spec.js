const { test, expect } = require('../support/index') //extensão do playwrigth

const data = require('../support/fixtures/movies.json')


test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create


    //Logo na aplicação como admin, reutilizando o codigo 
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')


    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)

    await page.toast.containText('Cadastro realizado com sucesso!')

})

test('não deve cadastrar quando um título já existe', async ({ page }) => {

    const movie = data.duplicate

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.toast.containText('Cadastro realizado com sucesso!')
    
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.toast.containText('Oops!Este conteúdo já encontra-se cadastrado no catálogo')

})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'

    ])




})