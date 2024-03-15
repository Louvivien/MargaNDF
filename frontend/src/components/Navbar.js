import { Link } from 'react-router-dom';
import { useState } from 'react'; // Import useState
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [showActions, setShowActions] = useState(false); // State to manage dropdown visibility

  const handleClick = () => {
    logout();
  };

  const toggleActionsMenu = () => {
    setShowActions(!showActions); // Toggle the visibility of the actions menu
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src="/logo-margaron.png" alt="Expense Buddy Logo" />
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
              <button onClick={toggleActionsMenu}>Actions</button> {/* Actions button */}
              {showActions && ( // Conditional rendering for the actions menu
                <div>
                  <Link to="/newpage">New Page</Link>
                </div>
              )}
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
