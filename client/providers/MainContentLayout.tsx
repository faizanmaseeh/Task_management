"use client";
import { TasksProvider } from "@/context/taskContext";
import React from "react";

interface MainContentLayoutProps {
  children: React.ReactNode;
}

function MainContentLayout({ children }: MainContentLayoutProps) {
  return (
    <main className="pb-[1.5rem] flex h-full">
      <TasksProvider>{children}</TasksProvider>
    </main>
  );
}

export default MainContentLayout;
