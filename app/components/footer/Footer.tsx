"use client"
import React from 'react';
import Image from 'next/image'; // Import Image for optimized images in Next.js
import Link from 'next/link';  // Next.js Link component for routing
import Logo2 from '../../../public/Resource/logo2.png';
import Facebook from '../../../public/Resource/fb.svg';
import x from '../../../public/Resource/x.svg'; // Assuming x is Twitter
import insta from '../../../public/Resource/insta.svg';
import linkedin from '../../../public/Resource/in.svg';
import youtube from '../../../public/Resource/yt.svg';
import mail from '../../../public/Resource/mail.png';
import location from '../../../public/Resource/location.png';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer ">
      <div className="fcol1">
        <Image className="logof" src={Logo2} alt="Logo" />
        <p className="footerp text-Text2 text-md font-bold" style={{ margin: '20px 0px 0px 0px ' }}>
          Get Control Your Health
        </p>
        <p className="pt-4 text-Text1 text-xl font-bold">Follow Us</p>
        <div className="logos w-fit">
          <a href="https://www.facebook.com" className="w-fit" target="_blank" rel="noopener noreferrer">
            <Image src={Facebook} alt="Facebook" className="fb" />
          </a>
          <a href="https://www.instagram.com/gbmeals/" target="_blank" rel="noopener noreferrer">
            <Image src={insta} alt="Instagram" className="fb" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <Image src={x} alt="Twitter" className="fb" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <Image src={linkedin} alt="LinkedIn" className="fb" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <Image src={youtube} alt="YouTube" className="fb" />
          </a>
        </div>
      </div>
      <div className="fcol1 fcol2">
        <h6 className="footerh4 text-Text1 text-2xl font-bold">Quick&nbsp;Links</h6>
        <ul className="ulf">
          <li>
            <Link className="text-md font-bold text-Text2" href="/" scroll={true}>
              Home
            </Link>
          </li>
          <li>
            <Link className="text-md font-bold text-Text2" href="/aboutUs" scroll={true}>
              About Us
            </Link>
          </li>
          <li>
            <Link className="text-md font-bold text-Text2" href="/plans" scroll={true}>
              Meal Plans
            </Link>
          </li>
          {/* <li><Link className='text-md font-bold text-Text2' href="/plans" scroll={false}>Plan Type</Link></li> */}
        </ul>
      </div>
      <div className="fcol1 fcol3">
        <h4 className="footerh4 text-2xl font-bold text-Text1">Contact&nbsp;Info</h4>
        <div>
          <Image src={location} alt="Location" className="location mt-2" />
          <p className="footerp text-md font-bold text-Text2">15 Neptune Ct, Vanguard Way, Cardiff, CF24 5PJ</p>
        </div>
        {/* <div>
          <Image src={call} alt="Phone" className="location" />
          <p className="footerp text-md font-bold text-Text2">1800 123 4567</p>
        </div> */}
        <div>
          <Image src={mail} alt="Email" className="location" />
          <p className="footerp text-md font-bold text-Text2">team@gbmeals.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
