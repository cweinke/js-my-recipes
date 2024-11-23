const router = require('express').Router()
const { response } = require('express')
const recipes = require('../../../data/recipes.json')



router.get('/', (request, response) => {
    const r = recipes.map(({ id, title, image, prepTime, difficulty }) =>
         {return {id, title, image, prepTime, difficulty}})
    response.send(r)
})

router.get('/recipe/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(r => r.id.toString() === id)
    if (found) response.send(found)
    else response.send({error: {message: 'Could not find recipes with this id'}})
})

router.post('/recipe/add', (request, response) => {
    const { title, image, ingredients, instructions, prepTime, difficulty } = request.body
    const { newId } = recipes.length + 1
    recipes.push({ newId, title, image, ingredients, instructions, prepTime, difficulty })
    response.send({ newId, title, image, ingredients, instructions, prepTime, difficulty })
})


module.exports = router