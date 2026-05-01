"use client";

import {
  ProviderProps,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";
import { WithLoader } from "@/ui";
import { domAnimation, LazyMotion } from "framer-motion";
import { AuthContext } from "./context";
import { dispatchAuthAction, AuthFormState } from "@/app/actions";

export function AuthProvider({ children }: ProviderProps<undefined>) {
  const [state, setState] = useState<AuthFormState>({
    type: "login",
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    code: { value: "", error: "", purpose: "restore_password" },
    rememberMe: false,
  });
  const [pending, startTransition] = useTransition();
  const activeType = useMemo(() => state.type, [state.type]);
  const setActiveType = useCallback((type: AuthFormState["type"]) => {
    setState((state) => ({
      type,
      email: { value: state.email.value, error: "" },
      password: { value: state.password.value, error: "" },
      code: { value: state.code.value, error: "", purpose: state.code.purpose },
      rememberMe: state.rememberMe,
    }));
  }, []);

  const isReadyForSubmit = useCallback(
    (type: AuthFormState["type"]) => {
      const isEmailValid = state.email.error === "" && state.email.value !== "";
      const isPasswordValid =
        state.password.error === "" && state.password.value !== "";
      if (type === "verification") {
        const isCodeValid = state.code.value !== "" && state.code.error === "";
        return isEmailValid && isPasswordValid && isCodeValid;
      }
      return isEmailValid && isPasswordValid;
    },
    [state],
  );

  const submit = useCallback(
    (type?: AuthFormState["type"]) => {
      if (!type || typeof type !== "string") {
        type = activeType;
      }
      const isReady = isReadyForSubmit(type);
      if (!isReady) {
        return;
      }
      startTransition(async () => {
        dispatchAuthAction({ ...state, type }).then(setState);
      });
    },
    [activeType, isReadyForSubmit, state],
  );

  return (
    <AuthContext.Provider
      value={{
        activeType,
        setActiveType,
        state,
        setState,
        submit,
      }}
    >
      <LazyMotion features={domAnimation} strict>
        <WithLoader
          loading={pending}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          {children}
        </WithLoader>
      </LazyMotion>
    </AuthContext.Provider>
  );
}
