import { createContext, Dispatch, SetStateAction } from 'react';

export interface ISignupForm {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  tagList: string[];
}

export interface SignupFormContextType {
  form: ISignupForm;
  setForm: Dispatch<SetStateAction<ISignupForm>>;
}

export const SignupFormContext = createContext<SignupFormContextType | null>(
  null
);
