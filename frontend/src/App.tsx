import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import './App.css'

function App() {
  const [totalExpenses, settotalExpenses] = useState(0)

  useEffect(() => {
    async function fetchTotal() {
      const res = await fetch('/api/expenses/total');
      const data = await res.json();
      settotalExpenses(data.total)
    }
    fetchTotal();
  }, [])

  

  return (
    <Card className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <CardHeader className=''>
        <CardTitle>Total Expenses</CardTitle>
        <CardDescription>The total expenses.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">{totalExpenses}</CardContent>
    </Card>
  )
}

export default App
