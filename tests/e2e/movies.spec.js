const { test, expect } = require('../support/index') //extensão do playwrigth

const data = require('../support/fixtures/movies.json')


test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create


    //Logo na aplicação como admin, reutilizando o codigo 
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')


    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)

    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)

})

test('deve poder remover um filme', async ({ page, request }) => {

    const movie = data.to_remove

    await request.api.postMovie(movie) //cadastro para exclusao

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.remove(movie.title) //remove o filme

    await page.popup.haveText('Filme removido com sucesso.') //confirmação
})


test('não deve cadastrar quando um título já existe', async ({ page, request }) => {

    const movie = data.duplicate


    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.featured)
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'

    ])




})

test('deve realizar busca pelo zumbi', async ({ page, request }) => {
    const movies = data.search

    movies.data.forEach(async (m) => {
        await request.api.postMovie(m)
    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.search(movies.input)
    await page.movies.tableHave(movies.outputs)


})