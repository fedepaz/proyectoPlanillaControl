
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ActionButton } from '../../../actions/types';

export const generateListItems = (actions: ActionButton[]) => {
  return (
    <React.Fragment>
      {actions.map((action) => (
        <ListItemButton key={action.id} onClick={action.onClick}>
          <ListItemIcon>
            {action.icon}
          </ListItemIcon>
          <ListItemText primary={action.label} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};
