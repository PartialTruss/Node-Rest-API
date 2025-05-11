export interface TransactionsBody {
    description: string
    total: number
    date: Date
    user: string
    business: string
    items: { title: string, price: number, quantity: number }[]
}