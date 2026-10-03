import Book from "@/components/book/Book";
export const metadata = { title: "Journal — HEADHACKER" };

export default function Journal() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg pt-16">
      <div className="absolute inset-0 bg-[url('/images/room.jpg')] bg-cover bg-center opacity-20 blur-md" />
      <div className="relative w-full"><Book /></div>
    </main>
  );
}
