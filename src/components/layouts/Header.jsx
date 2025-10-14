import WalletAccount from "../features/WalletAccount";
import WalletSheet from "../features/WalletSheet";
import Anchor from "../ui/Anchor"; 

const navBtns = [
  {
    text: "Browse Survey",
    url: "/browse-survey",
    id: "home-btn",
  },
  {
    text: "About",
    url: "/",
    id: "about-btn",
  },
  {
    text: "Contact",
    url: "/",
    id: "contact-btn",
  },
];

export default function Header() {
  return (
    <>
      <header className="flex justify-between items-center px-10 py-5 sticky top-0">
        <div className="flex items-center gap-3 w-92">
          <h1>Vercel App</h1>
        </div>
        <nav>
          <ul className="flex gap-5">
            {navBtns.map((nav) => (
              <li
                key={nav.id}
                className="flex items-center justify-center group cursor-pointer"
              >
                <Anchor customClassName={`hover:underline underline-offset-8 decoration-2`} href={nav.url}>{nav.text}</Anchor>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex w-92 justify-end items-center gap-5">
          {/* <WalletSheet /> */}
          <WalletAccount />
        </div>
      </header>
    </>
  );
}
