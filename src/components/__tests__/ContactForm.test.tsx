import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../ContactForm';

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({}) }), 100),
      ),
  ) as jest.Mock;
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('ContactForm', () => {
  it('shows validation errors for empty fields', async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByText(/send message/i));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it('shows email format error', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'bademail' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello world!' } });
    fireEvent.click(screen.getByText(/send message/i));
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('shows message length error', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@mail.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hi' } });
    fireEvent.click(screen.getByText(/send message/i));
    expect(await screen.findByText(/at least 10 characters/i)).toBeInTheDocument();
  });

  it('submits successfully and shows thank you message', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@mail.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello world!' } });
    fireEvent.click(screen.getByText(/send message/i));
    await waitFor(() => expect(screen.getByText(/thank you/i)).toBeInTheDocument());
  });

  it('shows error on failed submission', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false }));
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@mail.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello world!' } });
    fireEvent.click(screen.getByText(/send message/i));
    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });
});
