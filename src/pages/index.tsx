import HelloWorld from "@/components/HelloWorld";

export default function Home() {
  return (
      <div>
          <header className="header">
              <h1>My Website</h1>
              <div>
                  <button className="nav-link">Login</button>
              </div>
          </header>
          <HelloWorld/>
      </div>
  );
}