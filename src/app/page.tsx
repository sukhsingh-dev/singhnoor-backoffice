/* eslint-disable @next/next/no-img-element */
import SignIn from "./client/signIn";

export default function Home() {
  return (
    <main className="page-bg">
      <div className="login-box">
        <img src="/images/logo.png" alt="SN logo" className="img-invert" width={119} height={80} />
        <SignIn />
      </div>
    </main>
  );
}
