"use client";

import { Form, FormField } from "@/components/form";
import { MAX_OPTIONS, questionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input, Textarea } from "@nextui-org/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const AddQuestionPage = () => {

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      explanation: "",
      isMultiChoice: false,
      options: [{ option: "" }, { option: "" }]
    },
  });

  const options = form.getValues("options");

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const addOption = () => {
    if (fields.length < MAX_OPTIONS) {
      append({ option: "" });
    }
  };

  function onSubmitDraft(values: z.infer<typeof questionSchema>) {
    console.log("Submit Draft", values);
  }
  function onSubmitPublish(values: z.infer<typeof questionSchema>) {
    console.log("Submit Publish", values);
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field, fieldState }) => (
            <Textarea
              isRequired
              variant="faded"
              minRows={2}
              isInvalid={fieldState.error && true}
              label="Question"
              placeholder="Why do programmers prefer dark mode?"
              errorMessage={fieldState.error?.message}
              size="lg"
              autoComplete="off"
              className=""
              {...field}
            />
          )}
        />

        <div className="px-3 grid gap-x-6 gap-y-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {options.map((option, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`options.${index}.option`}
              render={({ field, fieldState }) => (
                <Input
                  isRequired
                  autoComplete="off"
                  variant="flat"
                  isInvalid={fieldState.error && true}
                  label={String.fromCharCode(65 + index)} // A, B, C, ...
                  errorMessage={fieldState.error?.message}
                  className=""
                  size="md"
                  {...field}
                />
              )}
            />
          ))}
          {options.length < MAX_OPTIONS && (
            <Button
              type="button"
              startContent={<Plus />}
              variant="bordered"
              size="lg"
              color="default"
              className="h-14"
              onClick={() => addOption()}
            >
              Add Option
            </Button>
          )}
        </div>
        <FormField
          control={form.control}
          name="isMultiChoice"
          render={({ field, fieldState }) => (
            <Checkbox
              color="default"
              radius="sm"
              isSelected={field.value}
              onChange={(e) => form.setValue("isMultiChoice", e.target.checked)}
              className="px-4"
            >
              <span className="text-gray-700 font-medium dark:text-gray-300">
                This is a Multiple Choice Question
              </span>
            </Checkbox>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field, fieldState }) => (
            <Textarea
              variant="underlined"
              isInvalid={fieldState.error && true}
              label="Explanation (optional)"
              placeholder="Because light attracts bugs!"
              errorMessage={fieldState.error?.message}
              className=""
              size="md"
              {...field}
            />
          )}
        />
        <div className="flex gap-2 flex-grow justify-end">
          <Button type="button" variant="flat" color="danger">
            Discard
          </Button>
          <Button
            type="button"
            onPress={() => form.handleSubmit(onSubmitPublish)()}
            color="primary"
          >
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddQuestionPage;
