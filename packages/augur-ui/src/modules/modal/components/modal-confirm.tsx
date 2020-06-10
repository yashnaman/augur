import React from "react";
import ReactHtmlParser from "react-html-parser";
import ModalActions from "modules/modal/components/common/modal-actions";
import Styles from "modules/modal/components/common/common.styles.less";

type ModalAction = (...args: Array<any>) => any;

interface ModalConfirm {
  closeModal: ModalAction;
  description: Array<string>;
  title: string;
  submitAction: ModalAction;
  cancelButtonText?: string;
  submitButtonText?: string;
  cancelAction?: ModalAction;
}

const ModalConfirm = ({
  closeModal,
  description,
  title,
  submitAction,
  cancelButtonText = "cancel",
  submitButtonText = "submit",
  cancelAction,
}: ModalConfirm) => (
  <section className={Styles.ModalContainer}>
    <h1>{title}</h1>
    {description.map((text) => (
      <p key={text} className={Styles.Description}>{ReactHtmlParser(text)}</p>
    ))}
    <ModalActions
      buttons={[
        {
          label: cancelButtonText,
          action: cancelAction || closeModal,
          type: "gray",
        },
        {
          label: submitButtonText,
          action: submitAction,
          type: "purple",
        }
      ]}
    />
  </section>
);

export default ModalConfirm;
