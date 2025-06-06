const { test, expect } = require('../support/index') //extensão do playwrigth

const { Series } = require('../support/actions/Tvshows')
const data = require('../support/fixtures/tvshows.json')



test('deve poder cadastrar uma nova série de TV', async ({ page }) => {

  const serie = data.create
  const series = new Series(page)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.goto('http://localhost:3000/admin/tvshows')

  await series.create(
    serie.title,
    serie.overview,
    serie.company,
    serie.release_year,
    serie.featured,
    serie.season,
    serie.cover
  )
  await page.popup.haveText(`A série '${serie.title}' foi adicionada ao catálogo.`)

})

test('deve poder remover uma série', async ({ page, request }) => {

  const serie = data.to_remove

  await request.api.postSerie(serie) //cadastro para exclusao

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.goto('http://localhost:3000/admin/tvshows')

  await page.series.remove(serie.title) //remove o filme

  await page.popup.haveText('Série removida com sucesso.') //confirmação
})

test('não deve cadastrar quando uma série já existe', async ({ page, request }) => {

  const serie = data.duplicate
  const series = new Series(page)

  await request.api.postSerie(serie)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.goto('http://localhost:3000/admin/tvshows')

  await series.create(
    serie.title,
    serie.overview,
    serie.company,
    serie.release_year,
    serie.featured,
    serie.season,
    serie.cover
  )
  await page.popup.haveText(`O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.goto('http://localhost:3000/admin/tvshows')

  await page.series.goForm()
  await page.series.submit()

  await page.series.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório (apenas números)'
  ])


})

test('deve realizar busca pelo zumbi', async ({ page, request }) => {
   const series = data.search

  for (const s of series.data) {
    await request.api.postSerie(s)
  }

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.goto('http://localhost:3000/admin/tvshows')

  await page.series.search(series.input)
  await page.series.tableHave(series.outputs)


})