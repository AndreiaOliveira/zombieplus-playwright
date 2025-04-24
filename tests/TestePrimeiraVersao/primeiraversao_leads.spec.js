// // @ts-check
// import { test, expect } from '@playwright/test';

// test('deve cadastrar um lead na fila de espera', async ({ page }) => {
//   await page.goto('http://localhost:3000');

//   //await page.click('//button[text()="Aperte o play... se tiver coragem"]') - pegando no Xpath

//   await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()  //Buscando por tag html com o texto representado

//   await expect(
//     page.getByTestId('modal').getByRole('heading')
//     ).toHaveText('Fila de espera') //checkpoint da modal
  
//   //await page.getByRole('button', { name: /Aperte o play/ }).click() //Usando substring

//   //await page.getByTestId('name').fill('andreia@disney.com')  //busca SOMENTE por data-testid e preenche
  
//   // await page.locator('#name').fill('Andreia Oliveira') //pego pelo locator (id) e preencho
//   // await page.locator('#email').fill ('andreia@disney.com') //pego pelo locator (id) e preencho

//   // await page.locator('input[name=name]').fill('Andreia Oliveira') //pego pelo locator (name) e preencho
//   // await page.locator('input[name=email]').fill ('andreia@disney.com') //pego pelo locator (name) e preencho

//   // await page.locator('input[placeholder="Seu nome completo"]').fill('Andreia Oliveira') //pego pelo locator (placeholder) e preencho
//   // await page.locator('input[placeholder="Seu email principal"]').fill ('andreia@disney.com') //pego pelo locator (placeholder) e preencho

//   await page.getByPlaceholder('Informe seu nome').fill('Andreia Oliveira') //Placeholder com a função e preenchendo
//   await page.getByPlaceholder('Informe seu email').fill ('andreia@disney.com') //Placeholder com a função e preenchendo
  

//    //await page.getByText('Quero entrar na fila!').click() //pego o botao pelo texto dele

//   await page.getByTestId('modal').getByText('Quero entrar na fila!').click() //garanto que nao vai falhar caso estivesse dois botoes com mesmo nome
  
//   // await page.getByText('seus dados conosco').click() //pegando o html para pegar elementos flutuantes que nao consigo pegar
//   // const content = await page.content()
//   // console.log(content)

//   await expect(page.locator('.toast')).toHaveText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!')
//   await expect(page.locator('toast')).toBeHidden({timeout: 5000})
  
//   await page.waitForTimeout(5000)

// });


// test('não deve cadastrar com email incorreto', async ({ page }) => {
//   await page.goto('http://localhost:3000');

//   await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()  //Buscando por tag html com o texto representado

//   await expect(
//     page.getByTestId('modal').getByRole('heading')
//     ).toHaveText('Fila de espera') //checkpoint da modal
  

//     await page.getByPlaceholder('Informe seu nome').fill('Andreia Oliveira') //Placeholder com a função e preenchendo
//     await page.getByPlaceholder('Informe seu email').fill ('andreia.com.br') //Placeholder com a função e preenchendo
  

//   await page.getByTestId('modal').getByText('Quero entrar na fila!').click() //garanto que nao vai falhar caso estivesse dois botoes com mesmo nome
  
//   await expect(page.locator('.alert')).toHaveText('Email incorreto') //pego o alert do class

// });

// test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
//   await page.goto('http://localhost:3000');

//   await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()  //Buscando por tag html com o texto representado

//   await expect(
//     page.getByTestId('modal').getByRole('heading')
//     ).toHaveText('Fila de espera') //checkpoint da modal
  

//   await page.getByPlaceholder('Informe seu email').fill ('andreia@disney.com.br') //Placeholder com a função e preenchendo
  
//   await page.getByTestId('modal').getByText('Quero entrar na fila!').click() //garanto que nao vai falhar caso estivesse dois botoes com mesmo nome
  
//   await expect(page.locator('.alert')).toHaveText('Campo obrigatório') //pego o alert do class

// });

// test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
//   await page.goto('http://localhost:3000');

//   await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()  //Buscando por tag html com o texto representado

//   await expect(
//     page.getByTestId('modal').getByRole('heading')
//     ).toHaveText('Fila de espera') //checkpoint da modal
  

//   await page.getByPlaceholder('Informe seu nome').fill('Andreia Oliveira') //Placeholder com a função e preenchendo

//   await page.getByTestId('modal').getByText('Quero entrar na fila!').click() //garanto que nao vai falhar caso estivesse dois botoes com mesmo nome
  
//   await expect(page.locator('.alert')).toHaveText('Campo obrigatório') //pego o alert do class

// });

// test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
//   await page.goto('http://localhost:3000');

//   await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()  //Buscando por tag html com o texto representado

//   await expect(
//     page.getByTestId('modal').getByRole('heading')
//     ).toHaveText('Fila de espera') //checkpoint da modal
  

//   await page.getByTestId('modal').getByText('Quero entrar na fila!').click() //garanto que nao vai falhar caso estivesse dois botoes com mesmo nome
  
//   await expect(page.locator('.alert')).toHaveText(['Campo obrigatório', 'Campo obrigatório']) //pego os dois alerts
  

// });


