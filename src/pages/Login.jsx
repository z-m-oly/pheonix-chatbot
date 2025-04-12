/**
 * node modules
 */
import { Link, Form, useNavigation, useActionData } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

/**
 * assets
 */
import { assets } from '../assets/assets';

/**
 * custom hooks
 */
import { useSnackbar } from '../hooks/useSnackbar';

/**
 * components
 */
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';
import { Button } from '../components/Button';
import { CircularProgress, LinearProgress } from '../components/Progress';
import Logo from '../components/Logo';

const Login = () => {
  // GET error data from submiting the action

  const error = useActionData();
  // console.log(error);

  // const errorMessage = error?.message;

  // get navigation state loading etc
  const navigation = useNavigation();

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    // show snackbar with the provided error message
    if (error?.message) {
      showSnackbar({ message: error.message, type: 'error' });
    }
  }, [error, showSnackbar]);
  return (
    <>
      <PageTitle title='Login' />

      <div className='relative w-screen h-dvh p-2 grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2'>
        <div className='flex flex-col p-4'>
          <Logo classes='mb-auto mx-auto lg:mx-0' />
          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto'>
            <h2 className='text-displaySmall font-semibold text-light-onBackground dark:text-dark-onBackground text-center'>
              Welcome Back to Pheonix
            </h2>
            <p className='text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2'>
              Enter your Phoenix account details
            </p>
            <Form
              method='post'
              className='grid grid-cols-1 gap-4'
            >
              <TextField
                type='email'
                name='email'
                label='Email'
                placeholder='Email'
                required={true}
                autoFocus={true}
              />
              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='Enter your Password'
                required={true}
                autoFocus={true}
              />
              <div className='text-right'>
                <Link
                  to='/reset-link'
                  className='link text-labelLarge inline-block'
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                type='submit'
                disabled={navigation.state === 'submitting'}
              >
                {navigation.state === 'submitting' ? (
                  <CircularProgress size='small' />
                ) : (
                  'Sign in'
                )}
              </Button>
            </Form>
            <p className='text-bodyMedium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center mt-4'>
              Don&apos;t have an account?{' '}
              <Link
                to={'/register'}
                className='link inline-block ms-1 text-labelLarge text-light-onSurface dark:text-dark-onSurface'
              >
                Create an Account
              </Link>
            </p>
          </div>
          <p className='mt-auto mx-auto text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-bodyMedium lg:mx-0'>
            &copy; 2024 zacks project. All rights reserved.
          </p>
        </div>

        <div className='hidden lg:block img-box lg:relative lg:rounded-large'>
          <img
            src={assets.banner}
            alt=''
            className='img-cover'
          />
          <p className='absolute bottom-10 left-12 right-12 z-10 text-displayLarge font-semibold leading-tight text-right text-light-onSurface drop-shadow-sm 2xl:text-[72px]'>
            Chat with phoenix to superCharge your ideas
          </p>
        </div>
        {/* <p className=''>&copy; 2024 zacks project. All rights reserved.</p> */}
      </div>

      <AnimatePresence>
        {navigation.state === 'loading' && (
          <LinearProgress classes='absolute top-0 left-0 right-0' />
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
