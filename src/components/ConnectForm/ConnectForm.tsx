import React, {
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { useFormik } from "formik";
import { useScreenNavigation } from "../../context/ScreenNavigationContext";
import {
  BtnIcon,
  DigitInput,
  ErrorText,
  Form,
  InputGroup,
  TextError,
  VerifyButton,
} from "./ConnectForm.styled";
import sprite from "../../common/image/svg/sprite.svg";
interface ConnectFormProps {
  length?: number;
  onSubmit?: (code: string) => void;
}

const ConnectForm: React.FC<ConnectFormProps> = ({
  length = 4,
  onSubmit = (code) => console.log("gameCode", code),
}) => {
  const refs = useRef<HTMLInputElement[]>([]);

  const { goTo } = useScreenNavigation();

  const formik = useFormik<{ otp: string[] }>({
    initialValues: { otp: Array.from({ length }, () => "") },
    validate: (values) => {
      const errors: Partial<{ otp: string }> = {};
      if (values.otp.some((ch) => ch === "")) {
        errors.otp = "Enter full host code";
      }
      return errors;
    },
    onSubmit: (values) => {
      const code = values.otp.join("");
      onSubmit(code);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/\D/g, "");
    const digit = value.slice(0, 1);
    formik.setFieldValue(`otp[${idx}]`, digit);
    if (digit && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      if (formik.values.otp[idx]) {
        formik.setFieldValue(`otp[${idx}]`, "");
        return;
      }
      if (idx > 0) refs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, idx: number) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .slice(0, length - idx)
      .toUpperCase();
    paste.split("").forEach((ch, i) => {
      formik.setFieldValue(`otp[${idx + i}]`, ch);
    });
    const nextIndex = Math.min(length - 1, idx + paste.length);
    refs.current[nextIndex]?.focus();
  };

  const allFilled = formik.values.otp.every((v) => v !== "");

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup>
        {Array.from({ length }).map((_, i) => (
          <DigitInput
            key={i}
            ref={(el) => {
              if (el) refs.current[i] = el;
            }}
            value={formik.values.otp[i]}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={(e) => handlePaste(e, i)}
            inputMode="numeric"
            maxLength={1}
          />
        ))}
      </InputGroup>
      <TextError>
        {formik.errors.otp && <ErrorText>{formik.errors.otp}</ErrorText>}
      </TextError>

      <VerifyButton
        type="submit"
        disabled={!allFilled}
        onClick={() => goTo("game")}
      >
        <BtnIcon>
          <use href={`${sprite}#arrowLeft`}></use>
        </BtnIcon>
      </VerifyButton>
    </Form>
  );
};

export default ConnectForm;
