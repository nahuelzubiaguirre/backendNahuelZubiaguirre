import express from 'express'
import { UserRepository } from './user-repository'

const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT ?? 3000

app.post('/login', async (req,res) => {
    const {username , password} = req.body
    try {
        const user = await UserRepository.login({username,password})
        res.send({user})
    } catch (error) {
        res.status(401).send(error.message)
    }
})

app.post('/register', async (req,res) => {
    const { username, password } = req.body

    try{
        const id = await UserRepository.create ({username, password})
        res.send ({ id })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.post('/logout', (req,res) => {})

app.get('/protected', (req,res) => {})


app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})

