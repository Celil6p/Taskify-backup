"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Board } from "@prisma/client";
import React, { ElementRef, useRef, useState } from "react";

type BoardTitleFormProps = {
  data: Board;
};

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    console.log("submited", title);
  }
  const onBlur = () => {
    formRef.current?.requestSubmit();
  }

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form ref={formRef} action={onSubmit} className="flex items-center gap-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={data.title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent
          border-none"
        />
        <Button variant="transparent" />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto p-1 px-2"
    >
      {data.title}
    </Button>
  );
};

export default BoardTitleForm;
