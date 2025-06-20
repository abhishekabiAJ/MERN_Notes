import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-200 shadow-lg w-full z-50">
      <div className="mx-auto max-w-6xl p-4 sticky top-0 left-0">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            My Notes
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary btn-sm">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
