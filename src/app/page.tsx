import Link from "next/link";

const App: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-xl">
      <span>Register <Link href="/register" className="underline">here</Link></span>
      <h1 className="text-md font-semibold">OR</h1>
      <span>Login <Link href="/login" className="underline">here</Link></span>
    </div>
  );
};

export default App;