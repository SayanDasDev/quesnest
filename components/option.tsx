import { cn } from "@/lib/utils";
import { useCheckbox } from "@nextui-org/checkbox";
import { useRadio } from "@nextui-org/radio";
import { VisuallyHidden } from "@react-aria/visually-hidden";

interface OptionProps {
  index: number;
  value: string;
  isSelected: boolean;
  isFocusVisible: boolean;
  getBaseProps: Function;
  getLabelProps: Function;
  getInputProps: Function;
}

const Option = (props: OptionProps) => {
  const { index, value, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps } = props;

  return (
    <label
      {...getBaseProps()}
      className={cn(
        "border-default border hover:bg-default-200 rounded-2xl pr-6 overflow-clip cursor-pointer",
        isSelected &&
          "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        isFocusVisible &&
          "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div {...getLabelProps()}>
        <div className="flex">
          <div className="px-4 items-center font-semibold dark:bg-gray-950 bg-gray-300 flex justify-center">
            {String.fromCharCode(65 + index)}
          </div>
          <div className="py-4 pl-4">{value}</div>
        </div>
      </div>
    </label>
  );
};

interface ChoiceProps {
  index: number;
  value: string;
}

export const MulitpleChoiceOption = (props: ChoiceProps) => {
  const {
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  return <Option {...props} isSelected={isSelected} isFocusVisible={isFocusVisible} getBaseProps={getBaseProps} getLabelProps={getLabelProps} getInputProps={getInputProps} />;
};

export const SingleChoiceOption = (props: ChoiceProps) => {
  const {
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useRadio({
    ...props,
  });

  return <Option {...props} isSelected={isSelected} isFocusVisible={isFocusVisible} getBaseProps={getBaseProps} getLabelProps={getLabelProps} getInputProps={getInputProps} />;
};