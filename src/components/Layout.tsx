import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="p-2 font-bold text-white bg-orange-800">
        Todo APP
      </header>
      <main className="container flex flex-row flex-1 gap-6 p-6">{children}</main>
    </div>
  );
}
