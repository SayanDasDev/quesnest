"use client";

import { Form, FormField } from "@/components/form";
import { questionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input, Textarea } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddQuestionPage = () => {
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      explanation: "",
      isMultiChoice: false,
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
    },
  });

  function onSubmitDraft(values: z.infer<typeof questionSchema>) {
    console.log("Submit Draft",values);
  }
  function onSubmitPublish(values: z.infer<typeof questionSchema>) {
    console.log("Submit Publish",values);
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field, fieldState }) => (
            <Textarea
              variant="faded"
              minRows={2}
              isInvalid={fieldState.error && true}
              label="Question"
              placeholder="Why do programmers prefer dark mode?"
              errorMessage={fieldState.error?.message}
              size="lg"
              className=""
              {...field}
            />
          )}
        />
        
        <div className="px-2 grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <FormField
            control={form.control}
            name="optionA"
            render={({ field, fieldState }) => (
              <Input
                variant="flat"
                isInvalid={fieldState.error && true}
                label="A"
                errorMessage={fieldState.error?.message}
                className=""
                size="md"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="optionB"
            render={({ field, fieldState }) => (
              <Input
                variant="flat"
                isInvalid={fieldState.error && true}
                label="B"
                errorMessage={fieldState.error?.message}
                className=""
                size="md"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="optionC"
            render={({ field, fieldState }) => (
              <Input
                variant="flat"
                isInvalid={fieldState.error && true}
                label="C"
                errorMessage={fieldState.error?.message}
                className=""
                size="md"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="optionD"
            render={({ field, fieldState }) => (
              <Input
                variant="flat"
                isInvalid={fieldState.error && true}
                label="D"
                errorMessage={fieldState.error?.message}
                className=""
                size="md"
                {...field}
              />
            )}
          />
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
              label="Explanation"
              placeholder="Because light attracts bugs!"
              errorMessage={fieldState.error?.message}
              className=""
              size="md"
              {...field}
            />
          )}
        />
        <div className="flex gap-2 flex-grow justify-end">
          <Button type="button" onPress={()=>form.handleSubmit(onSubmitDraft)()} variant="flat" color="primary">
            Save as Draft
          </Button>
          <Button type="button" onPress={()=>form.handleSubmit(onSubmitPublish)()} color="primary">
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddQuestionPage;
