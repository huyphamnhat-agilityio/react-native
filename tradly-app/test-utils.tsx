import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import { PropsWithChildren, ReactElement } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
    },
  },
});

export const AllTheProviders = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  createNodeMock?: (element: React.ReactElement) => any,
) => render(ui, { wrapper: AllTheProviders, createNodeMock });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
