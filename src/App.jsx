import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://recosake.prionex.net/api/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://recosake.prionex.net/api/add', { name, age })
      setName('')
      setAge('')
      fetchUsers() // 送信後に最新リスト取得
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Users List</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <input
            type="text"
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <input
            type="number"
            placeholder="年齢"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button type="submit">追加</button>
        </div>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}（{user.age}歳）
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
