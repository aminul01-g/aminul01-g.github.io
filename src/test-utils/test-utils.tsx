import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <HelmetProvider>{children}</HelmetProvider>
    </MemoryRouter>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export { screen, fireEvent, waitFor } from '@testing-library/react';
export { customRender as render };
