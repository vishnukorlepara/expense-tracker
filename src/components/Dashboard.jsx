import { useState, useEffect } from 'react'
import '../styles/Dashboard.css'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import BalanceCard from './BalanceCard'

function Dashboard({ userName, onLogout }) {
  const storageKey = `expenzo_${userName}`
  
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_expenses`)
    const parsed = saved ? JSON.parse(saved) : []
    console.log(`Loaded expenses for user "${userName}":`, parsed)
    return parsed
  })
  
  const [income, setIncome] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}_income`)
    const parsed = saved ? parseFloat(saved) : 0
    console.log(`Loaded income for user "${userName}":`, parsed)
    return parsed
  })

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`${storageKey}_expenses`, JSON.stringify(expenses))
    console.log(`Saved expenses for user "${userName}":`, expenses)
  }, [expenses, storageKey, userName])

  // Save income to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`${storageKey}_income`, income.toString())
    console.log(`Saved income for user "${userName}":`, income)
  }, [income, storageKey, userName])


  const handleAddExpense = (expense) => {
    console.log('Dashboard received expense:', expense)
    setExpenses([...expenses, { ...expense, id: Date.now() }])
  }

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const handleAddIncome = (amount) => {
    console.log('Dashboard received income:', amount)
    if (amount > 0) {
      setIncome(income + amount)
    }
  }

  const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
  const balance = income - totalExpense

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Welcome <span className="user-name">{userName}</span></h1>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <div className="left-section">
          <BalanceCard balance={balance} income={income} expense={totalExpense} />
          
          <ExpenseForm onAddExpense={handleAddExpense} onAddIncome={handleAddIncome} />
        </div>

        <div className="right-section">
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard