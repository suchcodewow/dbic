import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import styled from "styled-components";

export default function CheckoutPanel({
  CheckoutOpen,
  setCheckoutOpen,
  cartTotal,
  user,
}) {
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  return (
    <Transition
      show={CheckoutOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog onClose={() => setCheckoutOpen(false)}>
        <Modal>
          <div className="modalbg">
            <Dialog.Panel className="modal">
              <div>
                <HeaderText>
                  <p>{user?.user}'s Cart</p>
                  <br />
                </HeaderText>
                <Subtotal>
                  <h4>subtotal: ${cartTotal}</h4>
                  <h6>.00</h6>
                </Subtotal>
              </div>
              <DefaultButton>use my saved address</DefaultButton>
              <DetailsDiv>
                <form onSubmit={handleSubmit}>
                  <Fieldset disabled={submitting}>
                    <Input name="address1" placeholder="Shipping Address" />
                    <Input name="address2" placeholder="Shipping Address 2" />
                    <Input name="city" placeholder="City" />
                    <Input name="state" placeholder="State" />
                    <Input name="zip" placeholder="Zip" />
                  </Fieldset>
                  <ActionsBar>
                    <CancelButton
                      type="button"
                      onClick={() => setCheckoutOpen(false)}
                    >
                      cancel
                    </CancelButton>
                    {!submitting ? (
                      <DefaultButton type="submit">Payment</DefaultButton>
                    ) : (
                      <div>spinner</div>
                    )}
                  </ActionsBar>
                </form>
              </DetailsDiv>
            </Dialog.Panel>
          </div>
        </Modal>
      </Dialog>
    </Transition>
  );
}
const Subtotal = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
  h4 {
    font-size: 22px;
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
  padding: 5px;
  margin: 10px;
  border: none;
  border-radius: 3px;
`;
const Fieldset = styled.fieldset`
  display: flex;
  flex-flow: column;
  border: 0px;
  input: {
    font-size: 22px;
  }
`;

const DetailsDiv = styled.div``;
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
    background-color: rgba(0, 0, 0, 0.5);
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
