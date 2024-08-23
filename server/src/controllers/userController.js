import User from '../models/userModel.js'

class UserController {

    async getAllUsers(req, res) {
        try {
            const user = await User.find()
            res.status(200).send(user)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id)
            res.status(200).send(user)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }

    async createUser(req, res) {
        try {
            const user = new User(req.body)
            await user.save()
            res.status(201).send(user)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            res.status(201).send(user)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }

    async updateUserPartial(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })        
            res.status(200).send(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            if (!user) {
                return res.status(404).send('Usuário não encontrado.');
            }
            res.status(201).send('Usuário removido com sucesso.')
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }
}

export default new UserController