import { Book, BrandGithub } from "tabler-icons-react";

const Footer: React.FC = () => {
  return (
    <footer className="footer items-center py-6 px-16 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <Book className="w-12 h-12" />
        <p>library.io - Milan Herke</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <BrandGithub className="w-6 h-6" />
      </div>
    </footer>
  );
};

export default Footer;
