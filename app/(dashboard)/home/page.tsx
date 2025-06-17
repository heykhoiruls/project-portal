"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UserAttandance from "./attendance/page";
import HomeHeader from "./home-header";
import UserBankAccount from "./account-bank/page";
import UserProfile from "./profile/page";
import UserJob from "./job/page";
import Title from "@/components/ui/title";
import { dataHomeMenu } from "@/lib/data/data-home";

const PageHome = () => {
  const [idEmployee, setIdEmployee] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabContent = [
    <UserBankAccount key="bank" />,
    <UserProfile key="profile" />,
    <UserAttandance key="att" />,
    <UserJob key="job" />,
  ];

  useEffect(() => {
    const id = localStorage.getItem("idEmployee");
    setIdEmployee(id);
  }, []);

  return (
    <div className="py-8 px-4 md:px-0">
      <div className="w-full flex justify-center items-baseline md:items-center">
        <div className="w-full h-3/4  md:max-w-md">
          <Card className="flex items-center justify-center border border-gray-100 gap-3">
            <CardHeader className="gap-1 px-4 md:px-6 w-full flex justify-between items-center">
              <HomeHeader
                idEmployee={idEmployee}
                onSelected={(index) => {
                  setActiveIndex(index);
                }}
              />
            </CardHeader>
            <Separator className="border border-gray-100" />
            <CardContent className="w-full">
              <Title title={dataHomeMenu[activeIndex]} />
              <div className="mt-4 bg-gray-50 rounded-lg px-4 ">
                {tabContent[activeIndex]}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageHome;
