import Link from "next/link";
import { Book } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Define link objects for each section
  const learningLinks = [
    { title: "Getting Started", link: "/guides/getting-started" },
    { title: "Practice Modes", link: "/guides/practice-modes" },
    // { title: "Watching Videos", link: "/guides/practice-modes#watching-videos" },
  ];

  const resourceLinks = [
    { title: "About Us", link: "/about_us" },
    { title: "Contact", link: "/contact" },
    { title: "FAQ", link: "/faq" },
  ];

  const channelLinks = [
    { title: "Technology", link: "/videos/technology" },
    { title: "Business", link: "/videos/business" },
    { title: "Economy", link: "/videos/economy" },
    { title: "Sport", link: "/videos/sport" },
  ];

  return (
    <footer className="bg-gradient-to-r from-forest-600 to-forest-800 border-t border-forest-100 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <span className="text-2xl font-bold text-white group-hover:text-forest-200 transition-colors">
                EndlessWiz
              </span>
            </Link>
            <p className="text-sm text-forest-200">
              Master English with engaging stories, videos, and flashcard games—your journey starts here!
            </p>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Learning Column */}
            <div>
              <h3 className="font-semibold text-white mb-4">Learning</h3>
              <ul className="space-y-3">
                {learningLinks.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className="text-sm text-forest-100 hover:text-white transition-colors capitalize"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className="text-sm text-forest-100 hover:text-white transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Channels Column */}
            <div>
              <h3 className="font-semibold text-white mb-4">Channels</h3>
              <ul className="space-y-3">
                {channelLinks.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className="text-sm text-forest-100 hover:text-white transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-forest-500 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-forest-200 order-2 md:order-1 mt-4 md:mt-0">
            © {currentYear} EndlessWiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;