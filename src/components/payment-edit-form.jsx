"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Eye, EyeOff } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";

import {
  addPayment,
  messageClear,
} from "../../src/store/reducers/paymentReducer"; // import it
import { Calendar28 } from "@/components/date-picker";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PaymentMethodDropbox } from "./paymentMethod";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export function EditPaymentDrawer({
  open,
  onOpenChange,
  selectedRow,
  selectedPayment,
}) {
  const dispatch = useDispatch();

  const [payment, setPayment] = useState(selectedPayment?.day?.amount || 0);

  const [error, setError] = useState("");

  const [value, setValue] = useState(selectedPayment?.day?.paymentMethod || "");

  const [passHighlight, setPassHighlight] = useState(false);

  const { successMessage, errorMessage } = useSelector(
    (state) => state.payment
  );

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      if (!value) {
        toast.error("Payment Value is required");
        setPassHighlight(true);
        return;
      }

      dispatch(
        addPayment({
          amount: payment,
          paymentMethod: value,
          payerId: selectedRow._id,
          // paidAt: selectedDate,
        })
      );
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  useEffect(() => {
    if (value) {
      setPassHighlight(false);
    }
  }, [passHighlight, value]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      // messageClear()
      setPayment("");
      setValue("");
      onOpenChange(false);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, onOpenChange]);

  function formatNumberWithCommas(value) {
    if (value == null || isNaN(value)) return "";
    return Number(value).toLocaleString("en-PH"); // ✅ 400000 -> "400,000"
  }

  function unformatNumber(value) {
    return value.replace(/,/g, "");
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerOverlay />
      <DrawerContent className="h-[65vh] md:h-[70vh]">
        <div className="mx-auto w-10/12 md:w-4/12 max-w-xl ">
          <DrawerHeader>
            <DrawerTitle>{selectedPayment?.day?.date}</DrawerTitle>
            <DrawerDescription>
              <strong className="font-bold text-green-500 uppercase">
                {selectedPayment?.day?.paid ? "Paid " : " "}
              </strong>
            </DrawerDescription>
          </DrawerHeader>
          <div className="pb-0 w-full">
            <Tabs
              defaultValue="account"
              className="w-full transition-all duration-500 "
            >
              <div className="w-full flex justify-center items-center 0">
                <TabsList className={"w-full gap-2 "}>
                  <TabsTrigger value="account">Payment Data</TabsTrigger>
                  <TabsTrigger value="password">Update Data</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="account">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col justify-center items-start md:items-center w-full mt-3"
                >
                  <div className="w-full text-zinc-100 flex flex-col gap-1 rounded-lg py-4">
                    <div className="p-3 flex gap-2 border-b-2 border-neutral-800 bg-gradient-to-r to-transparent from-purple-900/20 rounded-t-lg">
                      <h2 className="font-bold">
                        <span className="pr-1">&#8369;</span>
                        {formatNumberWithCommas(
                          selectedPayment?.day?.amount || ""
                        )}
                      </h2>
                    </div>
                    <div className="p-2 text-sm">
                      <h2 className="font-semibold text-base">Payer Data</h2>
                      <div className="pl-2 mt-2">
                        <h2 className="font-semibold">
                          Name: <span>{selectedPayment?.payer?.name}</span>
                        </h2>
                        <h2 className="font-semibold">
                          Contact:{" "}
                          <span>{selectedPayment?.payer?.contact}</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              <TabsContent value="password">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full flex justify-center items-center pt-5"
                >
                  <form onSubmit={handleAddPayment} className="w-full">
                    <div className="flex flex-col gap-6 text-slate-100 w-full">
                      <div className="flex flex-col gap-2">
                        <div className="grid gap-3">
                          <Label htmlFor="email">Amount</Label>
                          <Input
                            id="payment"
                            type="text"
                            value={formatNumberWithCommas(payment)}
                            onChange={(e) => {
                              const rawValue = unformatNumber(e.target.value);
                              setPayment(rawValue);
                            }}
                            required
                            placeholder="value"
                            className="appearance-none"
                            style={{
                              MozAppearance: "textfield",
                              WebkitAppearance: "none",
                            }}
                          />
                        </div>
                        <div className="grid gap-3 ">
                          <Label htmlFor="email">
                            Method {passHighlight ? "!!!" : ""}
                          </Label>
                          <PaymentMethodDropbox
                            value={value}
                            setValue={setValue}
                            passHighlight={passHighlight}
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                      )}
                      <div className="flex flex-col gap-3">
                        <Button
                          type="submit"
                          onClick={() =>
                            console.log("Submit payment for:", selectedRow)
                          }
                        >
                          Update Payment
                        </Button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
          {/* <form onSubmit={handleAddPayment}>
              <div className="flex flex-col  gap-6 text-slate-100">
                <div className="flex gap-2">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Amount</Label>
                    <Input
                      id="payment"
                      type="text"
                      value={formatNumberWithCommas(payment)}
                      onChange={(e) => {
                        const rawValue = unformatNumber(e.target.value);
                        setPayment(rawValue);
                      }}
                      required
                      placeholder="value"
                      className="appearance-none"
                      style={{
                        MozAppearance: "textfield",
                        WebkitAppearance: "none",
                      }}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">
                      Method {passHighlight ? "!!!" : ""}
                    </Label>
                    <PaymentMethodDropbox
                      value={value}
                      setValue={setValue}
                      passHighlight={passHighlight}
                    />
                  </div>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    onClick={() =>
                      console.log("Submit payment for:", selectedRow)
                    }
                  >
                    Add Payment
                  </Button>
                </div>
              </div>
            </form> */}
          <DrawerFooter className="w-full p-0 pt-3">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
