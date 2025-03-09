import styled from 'styled-components';
import { Button } from '@mui/material';

const buttonStyles = {
  borderRadius: '8px',
  padding: '8px 16px',
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
};

export const RedButton = styled(Button)({
  ...buttonStyles,
  backgroundColor: '#f00',
  color: 'white',
  '&:hover': {
    backgroundColor: '#eb7979',
  },
});

export const BlackButton = styled(Button)({
  ...buttonStyles,
  backgroundColor: '#000000',
  color: 'white',
  '&:hover': {
    backgroundColor: '#212020',
  },
});

export const DarkRedButton = styled(Button)({
  ...buttonStyles,
  backgroundColor: '#650909',
  color: 'white',
  '&:hover': {
    backgroundColor: '#eb7979',
  },
});

export const BlueButton = styled(Button)({
  ...buttonStyles,
  backgroundColor: '#080a43',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0a1e82',
  },
});

export const PurpleButton = styled(Button)({
  ...buttonStyles,
  backgroundColor: '#270843',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#3f1068',
  },
});

export const LightPurpleButton = styled(Button)({
  ...buttonStyles,
  backgroundColor: '#7f56da',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#7a1ccb',
  },
});

export const GreenButton = styled(Button)({
  ...buttonStyles,
  backgroundColor: '#133104',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#266810',
  },
});

export const BrownButton = styled(Button)({
  ...buttonStyles,
  backgroundColor: '#2c1006',
  color: 'white',
  '&:hover': {
    backgroundColor: '#40220c',
  },
});

export const IndigoButton = styled(Button)({
  ...buttonStyles,
  backgroundColor: '#2f2b80',
  color: 'white',
  '&:hover': {
    backgroundColor: '#534ea6',
  },
});
