import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "components/Loader/Loader.jsx";
import gitHub from "images/gitHub.svg";
import css from "./SharedLayout.module.scss";

const SharedLayout = () => {
  return (
    <div className={css.mainContainer}>
      <header className={css.header}>
        <ul className={css.navList}>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? css.navlinkActive : css.navlink}`
              }
              to="/"
            >
              Post tracking
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? css.navlinkActive : css.navlink}`
              }
              to="/post-office"
            >
              Post office
            </NavLink>
          </li>
        </ul>
      </header>
      <main className={css.container}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <p>
          This project was created for educational purposes as a test task. You
          can view the source files for this and my other projects by clicking
          on this logo.
        </p>
        <a
          href="https://github.com/Serhii-Saproshyn"
          target="_blank"
          rel="noreferrer"
        >
          <img src={gitHub} alt="github" />
        </a>
      </footer>
    </div>
  );
};

export default SharedLayout;
