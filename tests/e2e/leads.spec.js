
const { test, expect } = require('../support/index') //extensão do playwrigth

const { faker } = require('@faker-js/faker')


// test.beforeAll(async ()=>{   //executa antes de todos os testes - 1 vez
//   leadName = faker.person.fullName()
//   leadEmail = faker.internet.email()

// })


test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await page.toast.containText(message)

});

test('não deve cadastrar quando o email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', { //cadastrar antes na api 
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy() //espera um resultado de cadastro de sucesso 

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail) //para garantir o email ja existente

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

  await page.toast.containText(message)

});



test('não deve cadastrar com email incorreto', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Andreia Oliveira', 'andreia.disney.com.br')

  await page.landing.alertHaveText('Email incorreto')

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'andreia@disney.com.br')
  await page.landing.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Andreia Oliveira', '')

  await page.landing.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')

  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório']) //pego os dois alerts


});


