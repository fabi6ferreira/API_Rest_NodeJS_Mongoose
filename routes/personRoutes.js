const router = require('express').Router()

const Person = require('../models/Person')

// Create Person
router.post('/', async (req, res) => {

    // req.body
    const { name, salary, address, approved } = req.body
    // create more validations afterwards
    if (!name) {
        res.status(422).json({ error: 'Name is mandatory' })
        return
    }

    const person = {
        name,
        salary,
        address,
        approved
    }

    // create
    try {
        //create data 
        await Person.create(person)

        res.status(201).json({ message: 'User created' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Read - Read data
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id

    try {
        const person = await Person.findById({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'Cannot find user!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, address, approved } = req.body

    const person = {
        name,
        salary,
        address,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Cannot find user!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: 'Cannot find user!' })
        return
    }

    try {
        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: 'User has been removed' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


module.exports = router