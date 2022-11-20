import { User, UserCredential } from 'firebase/auth';

export interface SignUpUser {
  email: string;
  username: string;
  password: string;
}

export interface AuthContenxtValueType {
  currentUser: User | null /* null is a needed value here */;
  message?: string;
  error?: string;

  signUp?: (user: {
    email: string;
    password: string;
    username: string;
  }) => void;
  logIn?: (email: string, password: string) => Promise<UserCredential>;
  logOut?: () => Promise<void>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}
