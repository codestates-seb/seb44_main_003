import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from '@/components/authentication/SignupForm';

it('should display required error when value is invalid', async () => {
  render(<SignupForm />);

  fireEvent.submit(screen.getByRole('button'));

  expect(await screen.findAllByRole('alert')).toHaveLength(2);
  expect(mockLogin).not.toBeCalled();
});
