import Link from "next/link";

const App: React.FC = () => {
  return (
    <div>
      <h1>Register</h1>
      <Link href="/register">Register</Link>
      <h1>Login</h1>
      <Link href="/login">Login</Link>
    </div>
  );
};

export default App;