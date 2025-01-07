import {PropsWithChildren, ReactElement} from 'react';
import {render} from '@testing-library/react-native';

const AllTheProviders = ({children}: PropsWithChildren) => {
  return <div>{children}</div>;
};

const customRender = (
  ui: ReactElement,
  createNodeMock?: (element: React.ReactElement) => any,
) => render(ui, {wrapper: AllTheProviders, createNodeMock});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
