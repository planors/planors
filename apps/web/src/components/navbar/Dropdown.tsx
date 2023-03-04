import { Menu } from "@headlessui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function Dropdown({ session }: { session: Session["user"] }) {
  return (
    <div className="fixed top-16 w-40 text-right">
      <Menu.Items className="absolute mt-2 w-40 origin-top divide-y divide-zinc-200 rounded-md bg-white shadow-sm ring-1 ring-zinc-200 focus:outline-none">
        <div className="py-1 text-left">
          <Menu.Item>
            {({ active }) => (
              <div
                className="px-3 py-2 text-sm"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span>
                  Signed in as{" "}
                  <span>
                    <span className="font-medium text-zinc-900">
                      {session.name}
                    </span>
                  </span>
                </span>
              </div>
            )}
          </Menu.Item>
        </div>
        <div className="">
          <Menu.Item>
            {({ active }) => (
              <div
                className={`${
                  active ? "" : ""
                } group flex w-full justify-center bg-zinc-100 px-3 py-3 text-sm`}
              >
                <button
                  className="rounded-md border border-zinc-300 bg-white py-2 px-10 text-sm font-medium text-zinc-800 transition-all duration-100 ease-in-out"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Theme
                </button>
              </div>
            )}
          </Menu.Item>
        </div>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-zinc-100" : ""
                } group flex w-full items-center px-3 py-2 text-sm`}
              >
                Profile
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-zinc-100" : ""
                } group flex w-full items-center px-3 py-2 text-sm`}
              >
                Account
              </button>
            )}
          </Menu.Item>
        </div>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-zinc-100" : ""
                } group flex w-full items-center px-3 py-2 text-sm`}
              >
                Settings
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-zinc-100" : ""
                } group flex w-full items-center px-3 py-2 text-sm`}
              >
                Documentation
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-zinc-100" : ""
                } group flex w-full items-center px-3 py-2 text-sm`}
              >
                Help
              </button>
            )}
          </Menu.Item>
        </div>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-zinc-100" : ""
                } group flex w-full items-center px-3 py-2 text-sm`}
                onClick={(e) => {
                  e.preventDefault();
                  void signOut();
                }}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </div>
  );
}
