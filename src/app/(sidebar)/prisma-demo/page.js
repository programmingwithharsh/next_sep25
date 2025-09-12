'use client'
import { useState } from 'react'

export default function PrismaDemo() {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    // Simulate Prisma operations
    const createUser = async () => {
        // Simulate: const user = await prisma.user.create({ data: { name, email } })
        const newUser = { id: Date.now(), name, email, createdAt: new Date() }
        setUsers([...users, newUser])
        setName('')
        setEmail('')
    }

    const getUsers = async () => {
        // Simulate: const users = await prisma.user.findMany()
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date() },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date() }
        ]
        setUsers(mockUsers)
    }

    const deleteUser = async (id) => {
        // Simulate: await prisma.user.delete({ where: { id } })
        setUsers(users.filter(user => user.id !== id))
    }

    return (
        <div className="container mt-4">
            <h1>Prisma ORM Demo</h1>
            <p>Simple example of Prisma database operations</p>

            {/* Create User Form */}
            <div className="card mb-4">
                <div className="card-body">
                    <h3>Create User</h3>
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <button onClick={createUser} className="btn btn-primary">
                        Create User
                    </button>
                </div>
            </div>

            {/* Get Users */}
            <div className="mb-3">
                <button onClick={getUsers} className="btn btn-success">
                    Get Users
                </button>
            </div>

            {/* Users List */}
            <div className="card">
                <div className="card-body">
                    <h3>Users ({users.length})</h3>
                    {users.map(user => (
                        <div key={user.id} className="d-flex justify-content-between align-items-center mb-2 p-2 border">
                            <div>
                                <strong>{user.name}</strong> - {user.email}
                            </div>
                            <button 
                                onClick={() => deleteUser(user.id)}
                                className="btn btn-danger btn-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Prisma Code Examples */}
            <div className="mt-4">
                <h4>Prisma Code Examples:</h4>
                <pre className="bg-light p-3">
{`// Create user
const user = await prisma.user.create({
  data: { name, email }
})

// Get all users
const users = await prisma.user.findMany()

// Delete user
await prisma.user.delete({
  where: { id }
})`}
                </pre>
            </div>
        </div>
    )
}
