import OptionGroup from "@/components/option-group";
import { title } from "@/components/primitives";
import questions from "@/Dummy/qustions.json";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export default function ExplorePage() {
  return (
    <div className="flex flex-col text-center gap-16">
      <h1 className={title()}>Explore</h1>

      <div className="flex flex-col gap-10 w-[80vw] place-items-center">
        {questions.map((question, index) => {
          const isMultipleChoice = question.options.filter(option => option.isCorrect).length > 1;
          return(
          <div key={index} className="w-full h-full">
            <Card className="w-full h-full">
              <CardHeader className="flex py-6 gap-3">
                <div className="p-4 py-2 font-bold dark:bg-black bg-gray-700 rounded-md text-white flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex flex-col">
                  <p className="text-lg text-left leading-none pb-2">{question.question}</p>
                  <p className="text-small text-left text-default-300">{isMultipleChoice ? 'Multiple Choice' : 'Single Choice'}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-2 py-6 flex flex-col justify-center">
                <OptionGroup options={question.options} />
              </CardBody>
              <Divider />
              <CardFooter className="py-4">
                <Button variant="solid" color="primary">Submit</Button>
              </CardFooter>
            </Card>
          </div>
        )})}
      </div>
    </div>
  );
}
