import { useState } from 'react'
import '../styles/ExpenseForm.css'

function ExpenseForm({ onAddExpense, onAddIncome }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [showIncomeForm, setShowIncomeForm] = useState(false)

  const handleAddExpense = (e) => {
    e.preventDefault()
    console.log('Add Expense clicked - description:', description, 'amount:', amount)
    const amountNum = parseFloat(amount)
    console.log('Parsed amount:', amountNum)
    
    if (!description.trim()) {
      console.warn('Description is empty')
      return
    }
    if (amountNum <= 0) {
      console.warn('Amount must be greater than 0, got:', amountNum)
      return
    }
    
    console.log('Adding expense:', { description, amountNum })
    onAddExpense({
      description,
      amount: amountNum,
      date: new Date().toLocaleDateString()
    })
    setDescription('')
    setAmount('')
  }

  const handleAddIncome = (e) => {
    e.preventDefault()
    if (amount > 0) {
      onAddIncome(parseFloat(amount))
      setAmount('')
      setShowIncomeForm(false)
    }
  }

  if (showIncomeForm) {
    return (
      <div className="expense-form income-form">
        <h3>Add Income</h3>
        <form onSubmit={handleAddIncome}>
          <div className="form-group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter your income amount..."
              className="input-field"
              step="0.01"
              min="0"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="add-btn income-btn">
              Add Income
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setShowIncomeForm(false)
                setAmount('')
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="expense-form">
      <h3>Expense Tracker</h3>
      <form onSubmit={handleAddExpense}>
        <div className="form-group">
          <label>Expense Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => {
              console.log('Description input changed to:', e.target.value)
              setDescription(e.target.value)
            }}
            placeholder="Enter your Expense Description..."
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              console.log('Amount input changed to:', e.target.value)
              setAmount(e.target.value)
            }}
            placeholder="Enter your Amount, Expense[s] or Income [...]"
            className="input-field"
            step="0.01"
            min="0"
          />
        </div>

        <button type="submit" className="add-btn">
          + Add Expense
        </button>
      </form>

      <button 
        className="income-toggle-btn"
        onClick={() => {
          console.log('💵 Add Income button clicked')
          setShowIncomeForm(true)
        }}
      >
        💵 Add Income
      </button>
    </div>
  )
}

export default ExpenseForm