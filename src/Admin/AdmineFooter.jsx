import React from 'react';

const AdmineFooter = () => {
const footerData = [
  {
    title: 'Services',
    links: ['Branding', 'Design', 'Marketing', 'Advertisement'],
  },
  {
    title: 'Company',
    links: ['About us', 'Contact', 'Jobs', 'Press kit'],
  },
  {
    title: 'Legal',
    links: ['Terms of use', 'Privacy policy', 'Cookie policy'],
  },
];
return (
<footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
 {footerData.map((section, ) => (
<nav key={section.title}>
 <h6 className="footer-title">{section.title}</h6>
    {section.links.map((link) => (
            <a key={link} className="link link-hover">
              {link}
            </a>  ))}
</nav>
 ))}
</footer>
    );
};

export default AdmineFooter;


// import React from 'react';

// const AdmineFooter = () => {
//     return (
//         <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
//   <nav>
//     <h6 className="footer-title">Services</h6>
//     <a className="link link-hover">Branding</a>
//     <a className="link link-hover">Design</a>
//     <a className="link link-hover">Marketing</a>
//     <a className="link link-hover">Advertisement</a>
//   </nav>
//   <nav>
//     <h6 className="footer-title">Company</h6>
//     <a className="link link-hover">About us</a>
//     <a className="link link-hover">Contact</a>
//     <a className="link link-hover">Jobs</a>
//     <a className="link link-hover">Press kit</a>
//   </nav>
//   <nav>
//     <h6 className="footer-title">Legal</h6>
//     <a className="link link-hover">Terms of use</a>
//     <a className="link link-hover">Privacy policy</a>
//     <a className="link link-hover">Cookie policy</a>
//   </nav>
// </footer>
//     );
// };

// export default AdmineFooter;