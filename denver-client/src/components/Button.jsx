import { Link } from 'react-router-dom'

const variantClasses = {
  primary: 'bg-lime-200 text-zinc-950 shadow-[3px_3px_0_#18181b] hover:bg-lime-300',
  secondary: 'bg-zinc-50 text-zinc-900 hover:bg-zinc-200',
}

function Button({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) {
  const classes = [
    'inline-flex items-center justify-center rounded-full border-2 border-zinc-900 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim()

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  )
}

export default Button
