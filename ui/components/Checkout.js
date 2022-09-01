import { Fragment, useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { GenerateAddress } from "components";

export default function CheckoutPanel({
  CheckoutOpen,
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

  const AddressFill = (user) => {
    if (!user.defaultAddress) {
      console.log("DEBUG: No default address!");
    } else {
      console.log(user.defaultAddress);
      setValue("address1", user.defaultAddress.address1);
      setValue("address2", user.defaultAddress.address2);
      setValue("city", user.defaultAddress.city);
      setValue("state", user.defaultAddress.state);
      setValue("zip", user.defaultAddress.zip);
    }
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data) => {
    console.log(data);
    userDispatch({ type: "CART_ADDRESS", value: data });
    setCheckoutOpen(false);
    setPaymentOpen(true);
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

              <DetailsDiv>
                <DefaultButton
                  onClick={(form) => {
                    AddressFill(user, form);
                  }}
                >
                  use my saved address
                </DefaultButton>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    className={errors.address1?.type}
                    name="address1"
                    {...register("address1", {
                      required: "This is required",
                      minLength: {
                        value: 3,
                        message: "must be 3 characters or more",
                      },
                    })}
                    placeholder="Shipping Address 1"
                  />
                  <Input
                    className={errors.address2?.type}
                    {...register("address2")}
                    placeholder="Shipping Address 2"
                  />
                  <Input
                    className={errors.city?.type}
                    {...register("city", {
                      required: "This is required",
                      minLength: {
                        value: 3,
                        message: "must be 3 characters or more",
                      },
                    })}
                    placeholder="City"
                  />
                  <Input
                    className={errors.state?.type}
                    {...register("state", {
                      required: "This is required",
                      minLength: {
                        value: 2,
                        message: "State must be at least 2 characters",
                      },
                    })}
                    placeholder="State"
                  />
                  <Input
                    className={errors.Zip?.type}
                    {...register("zip", {
                      required: "This is required",
                      minLength: {
                        value: 5,
                        message: "Must be at least 5 digits",
                      },
                    })}
                    placeholder="Zip"
                  />

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
