import type { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../app/store";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function AppProviders({ children }: Props) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReduxProvider>
  );
}
