import { Github, Linkedin, type LucideIcon } from "lucide-react";

export function Footer() {
  const listItems = [
    { href: "https://github.com/NicoToff", Icon: Github },
    { href: "https://www.linkedin.com/in/toffolo01/", Icon: Linkedin },
  ] satisfies { href: string; Icon: LucideIcon }[];

  return (
    <footer className="mt-8 m-4 border-t">
      <div className="w-full mx-auto max-w-screen-lg items-center py-3 flex justify-between">
        <div>
          <a href="/" className="hover:underline">
            © <span data-current-year>2023</span>
            {" — NicoToff"}
          </a>
        </div>
        <ul className="flex gap-2">
          {listItems.map(({ href, Icon }) => (
            <li className="p-2 hover:bg-secondary rounded-md" key={href}>
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
