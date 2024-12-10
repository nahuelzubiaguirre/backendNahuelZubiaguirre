import crypto from 'crypto'

import DBLocal from 'db-local'
import bcrypt from 'bcrypt'


const { Schema } = new DBLocal({path: './db'})

const User = schema ('User' , {
    _is: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
})

export class UserRepository {
    static async create ({username, password}) {
        if (typeof username != 'string') throw new Error ('username must be a string')
        if (username.lenght < 3) throw new Error('username must be at leaast 3 characters long')
            
        if (typeof password != 'string') throw new Error ('password must be a string')
        if (password.lenght <6) throw new Error ('password must be at least 6 characters long')  
            
        const user = User.findOne({ username})
        if (user) throw new Error ('username already exist')

        const id = crypto.randomUUID()
        const hashedPassword = await bcrypt.hash(password, 10)

        User.creaq({
            _id: id,
            username,
            password: hashedPassword
        }).save()

        return id
    }

    static async login ({username, password}) {
        Validation.username(username)
        Validation.password(password)

        const user = User.findOne({username})
        if (!user) throw new Error('username does not exist')

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new Error('password is invalid')

            const { password: _, ...publicUser } = user

        return user
        
    }
}

class Validation {
    static username (username) {
        if (typeof username != 'string') throw new Error ('username must be a string')
        if (username.lenght < 3) throw new Error('username must be at leaast 3 characters long')
    }

    static password(password) {
        if (typeof password != 'string') throw new Error ('password must be a string')
        if (password.lenght <6) throw new Error ('password must be at least 6 characters long')  
    }
}