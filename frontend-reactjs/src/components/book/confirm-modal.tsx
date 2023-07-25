import { Backdrop, Button } from '@mui/material';
import * as React from 'react';

export interface IConfirmModalProps {
  onHandleClose: Function;
  isOpen: boolean;
  title: string;
  onHandleClick: Function;
}

export default function ConfirmModal(props: IConfirmModalProps) {
  const { onHandleClose, isOpen, title, onHandleClick } = props;
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpen}
        onClick={() => onHandleClose()}
      >
        <div className="bg-white p-5 text-center">
          <div className="text-[#000000] text-xl" style={{ color: 'black' }}>
            {title}
          </div>
          <div className="flex items-center justify-between mt-2">
            <Button variant="contained" onClick={() => onHandleClose(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => onHandleClick()}
              className='ml-2'
            >
              Delete
            </Button>
          </div>
        </div>
      </Backdrop>
    </div>
  );
}
