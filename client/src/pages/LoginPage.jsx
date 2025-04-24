import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { useNavigate } from 'react-router';
import FormInput from '../components/FormInput';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (isRegistering) return;
    setIsRegistering(true);

    try {
      const response = await fetch('http://localhost:5168/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (response.ok) {
        login(result.token, result.userId);
        navigate('/');
      } else {
        setSignupError(result.message);
      }
    } catch (error) {
      console.error('Login error', error);
      setSignupError('Something went wrong. Try again.');
    }

    setIsRegistering(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-lg w-full p-6 bg-[#ffe6e6] rounded-xl shadow-md my-32">
        <h1 className="text-xl md:text-2xl font-bold text-black mb-1 text-center">Log In</h1>
        <div className="text-md md:text-lg font-medium text-black mb-1 text-center">Watch Movies with MBS</div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <FormInput
            id="Email"
            type="email"
            label="Email Address"
            disabled={isRegistering}
            error={errors.Email?.message}
            {...register('Email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          <FormInput
            id="Password"
            type="password"
            label="Password"
            disabled={isRegistering}
            error={errors.Password?.message}
            {...register('Password', {
              required: 'Password is required'
            })}
          />

          <Button
            type="submit"
            loading={isRegistering}
            width="full"
            variant="primary"
          >
            Log In
          </Button>
          {signupError && <p className="mt-1 text-sm text-red-600">{signupError}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;