import Link from 'next/link';
import './index.css';

const menu = [
  {
    id: 'home',
    label: 'Home',
    path: '/'
  },
  // {
  //   id: 'watchlist',
  //   label: 'My Watchlist',
  //   path: '/watchlist'
  // },
  {
    id: 'portofolio',
    label: 'My Portofolio',
    path: '/portofolio'
  }
]

const Navbar = () => {
  return (
    <section className="top-nav">
      <input id="menu-toggle" type="checkbox" />
      <label className='menu-button-container' htmlFor="menu-toggle">
      <div className='menu-button'></div>
    </label>
      <ul className="menu">
        {
          menu.map((row) => (
            <li key={row.id}>
              <Link
                href={{
                  pathname: `${row.path}`,
                }}
              >
                {row.label}
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default Navbar