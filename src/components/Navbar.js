// src/components/CustomNavbar.js
'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Dropdown, DropdownMenu, DropdownTrigger, Avatar, DropdownItem } from "@nextui-org/react";
import { logout } from '@/services/auth';

export default function CustomNavbar() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState(null);
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setPhone("+"+parsedUser.phone);
      console.log("User found in local storage", parsedUser.phone);
    } else {
      console.log("No user found in local storage");
    }
  }, []);


  useEffect(() => {
    if (router.pathname.includes("candidat")) {
      setActiveLink("Candidat");
    } else if (router.pathname.includes("mon-vote")) {
      setActiveLink("MonVote");
    }
  }, [router.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <Navbar isBordered isBlurred={false} style={{ padding: 20 }}>
      <NavbarBrand>
        <p className="font-bold text-inherit text-black">SUNU VOTE SN</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        <NavbarItem>
          <Link
            className={`text-white ${activeLink === "Candidat" ? "bg-blue-300 text-white p-2 pr-3 pl-3 rounded-md" : ""}`}
            href="/vote/candidat"
          >
            Candidat
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={`text-white ${activeLink === "MonVote" ? "bg-blue-300 text-white p-2 pr-3 pl-3 rounded-md" : ""}`}
            href="/vote/mon-vote"
          >
            Mon vote
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="User"
              size="md"
              src="https://www.cuisine-essentiel.fr/images/2020/10/avatar-neutre.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2 text-black" textValue={`Connecté en tant que ${phone || 'user@example.com'}`}>
              <p className="font-semibold text-black">Connecté en tant que</p>
              <p className="font-semibold text-black">{phone || 'user@example.com'}</p>
            </DropdownItem>
            <DropdownItem key="help_and_feedback" className="text-black" textValue="Assistance">Assistance</DropdownItem>
            <DropdownItem key="logout" color="danger" className="text-black" textValue="Déconnexion" onClick={handleLogout}>Déconnexion</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
