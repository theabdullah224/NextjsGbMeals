"use client";
import React from "react";
import Link from "next/link";
import "./copyRight.css";

const CopyRight: React.FC = () => {
  return (
    <div className="copyright">
      {/* Copyright text */}
      <p className="cpp text-lg">© 2024 gbmeals. All rights reserved.</p>

      {/* Links to policies and terms */}
      <div>
        <Link className="canchor text-center text-lg" href="/privacyPolicy" scroll={true}>
          Privacy Policy
        </Link>
        <Link className="canchor text-center text-lg" href="/termsofServices" scroll={true}>
          Terms of Service
        </Link>
        <Link className="canchor text-center text-lg" href="/cookieSetting" scroll={true}>
          Cookies Settings
        </Link>
      </div>
    </div>
  );
};

export default CopyRight;
