import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Stepper } from "@progress/kendo-react-layout";
import {
  Form,
  FormElement,
  FormSubmitClickEvent,
} from "@progress/kendo-react-form";
import Information from "./information";
import Contact from "./contact";
import { Button } from "@progress/kendo-react-buttons";
import useStore from "../../store";

export type DetaiUserParams = {
  slug: string;
};

type Step = {
  label: string;
  isValid?: boolean;
};

const CreateOrUpdateUser = () => {
  const { slug } = useParams<DetaiUserParams>();
  const history = useHistory();
  const { userStore } = useStore();
  const { onAdd, onUpdate, onCreateId, getUserById } = userStore;

  const [user, setUser] = useState<{ [name: string]: any }>();
  const [birthday, setBirthday] = useState<Date>(new Date());

  useEffect(() => {
    const userInfo = getUserById(slug);
    if (userInfo) {
      setUser({
        fullName: userInfo.fullName,
        birthday: userInfo.birthday,
        gender: userInfo.gender,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
      });
    }
  }, [getUserById, slug]);

  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([
    {
      label: "Information",
      isValid: undefined,
    },
    {
      label: "Contact",
      isValid: undefined,
    },
  ]);

  const handleGoBack = () => {
    history.goBack();
  };

  const isNewUser = useMemo(() => {
    return slug === "new";
  }, [slug]);

  const render = useMemo(() => {
    if (currentStep === 0)
      return <Information birthday={birthday} setBirthday={setBirthday} />;
    if (currentStep === 1) return <Contact />;
  }, [birthday, currentStep]);

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const isLastStep = useMemo(() => {
    return currentStep === steps.length - 1;
  }, [currentStep, steps]);

  const isPreviousStepsValid = useMemo(() => {
    return (
      steps
        .slice(0, currentStep)
        .findIndex((current) => current.isValid === false) === -1
    );
  }, [currentStep, steps]);

  const isLastStepValid = useMemo(() => {
    return steps[steps.length - 1].isValid;
  }, [steps]);

  const titleSubmitButton = useMemo(() => {
    if (isLastStep) {
      if (isNewUser) return "New user";
      return "Update user";
    }
    return "Next";
  }, [isLastStep, isNewUser]);

  const onStepSubmit = useCallback(
    (event: FormSubmitClickEvent) => {
      const { isValid, values } = event;
      const current = steps.map((step, index) => ({
        ...step,
        isValid: index === currentStep ? isValid : step.isValid,
      }));

      setSteps(current);
      setCurrentStep(() => Math.min(currentStep + 1, steps.length - 1));

      if (isPreviousStepsValid && isLastStepValid) {
        let userInfo = {
          fullName: values.fullName,
          birthday: birthday,
          gender: values.gender,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
        };

        if (isNewUser) {
          userInfo = Object.assign(userInfo, { id: onCreateId() + "" });
          onAdd(userInfo);
        } else {
          userInfo = Object.assign(userInfo, { id: slug });
          onUpdate(userInfo);
        }

        history.push("/");
      }
    },
    [
      steps,
      isPreviousStepsValid,
      isLastStepValid,
      currentStep,
      birthday,
      isNewUser,
      history,
      onCreateId,
      onAdd,
      slug,
      onUpdate,
    ]
  );

  return (
    <div className="w-[90%] lg:px-8 xl:px-0 m-auto py-5">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => handleGoBack()}
      >
        <span className="k-icon k-i-arrow-chevron-left"></span>
        <span>Back</span>
      </div>
      <div className="mt-5">
        <div className="w-[70%] border-[1px] border-black-600 p-5 m-auto">
          <h2 className="font-bold text-lg">
            {isNewUser ? "New user" : "Update user"}
          </h2>

          <Stepper value={currentStep} items={steps} />
          <Form
            onSubmitClick={onStepSubmit}
            initialValues={user}
            key={JSON.stringify(user)}
            render={(formRenderProps) => (
              <div style={{ alignSelf: "center" }}>
                <FormElement>
                  {render}
                  <span
                    style={{ marginTop: "40px" }}
                    className={"k-form-separator"}
                  />
                  <div
                    style={{
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                    className={
                      "k-form-buttons k-button k-button-md k-rounded-md k-button-solid k-button-solid-bases-end"
                    }
                  >
                    <span>
                      Step {currentStep + 1} of {steps.length}
                    </span>
                    <div className="space-x-2">
                      {currentStep !== 0 && (
                        <Button onClick={handlePreviousStep}>Previous</Button>
                      )}

                      <Button
                        themeColor={"primary"}
                        disabled={isLastStep ? !isPreviousStepsValid : false}
                        onClick={formRenderProps.onSubmit}
                      >
                        {titleSubmitButton}
                      </Button>
                    </div>
                  </div>
                </FormElement>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateUser;
