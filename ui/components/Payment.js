import { Fragment, useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

export default function PaymentPanel({
  PaymentOpen,
  setPaymentOpen,
  setCheckoutOpen,
  cartTotal,
  user,
  userDispatch,
}) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const RequestDynacard = async (user) => {
    // await userDispatch({ type: "ADD_CARD", value: user });
    // console.log("midswing", user.dynacard.ccnum);
    setValue("ccNum", user.dynacard.ccnum);
    setValue("ccName", user.user);
    setValue("ccExpiration", user.dynacard.expiration);
    setValue("ccv", user.dynacard.ccv);
  };

  const onSubmit = (data) => {
    // console.log(data);
    // userDispatch({ action: "CART_ADDRESS", value: data });
    // setCheckoutOpen(false);
    // setPaymentOpen(true);
  };
  return (
    <Transition
      show={PaymentOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog onClose={() => setPaymentOpen(false)}>
        <Modal>
          <div className="modalbg">
            <Dialog.Panel className="modal">
              <div>
                <HeaderText>
                  <p>Payment</p>
                </HeaderText>
                <Subtotal>
                  <h4>subtotal: ${cartTotal}</h4>
                  <h6>.00</h6>
                  {/* TODO: shipping calculator callout & show shipping */}
                </Subtotal>
              </div>
              <DefaultButton
                onClick={() => {
                  RequestDynacard(user);
                }}
              >
                <DynaCardText>
                  <div>Use your new </div>
                  <DynaCardBG>
                    <span>DYNACARD</span>
                  </DynaCardBG>
                </DynaCardText>
              </DefaultButton>
              <DetailsDiv>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    className={errors.ccNum?.type}
                    {...register("ccNum", {
                      required: "This is required",
                      Length: {
                        value: 16,
                        message: "card must be 16 digits",
                      },
                    })}
                    placeholder="Credit Card Number"
                  />
                  <RowBar>
                    <Input
                      className={errors.ccName?.type}
                      {...register("ccName")}
                      placeholder="Name as shown on Card"
                    />

                    <Input
                      style={{ width: "100px" }}
                      className={errors.ccExpiration?.type}
                      {...register("ccExpiration", {
                        required: "This is required",
                        minLength: {
                          value: 5,
                          message: "Must be: 2-digit-month / 2-digit-year",
                        },
                      })}
                      placeholder="Expiration Mo/Yr"
                    />
                    <Input
                      style={{ width: "60px" }}
                      className={errors.ccv?.type}
                      {...register("ccv", {
                        required: "This is required",
                        minLength: {
                          value: 3,
                          message: "Must be 3 or 4 characters",
                        },
                      })}
                      placeholder="CCV (3 or 4 digits)"
                    />
                  </RowBar>
                  <ActionsBar>
                    <CancelButton
                      type="button"
                      onClick={() => setPaymentOpen(false)}
                    >
                      cancel
                    </CancelButton>
                    {!submitting ? (
                      <DefaultButton type="submit">
                        Complete Order
                      </DefaultButton>
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
