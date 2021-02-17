import React from 'react';
import { Cell } from '../Cell/Cell';
import { SideMenu } from '../SideMenu/SideMenu';

export const Field: React.FC = () => {
  return (
    <div className="field-wrapper">
      <div className="field">
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <SideMenu />
    </div>
  );
};
