"use client";

import { Form, FormField } from "@/components/form";
import { MAX_OPTIONS, questionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Input, Textarea } from "@nextui-org/input";
import { Switch } from "@nextui-org/switch";
import { AlertCircle, Check, Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const AddQuestionPage = () => {

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      explanation: "",
      options: [{ option: "", isCorrect: false, id: "A" }, { option: "", isCorrect: false, id: "B" }]
    },
  });

  const options = form.getValues("options");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });


  const addOption = () => {
    if (fields.length < MAX_OPTIONS) {
      const id = String.fromCharCode(65 + fields.length);
      append({ option: "", isCorrect: false, id });
    }
  };

  function onSubmitDraft(values: z.infer<typeof questionSchema>) {
    console.log("Submit Draft", values);
  }
  function onSubmitPublish(values: z.infer<typeof questionSchema>) {
    console.log(JSON.stringify(values));
  }
  async function handleDiscard() {
    await form.handleSubmit(() => {})();
    console.log("Validation errors:", form.formState.errors);
  }

  const optionErrors = form.formState.errors.options?.root;

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
        {optionErrors &&
          <Chip variant="flat" startContent={<AlertCircle />} color="danger" className="h-14 rounded-xl w-full px-6 mx-3 whitespace-normal truncate" ><div className="pl-2 inline-block">{optionErrors.message}</div></Chip>
          // <ErrorModal /> 
        }
        <div className="px-3 grid gap-x-6 gap-y-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {options.map((field, index) => (
            <div className="flex gap-2" key={field.id}>
              {fields.length > 2 && (
            <div className="h-14 flex items-center">

              <Button
                type="button"
                isIconOnly
                variant="light"
                size="sm"
                color="danger"
                onPress={() => remove(index)}
              >
                <X />
              </Button>
              </div>
            )}
            <FormField
              control={form.control}
              name={`options.${index}.option`}
              render={({ field, fieldState }) => (
                <Input
                  isRequired
                  autoComplete="off"
                  variant="flat"
                  isInvalid={fieldState.error && true}
                  label={`Option ${String.fromCharCode(65 + index)}`} 
                  errorMessage={fieldState.error?.message}
                  className=""
                  size="md"
                  {...field}
                />
              )}
            />
            <div className="h-14 flex items-center">
            <FormField
              control={form.control}
              name={`options.${index}.isCorrect`}
              render={({ field }) => (
                <Switch
                  isSelected={field.value}
                  onValueChange={(value) => {
                    form.setValue(`options.${index}.isCorrect`, value);
                    form.trigger(`options`);
                  }}
                  size="lg"
                  color="success"
                  startContent={<Check strokeWidth={4}/>}
                  endContent={<X strokeWidth={4}/>}
              />
              )}
            />
            </div>
            </div>
          ))}
          {options.length < MAX_OPTIONS && (
            <Button
              type="button"
              startContent={<Plus />}
              variant="bordered"
              size="lg"
              color="default"
              className="h-14"
              onPress={() => addOption()}
            >
              Add Option
            </Button>
          )}
        </div>
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
          <Button 
            type="button" 
            variant="light" 
            color="danger" 
            onPress={(handleDiscard)}
          >
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
