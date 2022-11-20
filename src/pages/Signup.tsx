/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';

function SignUp() {
  const [values, setValues] = useState<{
    email: string;
    username: string;
    password: string;
  }>({
    email: '',
    username: '',
    password: '',
  });

  const { signUp, error, setError, message } = useAuth();
  const [loading, setLoading] = useState(false);

  const inputs = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Email is required',
      label: 'Email',
      required: true,
    },
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
      setLoading(true);
      if (signUp)
        await signUp({
          email: data.get('email') as string,
          password: data.get('password') as string,
          username: data.get('username') as string,
        });
    } catch (signupError) {
      if (setError) setError('something went wrong');
    }
    setLoading(false);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name as keyof typeof values]}
          onChange={onChange}
        />
      ))}
      <button disabled={loading} type="submit">
        Sign Up
      </button>

      <div style={{ marginTop: '1rem' }}>
        <p style={{ color: 'red', maxWidth: '280px' }}>{error}</p>
        <p style={{ color: 'green', cursor: 'pointer' }}>{message}</p>
      </div>
    </form>
  );
}

export default SignUp;
