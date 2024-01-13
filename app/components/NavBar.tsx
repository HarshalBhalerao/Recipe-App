"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import classNames from "classnames";
import Typography from "@mui/material/Typography";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import RamenDiningTwoToneIcon from "@mui/icons-material/RamenDiningTwoTone";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SubscriptionsTwoToneIcon from "@mui/icons-material/SubscriptionsTwoTone";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Recipes", href: "/recipes" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <RamenDiningTwoToneIcon />
      </Link>
      <ul className="flex space-x-6 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            //className = { `${link.href === currentPath ? 'text-zinc-800' : 'text-zinc-500'} hover:text-zinc-800 transition-colors` }
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
      <div className="container flex items-center justify-center">
        <div className="flex items-center">
          <Typography
            variant="h5"
            component="div"
            color={"black"}
            textAlign={"center"}
            fontFamily={"cursive"}
            fontStyle={"oblique"}
          >
            RecipeBook
          </Typography>
        </div>
      </div>
      <div className="mx-1 flex items-center space-x-6">
        <Tooltip title="Login" placement="right">
          <IconButton>
            <AccountCircleTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Buy Premium" placement="right">
          <IconButton>
            <SubscriptionsTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Button
          color="secondary"
          disabled={false}
          size="medium"
          variant="outlined"
          endIcon={<AddBoxIcon />}
          href="/recipes/new"
          title="Add Recipe"
        >
          Recipe
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
