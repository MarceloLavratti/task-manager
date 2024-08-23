class UserRepository {
    findAll() {
        const sql = 'SELECT * from users'
        return sql
    }

    create(user) {
        const sql = "INSERT INTO users SET?;"
        return sql
    }
}

export default UserRepository