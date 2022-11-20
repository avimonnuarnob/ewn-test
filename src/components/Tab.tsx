import './tab.css';

type TabProps = {
  children: React.ReactNode;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
};

function Tab({ children, active, setActive }: TabProps): JSX.Element {
  return (
    <>
      <div className="tabs">
        <button
          type="button"
          className={`tab ${active === 'login' ? 'active' : null}`}
          onClick={() => setActive('login')}
        >
          Login
        </button>
        <button
          type="button"
          className={`tab ${active === 'signup' ? 'active' : null}`}
          onClick={() => setActive('signup')}
        >
          Sign Up
        </button>
      </div>

      <div>{children}</div>
    </>
  );
}

export default Tab;
