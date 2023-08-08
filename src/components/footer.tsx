import { Github, Linkedin, type LucideIcon } from "lucide-react";

export function Footer() {
  const listItems = [
    { href: "https://github.com/NicoToff", Icon: Github },
    { href: "https://www.linkedin.com/in/toffolo01/", Icon: Linkedin },
  ] satisfies { href: string; Icon: LucideIcon }[];

  return (
    <footer className="m-4 mt-8 border-t">
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-between py-3">
        <div>
          <a href="/" className="hover:underline">
            © <span data-current-year>2023</span>
            {" — NicoToff"}
          </a>
        </div>
        <ul className="flex gap-2">
          {listItems.map(({ href, Icon }) => (
            <li className="rounded-md p-2 hover:bg-secondary" key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon size={48} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
