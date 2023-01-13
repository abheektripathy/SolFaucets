/* eslint-disable jsx-a11y/alt-text */
'use client'
import { useState } from 'react';
import { createStyles, Header, Group, ActionIcon, Container, Burger, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Image from 'next/image';
import sollogo from '../public/solanaLogo.png'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { getSpacingValue } from '@mantine/core/lib/Box/style-system-props/value-getters/get-spacing-value';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface HeaderMiddleProps {
  links: { link: string; label: string }[];
}

export function HeaderMiddle() {

  const { classes, cx } = useStyles();



  return (
    <Header sx={(theme) => ({
      background: theme.colors.black,
      padding: theme.spacing.xs,
      maxHeight: 200
    ,
      
    })} mb={100} height={'20'}  >

      <Container className={classes.inner}>
         
        <Image src={sollogo} width={170} height={27}/>
        
       
        


        

        
           <WalletMultiButton className='marginLeft' ></WalletMultiButton> 
         
        
      </Container>
      
    </Header>
  );
}