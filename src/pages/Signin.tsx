/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import FormInput from '../components/FormInput';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import useModal from '../hooks/useModal';
import { AuthContenxtValueType } from '../types/AuthTypes';

function Signin() {
  const [values, setValues] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { isOpen, toggle } = useModal();
  const { logIn, currentUser, logOut } = useAuth();

  const inputs = [
    {
      id: 'username',
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage: 'Username is required',
      label: 'Username',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password is required',
      label: 'Password',
      required: true,
    },
  ];

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      setError('');
      setLoading(true);
      if (logIn)
        await logIn(
          data.get('username') as string /* ? */,
          data.get('password') as string
        );
    } catch (signinError) {
      setError('Failed to Sign in');
    }
    setLoading(false);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name as keyof typeof values]}
            onChange={onChange}
          />
        ))}
        <div>
          <label htmlFor="r">
            <input type="checkbox" id="r" name="r" value="yes" /> Remember me
          </label>
        </div>
        <button disabled={loading} type="submit">
          Login
        </button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <span
          role="presentation"
          style={{ cursor: 'pointer' }}
          onClick={toggle}
        >
          👈 Forgot your password?
        </span>
      </div>

      <Modal isOpen={isOpen} toggle={toggle}>
        <h2>Password Recovery</h2>
        <form>
          <input
            name="recovery_email"
            type="email"
            placeholder="Enter email here"
            required
            style={{
              width: '100%',
              marginTop: '1rem',
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>

      <div style={{ marginTop: '1rem' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <p style={{ color: 'green', cursor: 'pointer' }} onClick={logOut}>
          {currentUser ? 'You are now logged in, click to logout' : null}
        </p>
      </div>
    </>
  );
}

export default Signin;
