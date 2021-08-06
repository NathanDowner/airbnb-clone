const footerData = [
  {
    heading: 'ABOUT',
    links: [
      'How Airbnb works',
      'Newsroom',
      'Investors',
      'Airbnb Plus',
      'Airbnb Luxe',
    ],
  },
  {
    heading: 'COMMUNITY',
    links: [
      'Accessibility',
      'This is not a real site',
      "It's a pretty awesome clone",
      'Referrals Accepted',
      'Community Links',
    ],
  },
  {
    heading: 'HOST',
    links: [
      'Hear from Hosts',
      'Host Stuff',
      'Questions',
      'Activities',
      'Join Now',
    ],
  },
  {
    heading: 'Support',
    links: [
      'Help Centre',
      'Trust & Safety',
      'Something else related',
      'Easter Eggs',
      'For the Win',
    ],
  },
];

const Footer = () => {
  return (
    <footer className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600">
      {footerData.map(({ heading, links }, idx) => (
        <div key={idx} className="space-y-4 text-xs text-gray-800">
          <h5 className="font-bold">{heading}</h5>
          {links.map((link) => (
            <p
              className="cursor-pointer hover:text-purple-500 transition duration-200"
              key={link}
            >
              {link}
            </p>
          ))}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
