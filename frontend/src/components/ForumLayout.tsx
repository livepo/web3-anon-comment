import React from 'react';

const ForumLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">
          链上评论社区
        </h1>
      </header>

      <main className="mx-auto flex max-w-5xl gap-6 px-4 py-8">
        <section className="flex-1 space-y-6">{children}</section>

        <aside className="w-64">{/* 后续用于放置标签筛选等 */}</aside>
      </main>
    </div>
  );
};

export default ForumLayout;
