import { ReactElement } from 'react';

export default interface IFileSelectProps {
  onChange: (files) => void;
  children: ReactElement | string;
}
