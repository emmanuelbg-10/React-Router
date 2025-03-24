import { Link, Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import { items } from "../data/items";

export default function Home() {
  return (
    <div className="layout">
      <Menu />

      <div className="mainContainer">
        <div className="sidebar">
          {items.map((item) => (
            <div key={item.id}>
              <Link to={`/contacts/${item.id}`}>{item.name}</Link>
            </div>
          ))}
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
