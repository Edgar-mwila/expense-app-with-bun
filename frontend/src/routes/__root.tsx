import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: Root,
})

function NavBar() {
  return (
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create-Expense
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          All Expenses
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
  )
}

function Root() {
  return (
     <>
      <NavBar />
      <hr />
      <Outlet />
    </>
  )
}