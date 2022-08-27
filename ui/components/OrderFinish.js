import { Fragment, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export default function OrderFinishPanel({
  OrderFinishOpen,
  setOrderFinishOpen,
}) {
  const router = useRouter();
  return (
    <Transition
      show={OrderFinishOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog onClose={() => setOrderFinishOpen(false)}>
        <Modal>
          <div className="modalbg">
            <Dialog.Panel className="modal">
              <div>
                <HeaderText>
                  <p>Thank you!</p>
                </HeaderText>
              </div>
              <DefaultButton
                onClick={() => {
                  setOrderFinishOpen(false);
                }}
              >
                Close
              </DefaultButton>
              <DefaultButton
                onClick={() => {
                  router.push("/");
                }}
              >
                My Account
              </DefaultButton>
              <DetailsDiv></DetailsDiv>
            </Dialog.Panel>
          </div>
        </Modal>
      </Dialog>
    </Transition>
  );
}

const RowBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
const DynaCardBG = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 0px 6px;
`;
const DynaCardText = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const Subtotal = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
  margin: 10px;
  h4 {
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;
  }
  p {
    font-size: 20px;
    margin: 0px 15px;
  }
  h6 {
    font-size: 14px;
    line-height: 16px;
  }
`;
const Input = styled.input`
  font-size: 18px;
  font-weight: 500;
  color: #000;
  width: 100%;
  padding: 5px;
  margin: 10px;
  border: 2px solid black;
  border-radius: 5px;
  ::placeholder {
    color: #777;
    font-weight: 500;
  }
`;
const DetailsDiv = styled.div`
  .required {
    color: #f72331;
    ::placeholder {
      color: #f72331;
      font-weight: 600;
    }
  }
`;
const ActionsBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
const HeaderText = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;
const DefaultButton = styled.button`
  padding: 0.5rem 0.5rem;
  color: #fff;
  bottom: 50px;
  background: #ff4820;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  span {
    background: linear-gradient(90deg, #ae67fa 30%, #f49867 50%);
    background-clip: text;
    font-weight: 800;
    font-size: 12px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  color: #fff;
  background: #bbb;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
`;
const Modal = styled.div`
  font-family: "Manrope", sans-serif;
  .modalbg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    position: fixed;
    display: center;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
  }
  .modal {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 20px;
    position: fixed;
    width: 500px;
    max-width: 100%;
    height: 500px;
    max-height: 100%;
    top: 50%;
    left: 50%;
    background-color: #fff;
    border: 2px solid black;
    transform: translate(-50%, -50%);
    z-index: 1010;
  }
`;
