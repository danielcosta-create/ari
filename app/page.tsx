"use client";

import { useState, useEffect } from "react";

type FormProps = {
  password: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

function Form({ password, onChangePassword, handleSubmit }: FormProps) {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col items-center gap-3">
      <input
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={onChangePassword}
        className="w-full max-w-3xl p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Confirmar
      </button>
    </form>
  );
}

function SecretContent({ counter }: { counter: number }) {
  return (
    <div className="mt-4 text-center">
      {counter > 0 ? (
        <p className="text-white text-lg">Deixa eu te ver sem roupa... 😈😌🔥</p>
      ) : (
        <p className="text-white text-lg">Parabéns, você desbloqueou a mensagem secreta ;)</p>
      )}
      <p className="text-white mt-4 text-sm">Tempo restante: {counter}s</p>
    </div>
  );
}

export default function Home() {
  const SECRET_PASSWORD = "senhamegaultrasecreta";

  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  const [counter, setCounter] = useState(7);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (password !== SECRET_PASSWORD) {
      alert("Senha incorreta. Tente novamente.");
      return;
    }

    setStep(1);
  };

  useEffect(() => {
    if (step === 1 && counter > 0) {
      const timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [step, counter]);

  return (
    <div className="bg-blue-600 text-white min-h-dvh flex flex-col justify-center items-center gap-6">
      <div className="absolute top-4 right-4 bg-white text-black p-2 rounded-md text-sm max-w-xs">
        Disclaimer: isso não é para ter uma boa UI
      </div>
      <h1 className="text-4xl font-bold">Para Ari</h1>
      {step === 0 && (
        <Form
          password={password}
          onChangePassword={onChangePassword}
          handleSubmit={handleSubmit}
        />
      )}
      {step === 1 && <SecretContent counter={counter} />}
    </div>
  );
}
