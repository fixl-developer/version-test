import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-nokia-green">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8 tracking-wider">NOKIA SNAKE</h1>
        <p className="text-xl mb-8 text-nokia-light">Classic Snake Game</p>
        <Link
          href="/snake"
          className="inline-block px-8 py-4 bg-nokia-green text-black font-bold text-xl rounded-lg hover:bg-nokia-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-light"
        >
          Play Game
        </Link>
      </div>
    </div>
  );
}
