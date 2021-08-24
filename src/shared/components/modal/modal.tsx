import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import './modal.scss';

interface ModalBodyInterface {
  title: string;
  description: string;
  isLink: boolean;
}

type headerDataModal = {
  label: string;
  key: string;
  isLink: boolean;
};

interface ModalInterface {
  data: any;
  keys: headerDataModal[];
  state: boolean;
  title: string;
  handleClickClose: any;
}

function ModalBody(props: ModalBodyInterface) {
  return (
    <div className="modal__body">
      <p className="modal__body_title">{props.title}</p>
      {props.isLink ? (
        <a href={props.description} target="_blank" rel="noopener noreferrer" className="modal__body_link"> Abrir Publicación</a>
      ) : (
        <p className="modal__body_content">{props.description}</p>
      )}
    </div>
  );
}

export default function CustomModal(props: ModalInterface) {
  /** In modal it's used table tanslations
   * to avoid duplicated data*/
  const { t } = useTranslation('shared');

  const handleClose = () => {
    props.handleClickClose();
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (props.state) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  });

  return (
    <>
      <Dialog
        open={props.state}
        onClose={handleClose}
        scroll={'body'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <div className="modal__header">
            <p className="modal__header_title">{props.title}</p>
            {props.state ? (
              <IconButton aria-label="close" onClick={handleClose}>
                <Close />
              </IconButton>
            ) : null}
          </div>
        </DialogTitle>
        <DialogContent dividers id="scroll-dialog-description">
          <>
            {props.keys.map((header: headerDataModal) => {
              return (
                <ModalBody
                  key={`modal-${header.label}`}
                  title={t(`table.${header.label}`)}
                  description={props.data[header.key]}
                  isLink={header.isLink}
                />
              );
            })}
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}
