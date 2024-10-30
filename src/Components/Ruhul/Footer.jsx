import { Link } from "react-router-dom";
import Logo from "../Fardus/Logo/Logo";

const Footer = () => {
  return (
    <footer className="relative bg-transparent text-gray-800 dark:text-gray-200 py-2">
      <div className="container relative mx-auto px-6 md:px-12 lg:px-20">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Section */}
          <div className="flex flex-col space-y-4">
            <Logo />
            <div className="space-y-2">
              <FooterLink to="/get-premium" text="DevDive Premium" />
              <FooterLink to="/code-editor" text="DevStudio" />
              <FooterLink to="/code-web" text="WebStudio" />
              <FooterLink to="/blogCard" text="Blog" />
           
            </div>
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold tracking-wide">Social</h3>
            <div className="space-y-2">
              <FooterLink to="/" text="Facebook" />
              <FooterLink to="/" text="Instagram" />
              <FooterLink to="/" text="Twitter" />
              <FooterLink to="/" text="YouTube" />
              <FooterLink to="/" text="LinkedIn" />
            </div>
          </div>

          {/* Community Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold tracking-wide">Community</h3>
            <div className="space-y-2">
              <FooterLink to="/" text="devdive.com" />
              <FooterLink to="/" text="devdive for Community" />
              <FooterLink to="/" text="Content Policy" />
              <FooterLink to="/" text="Help Center" />
              <FooterLink to="/" text="Moderator Code of Conduct" />
              <FooterLink to="/" text="Privacy & Safety" />
            </div>
          </div>

          {/* Policies Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold tracking-wide">Policies</h3>
            <div className="space-y-2">
              <FooterLink to="/" text="Privacy Policy" />
              <FooterLink to="/" text="User Agreement" />
              <FooterLink to="/" text="Transparency Report" />
              <FooterLink to="/" text="devdivesafety" />
              <FooterLink to="/" text="Other Terms and Policies" />
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} DevDive, Inc. All rights reserved.
          </p>
          <p className="mt-2">
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>{" "}
            |{" "}
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, text }) => (
  <Link
    to={to}
    className="block transition-colors duration-300 hover:text-blue-500"
  >
    {text}
  </Link>
);

export default Footer;
