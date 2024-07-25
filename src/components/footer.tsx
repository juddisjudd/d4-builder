import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-4 text-white">
      <div className="container mx-auto text-center">
        <p className="text-xs">Copyright &copy; {new Date().getFullYear()} D4Builder</p>
        <p className="text-xs">
          D4Builder is an open-source project licensed under the{' '}
          <a
            href="https://www.gnu.org/licenses/gpl-3.0.en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 underline"
          >
            GNU General Public License v3.0
          </a>
          .
        </p>
        <p className="text-xs">
          You can view the source code and contribute to the project on{' '}
          <a
            href="https://github.com/juddisjudd/d4builder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
