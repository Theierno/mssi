'use client';

import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image } from "@nextui-org/react";
import { AcmeLogo } from "../components/AcmeLogo";

export default function CustomNavbar() {
  const [activeLink, setActiveLink] = useState("Customers");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <Navbar isBordered isBlurred={false} style={{ padding : 20 }}>
      <NavbarBrand>
        
        <p className="font-bold text-inherit text-black">SUNU VOTE SN</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        <NavbarItem>
          <Link
            className={`text-white ${activeLink === "Features" ? "bg-blue-300 text-white p-2 pr-3 pl-3 rounded-md" : ""}`}
            href="#"
            onPress={() => handleSetActiveLink("Features")}
          >
            Actualités
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={`text-white ${activeLink === "Customers" ? "bg-blue-300 text-white p-2 pr-3 pl-3 rounded-md" : ""}`}
            href="/Ccm"
            onPress={() => handleSetActiveLink("Customers")}
            aria-current={activeLink === "Customers" ? "page" : undefined}
          >
            Comment ça marche ?
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={`text-white ${activeLink === "Integrations" ? "bg-blue-300 text-white p-2 pr-3 pl-3 rounded-md" : ""}`}
            href="#"
            onPress={() => handleSetActiveLink("Integrations")}
          >
            Assistance
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} className={`text-white` } color="primary" href={user ? "/vote/mon-vote" : "/login"} variant="flat">
            Vote
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}